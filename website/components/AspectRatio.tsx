import { FunctionComponent, HTMLAttributes } from 'react'

interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
	aspectRatio: number
}

const AspectRatio: FunctionComponent<AspectRatioProps> = ({
	children,
	aspectRatio,
	...props
}) => {
	return (
		<div {...props}>
			{children}
			<style jsx>{`
				div {
					position: relative;
					width: 100%;
					height: 0;
					padding-top: calc((${aspectRatio}) * 100%);
				}
			`}</style>
		</div>
	)
}

export default AspectRatio
