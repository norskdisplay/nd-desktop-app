import { BrowserWindow, ipcMain } from "electron";
import { registerGetConfig } from "./registerGetConfig";
import { registerSerialPortCommunication } from "./registerSerialPortCommunication";
import { registerUploadDownloadConfig } from "./registerUploadDownloadConfig";

export type RegisterIpc = (ipcMain: Electron.IpcMain, m: BrowserWindow) => void

const toRegister: RegisterIpc[] = [
	registerUploadDownloadConfig,
	registerGetConfig,
	registerSerialPortCommunication
]

export const register = (mainWindow: BrowserWindow) => {
	toRegister.forEach((r) => r(ipcMain, mainWindow))
}