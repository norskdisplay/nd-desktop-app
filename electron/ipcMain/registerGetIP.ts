import { RegisterIpc } from ".";
// import { networkInterfaces } from "os"
import { logger } from "../Logger";

const ip = require("ip")

export const registerGetIP: RegisterIpc = (ipcMain) => {
	ipcMain.handle('get-current-ipv4', async () => {
		// const interfaces = networkInterfaces()
		// const addresses = [];
		// for (var k in interfaces) {
		// 	for (var k2 in interfaces[k]) {
		// 		const address = (interfaces as any)[k][k2];
		// 		if (address.family === 'IPv4' && !address.internal) {
		// 			addresses.push(address.address);
		// 		}
		// 	}
		// }
		const ipAddress = ip.address();
		logger.debug("Got ip address " + ipAddress)

		return ipAddress
	})
}