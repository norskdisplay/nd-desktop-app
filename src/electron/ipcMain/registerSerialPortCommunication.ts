import { RegisterIpc } from ".";
import { serialPort } from "../SerialPort";

export const registerSerialPortCommunication: RegisterIpc = (ipcMain) => {
	ipcMain.handle('get-available-serial-ports', async () => {
		const result = await serialPort.getAvailablePorts()
		return result
	})
	
	ipcMain.handle('set-choosen-serial-port', async (event, port: string) => {
		return await serialPort.handleSelectPort(port)
	})
	
	ipcMain.handle('send-text-serial-port', (event, text: string) => {
		serialPort.writeInterval(text)
	})
}