import { RegisterIpc } from ".";
import { configService } from "../ConfigService";
import { logger } from "../Logger";
import { DebugConfigPathsResponse } from "../../src/sharedTypes/debugConfig"

export const registerGetDebugPaths: RegisterIpc = (ipcMain) => {
	ipcMain.handle('get-debug-paths', () => {
		const paths: DebugConfigPathsResponse = [{
			name: "Logs path",
			path: logger.path
		}, {
			name: "Config path",
			path: configService.configFilePath
		}]
		return paths
	})
}