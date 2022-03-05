const { app, ipcMain, shell } = require('electron')
const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('ffmpeg-static')
const path = require('path')
const { mkdir, rm } = require('fs/promises')

ffmpeg.setFfmpegPath(ffmpegPath.replace('app.asar', 'app.asar.unpacked'))

ipcMain.handle('convert', async (event, urls) => {
	/**
	 * @param {string} url
	 * @param {string} downloadPath
	 * @returns {Promise<string>}
	 */
	async function download(url, downloadPath) {
		const info = await ytdl.getInfo(url)

		return new Promise(async (resolve, reject) => {
			const stream = ytdl(info.videoDetails.videoId, {
				quality: 'highestaudio',
			})

			stream.on('progress', (_, downloaded, total) => {
				event.sender.send('progress', {
					title,
					videoId: info.videoDetails.videoId,
					percents: Math.floor((downloaded / total) * 100),
				})
			})

			const title = await import('filenamify').then((filenamify) =>
				filenamify.default(info.videoDetails.title.trim(), { replacement: ' ' })
			)

			const filePath = path.join(downloadPath, `${title}.mp3`)

			ffmpeg(stream)
				.audioBitrate(160)
				.format('mp3')
				.outputOption('-metadata', `title=${title}`)
				.save(filePath)
				.on('end', () => resolve(filePath))
				.on('error', reject)
		})
	}

	const downloadPath = path.join(
		app.getPath('downloads'),
		`youtube-to-mp3-${Date.now()}`
	)

	try {
		await mkdir(downloadPath)

		const promises = urls.map((url) => download(url, downloadPath))
		await Promise.all(promises)

		shell.showItemInFolder(downloadPath)
	} catch (error) {
		event.sender.send('error', error.message)

		// Download folder cleanup on error
		rm(downloadPath, { recursive: true, force: true }).catch(() => {})
	}
})
