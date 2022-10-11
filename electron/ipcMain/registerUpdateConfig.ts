import { configSchema } from './../../src/sharedTypes/configSchema';
import { RegisterIpc } from ".";
import { Config } from "../../src/sharedTypes/configSchema";
import { configService } from "../ConfigService";
import { logger } from '../Logger';

export const registerUpdateConfig: RegisterIpc = (ipcMain) => {
	ipcMain.handle('update-config', (event, newConfig: Config) => {
		try {
			const parser = configSchema.safeParse(newConfig)
			if (parser.success) {
				logger.debug("updateConfig: got valid config.")
				return configService.updateConfig(newConfig)
			}
			logger.debug("updateConfig: config is invalid")
			return parser.error.issues.map(issue => issue.message);
		} catch (e: unknown) {
			return [e instanceof Error ? e.message : "Whoops an error occured"]
		}
	})
}