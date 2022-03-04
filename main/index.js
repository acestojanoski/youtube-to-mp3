const { app, BrowserWindow } = require('electron')
const path = require('path')

const isDevelopment = process.env.NODE_ENV === 'development'

/** @type {import('electron').BrowserWindow} */
let mainWindow = null

function createWindow() {
	/** @type {import('electron').BrowserWindowConstructorOptions} */
	const browserOptions = {
		width: 800,
		height: 600,
		maximizeable: false,
		resizable: false,
		maximizable: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			devTools: isDevelopment,
		},
	}

	mainWindow = new BrowserWindow(browserOptions)
	mainWindow.loadURL('file://' + path.join(__dirname, '..', '/dist/index.html'))

	// We need the menu only in development
	if (!isDevelopment) {
		mainWindow.setMenu(null)
	}

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	app.quit()
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

// Register features
require('./convert')
