import { Config } from '../src/sharedTypes/configSchema';
import { CommunicationController } from './CommunicationController';
import { configService } from "./ConfigService";
import { logger } from './Logger';
import { SerialPortControllerConfig, TcpControllerConfig } from './types/CommunicationConfigType';

class AppService {
	private app: Electron.App | null = null
	private communicationsController = new CommunicationController()

	public get isRunning() {
		return this.communicationsController.isRunning
	}

	/**
	 * Should only be called with a valid configuration
	 */
	private startService(config: Config) {
		const { out, displays } = config;
		if (!displays.length) {
			logger.debug("no displays config, aborting service start")
			return
		}
		const texts = displays.map(x => x.description).filter(x => x !== undefined && x != null) as string[]

		if (out.protocol === "COM") {
			if (out.comConfig == null) {
				logger.debug("COM Config is null, do not start service")
				return
			}
			const comConfig: SerialPortControllerConfig = {
				protocol: out.protocol,
				texts,
				config: {
					...out.comConfig,
					refreshRate: out.refreshRate
				}
			}
			this.communicationsController.start(comConfig)
			logger.debug("Started COM Service with config " + JSON.stringify(comConfig))
			return
		}
		if (out.protocol === "TCP") {
			const displayData = displays.filter(x => x.ip && x.port !== undefined);
			const tcpConfig: TcpControllerConfig = {
				protocol: out.protocol,
				displays: displayData,
				config: {
					refreshRate: out.refreshRate
				}
			}
			this.communicationsController.start(tcpConfig)
			logger.debug("Started TCPs Service with config " + JSON.stringify(tcpConfig))
			return
		}
		logger.debug("No starting function defined for " + out.protocol + " in App Service")
	}

	private registerAppStartupPreference(config: Config) {
		if (this.app == null) return
		this.app.setLoginItemSettings({
			openAtLogin: config.user.startAppOnOSLogin
		})
	}

	public async Restart() {
		const config = await configService.getConfig()
		await this.Stop()
		this.startService(config)
		this.registerAppStartupPreference(config)
	}

	public async Start(app: Electron.App) {
		this.app = app
		await configService.loadConfig()
		if (configService.isValid) {
			const config = await configService.getConfig()
			if (config.user.startSendingOnAppStart) {
				this.startService(config)
			}
			this.registerAppStartupPreference(config)
			return
		}
		logger.error("Could not start service, config was not valid")
	}

	public async requestStart() {
		const config = await configService.getConfig()
		this.startService(config)
	}

	public async Stop() {
		await this.communicationsController.stop()
	}
}

export const appService = new AppService();