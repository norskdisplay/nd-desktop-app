import { SerialPortController } from "./SerialPortController"

class SerialPort {
	intervalRef: NodeJS.Timeout
	writeFailedCount = 0
	serialConnection: SerialPortController | null = null
	
	async getAvailablePorts() {
		try {
			const ports = await SerialPortController.getAvailablePorts()
			if (ports.length > 0) {
				this.handleSelectPort(ports[0].path)
			}
			return ports
		} catch (e) {
			return []
		}
	}

	async handleSelectPort(port: string) {
		if (this.serialConnection === null) {
			this.serialConnection = new SerialPortController(port)
			return
		}
		if (this.serialConnection.configuredPort() !== port) {
			await this.serialConnection.disconnect()
			this.serialConnection = new SerialPortController(port)
			this.reset()
			return
		}
	}

	public async close() {
		this.reset()
		await this.serialConnection.disconnect()
		this.serialConnection = null
	}

	private reset() {
		if (this.intervalRef) {
			clearInterval(this.intervalRef)
		}
		this.writeFailedCount = 0
	}

	async write(text: string) {
		try {
			await this.serialConnection.write(text)
		} catch (e) {
			this.writeFailedCount += 1
			if (this.writeFailedCount > 3) {
				this.reset()
			}
		}
	}
	
	writeInterval = async (text: string, ms: number = 10) => {
		this.intervalRef = setInterval(() => {
			this.write(text)
		}, ms)
	}
}

export const serialPort = new SerialPort();