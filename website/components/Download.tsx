import { FunctionComponent } from 'react'
import { LatestRelease } from '../hooks/use-latest-release'
import DownloadIcon from './DownloadIcon'

interface DownloadProps {
	latestRelease?: LatestRelease
}

const DOWNLOAD_BASE_URL =
	'https://github.com/acestojanoski/youtube-to-mp3/releases/download'

const DownloadLink: FunctionComponent<{
	tagName?: string
	fileName: string
}> = ({ tagName, fileName }) => {
	return (
		<a download href={`${DOWNLOAD_BASE_URL}/${tagName}/${fileName}`}>
			<span>
				<DownloadIcon />
			</span>
			{tagName}
			<style jsx>{`
				span {
					margin-right: 0.5rem;
				}
			`}</style>
		</a>
	)
}

const Download: FunctionComponent<DownloadProps> = ({ latestRelease }) => {
	return (
		<section>
			<h2 id="download">Download</h2>
			<table>
				<tbody>
					<tr>
						<td className="invisible" />
						<td className="center">x64</td>
					</tr>
					<tr>
						<td>Windows</td>
						<td className="center">
							<DownloadLink
								tagName={latestRelease?.tag_name}
								fileName="Youtube.to.mp3-win32-x64.zip"
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<style jsx>{`
				h2 {
					text-align: center;
				}

				table {
					width: 100%;
					border-collapse: collapse;
					table-layout: fixed;
				}

				td {
					vertical-align: top;
					border: 1px solid #000000;
					position: relative;
					word-break: break-word;
					padding: 0.5rem;
				}

				td.invisible {
					border-top: 0;
					border-left: 0;
				}

				td.center {
					text-align: center;
				}
			`}</style>
		</section>
	)
}

export default Download
