import { LoadConfigResponse, UploadConfigResponse } from './../types/LoadConfigResponse';
import { Config, configSchema } from './../configSchema';
import { load, dump } from "js-yaml"
import { readFile, writeFile, access } from "fs/promises"
import { logger } from "./Logger"
import { defaultConfig } from "./defaultConfig"
import { getConfigFilePath } from './utils/getConfigFilePath';

class ConfigService {
	lastConfig: Config | null = null
	configFilePath = getConfigFilePath()
	loadConfigStatus?: LoadConfigResponse

	public getStatus() {
		return this.loadConfigStatus
	}

	public async getConfig() {
		if (this.lastConfig === null) {
			await this.loadConfig()
		}
		return this.lastConfig as Config
	}
	public async updateConfig(c: Config) {
		logger.debug("Updating config " + JSON.stringify(c))
		try {
			await this.writeConfig(c)
			this.lastConfig = c
			logger.debug("Updating config success")
		} catch (e: unknown) {
			logger.error(e)
		}
	}
	private async configExist(): Promise<boolean> {
		try {
			await access(this.configFilePath)
			return true
		} catch (e: unknown) {
			return false
		}
	}
	public async loadConfig(): Promise<void> {
		logger.debug("Loading config...")
		try {
			const exist = await this.configExist()
			if (exist) {
				logger.debug("Config exist, using existing")
				const config = await this.readConfig()
				const validatedConfig = this.validateConfig(config)
				if (!validatedConfig.success) {
					this.loadConfigStatus = {
						type: "validationerror",
						data: validatedConfig.error.issues
					}
				}
			} else {
				logger.debug(`No config file found in ${this.configFilePath}, creating config file from default config.`)
				await this.writeConfig(defaultConfig)
				this.loadConfigStatus = {
					type: "success",
					message: "Created new config file"
				}
			}
		} catch (e: unknown) {
			if (e instanceof Error) {
				logger.error("Unable to load config: " + e.toString())
				this.loadConfigStatus = {
					type: "error",
					message: e.message
				}
			} else {
				logger.error("Could not load config. Error is not instance of error")
				this.loadConfigStatus = {
					type: "error",
					message: "Could not load config. No error provided."
				}
			}
		}
	}
	private async readConfig(): Promise<Config> {
		const fileContentRaw = await readFile(this.configFilePath, "utf-8")
		const fileContent = load(fileContentRaw) as Config
		this.lastConfig = fileContent
		return fileContent
	}
	private async writeConfig(c: Config){
		this.lastConfig = c
		const resp = await this.writeCurrentConfigTo(this.configFilePath)
		return resp
	}

	public validateConfig(config: Config) {
		return configSchema.safeParse(config)
	}

	public async loadConfigFrom(source: string): Promise<UploadConfigResponse> {
		try {
			const rawConfig = await readFile(source, "utf-8")
			const config = load(rawConfig) as Config
			const validatedConfig = this.validateConfig(config)
			if (!validatedConfig.success) {
				return {
					type: "validationerror",
					data: validatedConfig.error.issues
				}
			}
			this.writeConfig(config)
			return {
				type: "success",
				message: "Successfully loaded config from " + source + "."
			}
		} catch (e: unknown) {
			return {
				type: "error",
				message: e instanceof Error ? e.message : "Something went wrong"
			}
		}
	}

	public async writeCurrentConfigTo(dest: string) {
		const fileContent = dump(this.lastConfig)
		await writeFile(dest, fileContent, "utf-8")
		return {
			dest, 
			content: fileContent,
			config: this.lastConfig
		}
	}
}

export const config = new ConfigService()