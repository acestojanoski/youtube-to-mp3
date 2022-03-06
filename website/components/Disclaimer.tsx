import { FunctionComponent } from 'react'

const Disclaimer: FunctionComponent = () => {
	return (
		<section>
			<h2 id="disclaimer">Disclaimer</h2>
			<p>This program should only be used on non-copyrighted material.</p>
			<style jsx>{`
				h2,
				p {
					text-align: center;
				}
			`}</style>
		</section>
	)
}

export default Disclaimer
