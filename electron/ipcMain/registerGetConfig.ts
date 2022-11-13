import { RegisterIpc } from ".";
import { configService } from "../ConfigService";

export const registerGetConfig: RegisterIpc = (ipcMain) => {
	ipcMain.handle('get-config', () => {
		return configService.getConfig()
	})
}