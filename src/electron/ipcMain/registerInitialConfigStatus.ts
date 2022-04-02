import { RegisterIpc } from ".";
import { config } from "../ConfigService";

export const registerInitialConfigStatus: RegisterIpc = (ipcMain) => {
	ipcMain.handle('get-config-status', async () => {
		return config.getStatus()
	})
}