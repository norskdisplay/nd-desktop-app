import { app, BrowserWindow, shell } from "electron";
import * as path from "path";
import { URL } from "url"
import { logger } from "./Logger";
import { registerIpc } from "./ipcMain";
import { appService } from "./AppService";

/**
"TypeError: Cannot read property 'indexOf' of undefined": 
https://stackoverflow.com/questions/59231294/typeerror-cannot-read-property-indexof-of-undefined-raised-when-using-packa
 */

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	// eslint-disable-line global-require
	app.quit();
}

function createWindow() {
	const mainWindow = new BrowserWindow({
		frame: true,
		// titleBarStyle: 'hidden',
		// titleBarOverlay: true,
		// movable: true,
		resizable: true,
		center: true,
		width: 400,
		height: 550,
		webPreferences: {
			nodeIntegration: false,
			preload: path.join(__dirname, "./preload.js"),
			sandbox: true
		}
	});
	mainWindow.removeMenu()
	if (app.isPackaged) {
		mainWindow.loadURL(`file://${__dirname}/../index.html`);
	} else {
		mainWindow.loadURL('http://localhost:3000');

		mainWindow.webContents.openDevTools();

		// Hot Reloading on 'node_modules/.bin/electronPath'
		require('electron-reload')(__dirname, {
			electron: path.join(__dirname,
				'..',
				'..',
				'node_modules',
				'.bin',
				'electron' + (process.platform === "win32" ? ".cmd" : "")),
			forceHardReset: true,
			hardResetMethod: 'exit'
		});
	}
	registerIpc(mainWindow)
}

app.on("ready", async () => {
	await appService.Start(app)
	createWindow();

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

process.on("uncaughtException", (error: string | object | Error) => {
	logger.error(error)
	process.exit(1)
})

process.on("unhandledRejection", (reason: string | object | Error) => {
	logger.error(reason)
	throw reason // will end up in uncaughtException
})

// For security reasons, allow only navigate to norsk display
// ref https://www.electronjs.org/docs/latest/tutorial/security#13-disable-or-limit-navigation
// ref https://www.electronjs.org/docs/latest/tutorial/security#14-disable-or-limit-creation-of-new-windows
app.on('web-contents-created', (event, contents) => {
	contents.on('will-navigate', (event, navigationUrl) => {
		const parsedUrl = new URL(navigationUrl)

		if (parsedUrl.origin !== 'https://www.norskdisplay.com') {
			event.preventDefault()
		}
	})
	contents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith("https://www.norskdisplay.com")) {
			setImmediate(() => {
				shell.openExternal(url)
			})
		}
		return { action: 'deny' }
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", async () => {
	await appService.Stop()
	if (process.platform !== "darwin") {
		app.quit();
	}
});
