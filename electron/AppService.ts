import { Config } from '../src/sharedTypes/configSchema';
import { CommunicationController } from './CommunicationController';
import { configService } from "./ConfigService";
import { logger } from './Logger';
import { SerialPortControllerConfig, TcpControllerConfig } from './types/CommunicationConfigType';

class AppService {
	private app: Electron.App | null = null
	private communicationsController = new CommunicationController()

	/**
	 * Should only be called with a valid configuration
	 */
	private startService(config: Config) {
		const { out, displays } = config;
		if (!displays.length) {
			logger.debug("no displays config, aborting service start")
			return
		}
		const text = displays[0].description

		if (out.protocol === "COM") {
			if (out.comConfig == null) {
				logger.debug("COM Config is null, do not start service")
				return
			}
			const comConfig: SerialPortControllerConfig = {
				protocol: out.protocol,
				text,
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
			if (out.tcpConfig == null) {
				logger.debug("TCP Config is null, do not start service")
				return
			}
			const tcpConfig: TcpControllerConfig = {
				protocol: out.protocol,
				text,
				config: {
					...out.tcpConfig,
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
		await this.Stop()
		await this.requestStart()
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
		}
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