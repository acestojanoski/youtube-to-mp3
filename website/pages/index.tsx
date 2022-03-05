import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import useSWR, { SWRConfig } from 'swr'
import DownloadIcon from '../components/DownloadIcon'
import PageMetadata from '../components/PageMetadata'

const getLatestRelease = async () => {
	const response = await fetch(
		'https://api.github.com/repos/acestojanoski/youtube-to-mp3/releases/latest'
	)

	return response.json()
}

export const getStaticProps: GetStaticProps = async () => {
	const latestRelease = await getLatestRelease()

	return {
		props: {
			fallback: {
				latestRelease,
			},
		},
	}
}

interface LatestRelease {
	tag_name: string
}

interface HomeProps {
	fallback: {
		latestRelease: LatestRelease
	}
}

const Home: NextPage<HomeProps> = ({ fallback }) => {
	const { data: latestRelease } = useSWR<LatestRelease>(
		'latestRelease',
		getLatestRelease
	)

	return (
		<SWRConfig value={{ fallback }}>
			<PageMetadata
				title="Youtube to mp3"
				description="Youtube to mp3 converter"
			/>
			<div className="container">
				<main>
					<h1>YouTube to mp3</h1>
					<div className="screenshot-wrapper">
						<Image src="/screenshot.png" layout="fill" alt="Screenshot" />
					</div>
					<h2>Download</h2>
					<table>
						<tbody>
							<tr>
								<td className="invisible" />
								<td className="center">x64</td>
							</tr>
							<tr>
								<td>Windows</td>
								<td className="center">
									<a
										download
										href={`https://github.com/acestojanoski/youtube-to-mp3/releases/download/${latestRelease?.tag_name}/Youtube to mp3-win32-x64.zip`}
									>
										<span className="download-icon-wrapper">
											<DownloadIcon />
										</span>
										{latestRelease?.tag_name}
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</main>
				<style jsx>{`
					.container {
						max-width: 900px;
						margin: 0 auto;
						padding: 0 1rem;
					}

					h1,
					h2 {
						text-align: center;
						font-weight: 400;
						margin-top: 4rem;
					}

					table {
						width: 100%;
						border-collapse: collapse;
						margin: 3rem 0;
						table-layout: fixed;
					}

					td {
						vertical-align: top;
						border: 1px solid #444;
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

					.download-icon-wrapper {
						margin-right: 0.5rem;
					}

					.screenshot-wrapper {
						margin: 3rem 0;
						border: 1px solid #000000;
						position: relative;
						width: 100%;
						height: 0;
						padding-top: calc((${291 / 991}) * 100%);
					}
				`}</style>
			</div>
		</SWRConfig>
	)
}

export default Home
