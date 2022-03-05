const { contextBridge, ipcRenderer } = require('electron')

/**
 * @typedef {{
 * 	invoke: (...args: string[]) => Promise<any>,
 * 	on: (channel: string, callback: (...args: any[]) => void),
 * }} ConvertAPI
 */

/** @type {ConvertAPI} */
const convertAPI = {
	invoke: (...args) => {
		return ipcRenderer.invoke('convert', ...args)
	},
	on: (channel, callback) => {
		ipcRenderer.on(channel, (_, ...args) => {
			callback(...args)
		})
	},
}

contextBridge.exposeInMainWorld('convertAPI', convertAPI)
