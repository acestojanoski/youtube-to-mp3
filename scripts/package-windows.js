const package = require('electron-packager')
const path = require('path')

package({
	dir: path.join(__dirname, '..'),
	overwrite: true,
	platform: 'win32',
	asar: {
		unpack: '**/node_modules/ffmpeg-static/ffmpeg.exe',
	},
	arch: 'x64',
	prune: true,
	out: 'release_builds',
	ignore: [/website/],
})
