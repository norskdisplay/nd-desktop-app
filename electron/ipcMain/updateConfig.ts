import { RegisterIpc } from ".";
import { Config } from "../../src/sharedTypes/configSchema";
import { config } from "../ConfigService";

export const updateConfig: RegisterIpc = (ipcMain) => {
	ipcMain.handle('updated-config', (event, newConfig: Config) => {
		return config.updateConfig(newConfig)
	})
}