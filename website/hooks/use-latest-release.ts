import useSWR from 'swr'

export interface LatestRelease {
	tag_name: string
}

export const getLatestRelease = async () => {
	const response = await fetch(
		'https://api.github.com/repos/acestojanoski/youtube-to-mp3/releases/latest'
	)

	return response.json()
}

function useLatestRelease() {
	const { data, error } = useSWR<LatestRelease>(
		'latestRelease',
		getLatestRelease
	)

	return {
		data,
		error,
		loading: !error && !data,
	}
}

export default useLatestRelease
