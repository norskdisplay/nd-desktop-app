import { RegisterIpc } from ".";
import { appService } from '../AppService';

export const registerStartSending: RegisterIpc = (ipcMain) => {
	ipcMain.handle('start-sending', async () => {
		await appService.requestStart()
	})
}