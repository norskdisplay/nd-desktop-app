import { RegisterIpc } from ".";
import { appService } from '../AppService';

export const registerIsSending: RegisterIpc = (ipcMain) => {
	ipcMain.handle('is-sending', () => {
		return appService.isRunning
	})
}