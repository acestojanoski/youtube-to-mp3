import './global.css'

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { v4 as uuidv4 } from 'uuid'
import css from './app.module.css'
import { dedupe } from './utils'

const { ipcRenderer } = window.require('electron')

const initialUrls = [{ id: uuidv4(), value: '' }]

function App() {
	const [urls, setUrls] = useState(initialUrls)
	const [progress, setProgress] = useState([])
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	// Handle progress and errors sent from the main process
	useEffect(() => {
		ipcRenderer.on('convertProgress', (_, data) => {
			setProgress((previousProgress) => {
				const nextProgress = [...previousProgress]
				const index = nextProgress.findIndex(
					(item) => item.videoId === data.videoId
				)

				if (index !== -1) {
					nextProgress.splice(index, 1, data)
				} else {
					nextProgress.push(data)
				}

				return nextProgress
			})
		})

		ipcRenderer.on('convertError', (_, error) => setError(error))
	}, [])

	/**
	 * Add new url
	 */
	function handleAdd() {
		setUrls((previousUrls) => [
			...previousUrls,
			{
				id: uuidv4(),
				value: '',
			},
		])
	}

	/**
	 * Remove an url based on the id
	 * @param {string} id
	 * @returns
	 */
	function handleRemove(id) {
		/** @type {import('react').MouseEventHandler} */
		return () => {
			setUrls((previousUrls) => {
				if (previousUrls.length === 1) return previousUrls
				return previousUrls.filter((item) => item.id !== id)
			})
		}
	}

	/** @type {import('react').ChangeEventHandler} */
	function handleChange(event) {
		const {
			target: { name: id, value },
		} = event

		setUrls((previousUrls) => {
			const nextUrls = [...previousUrls]
			const index = nextUrls.findIndex((item) => item.id === id)

			if (index !== -1) {
				nextUrls.splice(index, 1, { id, value })
			}

			return nextUrls
		})
	}

	/** @type {import('react').FormEventHandler} */
	function handleConvert(event) {
		event.preventDefault()

		setLoading(true)
		ipcRenderer.invoke('convert', dedupe(urls.map((item) => item.value)))
	}

	function handleReset() {
		setUrls(initialUrls)
		setLoading(false)
		setProgress([])
		setError()
	}

	const allDone = progress.every((item) => item.percents === 100)

	const resetButton = (
		<button type="button" onClick={handleReset}>
			Reset
		</button>
	)

	if (error) {
		return (
			<div className={css.outerContainer}>
				<div className={css.innerContainer}>
					<p className={css.error}>Error: {error}</p>
					{resetButton}
				</div>
			</div>
		)
	}

	if (loading && progress.length === 0) {
		return (
			<div className={css.outerContainer}>
				<div className={css.innerContainer}>
					<p className="mb-10">Getting things ready</p>
					<div className="spinner" />
				</div>
			</div>
		)
	}

	if (progress.length > 0) {
		return (
			<div className={css.outerContainer}>
				<div className={css.innerContainer}>
					{allDone && resetButton}
					{progress.map((progress) => (
						<p className={css.song} key={progress.videoId}>
							{progress.title} ..... {progress.percents}%
						</p>
					))}
				</div>
			</div>
		)
	}

	const allValid = urls.every((item) => Boolean(item.value))

	return (
		<div className={css.outerContainer}>
			<div className={css.innerContainer}>
				<form onSubmit={handleConvert}>
					{urls.map((url) => (
						<div key={url.id} className={`mb-5 ${css.urlContainer}`}>
							<input
								type="url"
								placeholder="Paste your YouTube URL here"
								value={url.value}
								name={url.id}
								onChange={handleChange}
							/>
							<button
								tabIndex={-1}
								type="button"
								disabled={urls.length === 1}
								onClick={handleRemove(url.id)}
								className={`ml-5 ${css.removeButton}`}
							/>
						</div>
					))}
					<div className={css.actionsContainer}>
						<button
							type="button"
							tabIndex={-1}
							className={css.addButton}
							onClick={handleAdd}
						>
							+
						</button>
						<button type="submit" disabled={!allValid} className="ml-5">
							Convert
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
