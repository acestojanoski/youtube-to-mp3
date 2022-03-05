import Head from 'next/head'
import { FunctionComponent } from 'react'

interface PageMetadataProps {
	title: string
	description: string
}

const PageMetadata: FunctionComponent<PageMetadataProps> = ({
	title,
	description,
}) => {
	return (
		<Head>
			{/* Title */}
			<title>{title}</title>
			<meta name="og:title" content={title} />

			{/* Description */}
			<meta name="description" content={description} />
			<meta property="og:description" content={description} />

			{/* URL */}
			<meta property="og:url" content="https://youtube-to-mp3.vercel.app" />

			{/* General */}
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta property="og:type" content="website" />
		</Head>
	)
}

export default PageMetadata
