import { app, BrowserWindow, ipcMain, shell } from "electron";
import * as path from "path";
import { serialPort } from "./SerialPort";
import { URL } from "url"

/**
"TypeError: Cannot read property 'indexOf' of undefined": 
https://stackoverflow.com/questions/59231294/typeerror-cannot-read-property-indexof-of-undefined-raised-when-using-packa
 */

function createWindow() {
	const mainWindow = new BrowserWindow({
		frame: true,
		// titleBarStyle: 'hidden',
  		// titleBarOverlay: true,
		//   movable: true,
		resizable: true,
		center: true,
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			preload: path.join(__dirname, "./preload.js"),
			sandbox: true
		}
	});
	mainWindow.removeMenu()
	mainWindow.loadFile(path.join(__dirname, "../index.html"));
	mainWindow.webContents.openDevTools()
}

ipcMain.handle('get-available-serial-ports', async (event, ...args) => {
	const result = await serialPort.getAvailablePorts()
	return result
})

ipcMain.handle('set-choosen-serial-port', async (event, port: string) => {
	return await serialPort.handleSelectPort(port)
})

ipcMain.handle('send-text-serial-port', (event, text: string) => {
	serialPort.writeInterval(text)
})

app.on("ready", () => {
	createWindow();
	
	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

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
	await serialPort.close()
	if (process.platform !== "darwin") {
		app.quit();
	}
});
