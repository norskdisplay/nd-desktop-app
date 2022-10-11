import { RegisterIpc } from ".";
import { configService } from "../ConfigService";

export const registerInitialConfigStatus: RegisterIpc = (ipcMain) => {
	ipcMain.handle('get-config-status', async () => {
		return configService.getStatus()
	})
}