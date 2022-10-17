import { RegisterIpc } from ".";
import { appService } from '../AppService';

export const registerStopSending: RegisterIpc = (ipcMain) => {
	ipcMain.handle('stop-sending', async () => {
		await appService.Stop()
	})
}