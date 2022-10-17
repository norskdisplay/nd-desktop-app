import { app, BrowserWindow } from "electron";
import { RegisterIpc } from ".";
import * as path from "path"

let childWindow: BrowserWindow | null = null
export const registerOpenHelpWindow: RegisterIpc = (ipcMain) => {
	ipcMain.handle('open-help-window', (event) => {
		if (childWindow === null) {
			childWindow = new BrowserWindow({
				frame: true,
				resizable: true,
				center: true,
				width: 400,
				height: 550,
				backgroundColor: "#121212",
				webPreferences: {
					nodeIntegration: false,
					webSecurity: false
				}
			});
			childWindow.removeMenu()
			const filePath = path.resolve(__dirname, "../../helptext.html")
			console.log("loading filepath: " + filePath)
			childWindow.loadURL(filePath);
			if (!app.isPackaged) {
				// childWindow.webContents.openDevTools();
			}
			childWindow.on("closed", () => {
				setTimeout(() => {
					childWindow = null;
				}, 1)
			})
		} else {
			childWindow.focus()
		}
	})
}