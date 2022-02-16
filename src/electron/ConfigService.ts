import { Config } from './../configSchema';
import { load, dump } from "js-yaml"
import { readFile, writeFile, access } from "fs/promises"
import { resolve } from "path"
import { logger } from "./Logger"
import { defaultConfig } from "./defaultConfig"
import { app } from "electron"

class ConfigService {
	lastConfig: Config | null = null
	configFilePath = resolve(app.getPath("userData"), "config.yml")

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
				await this.readConfig()
			} else {
				logger.debug(`No config file found in ${this.configFilePath}, creating config file from default config.`)
				await this.writeConfig(defaultConfig)
			}
		} catch (e: unknown) {
			if (e instanceof Error) {
				logger.error("Unable to load config: " + e.toString())
				return 
			}
			logger.error("Could not load config. Error is not instance of error")
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
		const fileContent = dump(c)
		await writeFile(this.configFilePath, fileContent, "utf-8")
	}
}

export const config = new ConfigService()