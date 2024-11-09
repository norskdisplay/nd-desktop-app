import { includeMergeFields } from './../src/utils/replaceText';
import { SerialPortControllerConfig } from './types/CommunicationConfigType';
import { logger } from "./Logger"
import { SerialPortController } from "./SerialPortController"
import { withAscii } from './utils/withAscii';

class SerialPort {
	intervalRef: NodeJS.Timeout | null = null
	availablePortsIntervalRef: NodeJS.Timeout | null = null
	writeFailedCount = 0
	text: string = ""
	serialConnection: SerialPortController | null = null
	
	async getAvailablePorts() {
		try {
			const ports = await SerialPortController.getAvailablePorts()
			return ports
		} catch (e) {
			const message = e instanceof Error ? e.message : "No error message provided"
			logger.error("Failed to get ports: " + message)
			return []
		}
	}

	public start(config: SerialPortControllerConfig) {
		if (config.config == null) return // should nevner happen
		this.serialConnection = new SerialPortController()
		this.serialConnection.start(config)
		this.writeInterval(config.texts, config.config.refreshRate)
	}

	public async stop() {
		await this.close()
	}

	public checkAvailablePorts() {
		this.availablePortsIntervalRef = setInterval(() => {
			this.getAvailablePorts()
		}, 1000)
	}

	public async close() {
		this.reset()
		if (this.serialConnection) {
			await this.serialConnection.close()
			this.serialConnection = null
		}
	}

	private reset() {
		if (this.intervalRef) {
			clearInterval(this.intervalRef)
		}
		this.writeFailedCount = 0
	}

	async write(texts: string[]) {
		try {
			if (!this.serialConnection) {
				logger.error("No serial connection instance exist")
				throw new Error("No serial connection instance exist")
			}
			await this.serialConnection.write(texts)
		} catch (e) {
			this.writeFailedCount += 1
			if (this.writeFailedCount > 3) {
				this.reset()
			}
		}
	}
	
	writeInterval = async (rawTexts: string[], ms = 10) => {
		this.intervalRef = setInterval(() => {
			this.write(rawTexts.map(t => withAscii(includeMergeFields(t))))
		}, ms)
	}
}

export const serialPort = new SerialPort();