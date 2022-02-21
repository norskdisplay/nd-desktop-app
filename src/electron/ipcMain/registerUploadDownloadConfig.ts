import { LoadConfigResponse } from './../../types/LoadConfigResponse';
import { app, dialog } from "electron"
import { RegisterIpc } from "./index"
import { logger } from "../Logger"
import { config } from "../ConfigService"
import { resolve } from "path"
import { configFileName } from "../utils/getConfigFilePath"

export const registerUploadDownloadConfig: RegisterIpc = (ipcMain, mainWindow) => {
	ipcMain.handle("download-config", async () => {
		logger.debug("Downloading config")
		try {
			const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
				properties: ['openDirectory'],
				defaultPath: app.getPath("downloads")
			})
			if (canceled) {
				return // TODO return reason
			}
			logger.debug("Selected folder: " + filePaths.join(", "))
			const path = await config.writeCurrentConfigTo(resolve(filePaths[0], configFileName));
			return {
				status: "success",
				message: "File downloaded to " + path
			}
		} catch (e: unknown) {
			const isError = e instanceof Error
			logger.error("Downloading config failed " + (isError ? e.message : "Unspecified error"))
			return {
				status: "error",
				message: isError ? e.message : "Sorry download failed."
			}
		}
	})

	ipcMain.handle("upload-config", async (): Promise<LoadConfigResponse> => {
		logger.debug("Upload config")
		try {
			const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
				properties: ["openFile"],
				filters: [{
					name: "YAML",
					extensions: ["yml", "yaml"]
				}],
				defaultPath: app.getPath("downloads")
			})
			if (canceled) {
				return {
					type: "cancelled"
				}
			}
			logger.debug("Selected folder: " + filePaths.join(", "))
			return await config.loadConfigFrom(filePaths[0])
		} catch (e: unknown) {
			const isError = e instanceof Error
			logger.error("Upload config failed " + (isError ? e.message : "Unspecified error"))
			return {
				type: "error",
				message: isError ? e.message : "Sorry upload config failed."
			}
		}
	})
}
