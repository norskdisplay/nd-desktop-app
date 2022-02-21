import { RegisterIpc } from ".";
import { config } from "../ConfigService";

export const registerGetConfig: RegisterIpc = (ipcMain) => {
	ipcMain.handle('get-config', () => {
		return config.getConfig()
	})
}