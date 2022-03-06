import Link from 'next/link'
import { FunctionComponent } from 'react'

const Header: FunctionComponent = () => {
	return (
		<header>
			<h1>YouTube to mp3</h1>
			<nav>
				<Link href="#download" passHref>
					<a className="nav-item">Download</a>
				</Link>
				<Link href="#disclaimer" passHref>
					<a className="nav-item">Disclaimer</a>
				</Link>
				<Link href="https://github.com/acestojanoski/youtube-to-mp3" passHref>
					<a target="_blank" className="nav-item">
						GitHub
					</a>
				</Link>
			</nav>
			<style jsx>{`
				header {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				nav .nav-item:not(:first-child) {
					margin-left: 1rem;
				}
			`}</style>
		</header>
	)
}

export default Header
