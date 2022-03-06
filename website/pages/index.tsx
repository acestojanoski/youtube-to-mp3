import type { GetStaticProps, NextPage } from 'next'
import { SWRConfig } from 'swr'
import AspectRatio from '../components/AspectRatio'
import Disclaimer from '../components/Disclaimer'
import Download from '../components/Download'
import Header from '../components/Header'
import PageMetadata from '../components/PageMetadata'
import useLatestRelease, {
	getLatestRelease,
	LatestRelease,
} from '../hooks/use-latest-release'

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

interface HomeProps {
	fallback: {
		latestRelease: LatestRelease
	}
}

const Home: NextPage<HomeProps> = ({ fallback }) => {
	const { data: latestRelease } = useLatestRelease()

	return (
		<SWRConfig value={{ fallback }}>
			<PageMetadata
				title="Youtube to mp3"
				description="Youtube to mp3 converter. This program should only be used on non-copyrighted material."
			/>
			<div className="container">
				<Header />
				<main>
					<section className="video-section">
						<AspectRatio aspectRatio={714 / 992}>
							<video autoPlay loop muted controls={false}>
								<source src="/video.mp4" type="video/mp4" />
							</video>
						</AspectRatio>
					</section>
					<Download latestRelease={latestRelease} />
					<Disclaimer />
				</main>
				<style jsx>{`
					.container {
						max-width: 900px;
						margin: 0 auto;
						padding: 1rem;
					}

					main {
						display: flex;
						flex-direction: column;
						align-items: center;
					}

					.video-section {
						border: 1px solid #000000;
						width: 100%;
					}

					video {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						min-width: 100%;
						max-width: 100%;
						min-height: 100%;
						max-height: 100%;
					}
				`}</style>
			</div>
		</SWRConfig>
	)
}

export default Home
