import { RegisterIpc } from ".";
import { serialPort } from "../SerialPort";

export const registerSerialPortCommunication: RegisterIpc = (ipcMain) => {
	ipcMain.handle('get-available-serial-ports', async () => {
		const result = await serialPort.getAvailablePorts()
		return result
	})
	
	ipcMain.handle('start-broadcast', (event) => {
		// serialPort.writeInterval(text)
	})
}