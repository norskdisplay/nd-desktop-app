import { AvailabePort } from "../src/sharedTypes/globals"
import { logger } from "./Logger"
import { SerialPortControllerConfig } from "./types/CommunicationConfigType"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const RequiredSerialPort = require("serialport")

const SerialPort = "list" in RequiredSerialPort ? RequiredSerialPort : RequiredSerialPort.SerialPort

export class SerialPortController {
	private serPorInst: typeof SerialPort | null = null
	private hasError = false
	private error: string | null = null
	private port: string = ""

	static getAvailablePorts = () => new Promise<AvailabePort[]>((res, rej) => {
		SerialPort.list().then(res, rej)
	})
	private handleGlobalError() {
		this.serPorInst.on('error', (err: Error) => {
			logger.debug("Global SerialPort error: " + err.message)
			this.hasError = true
			this.error = err.message
		})
	}
	public start(config: SerialPortControllerConfig) {
		if (config.config == null) return; // Should never be null here
		const { port, dataBits, stopBits, baudRate } = config.config
		this.port = "COM" + port
		this.serPorInst = new SerialPort({
			path: this.port,
			dataBits: parseInt(dataBits, 10),
			stopBits: parseInt(stopBits, 10),
			baudRate: baudRate
		}, (err: Error) => {
			if (err) {
				logger.debug("Error setting up SerialPort in start: " + err.message)
				this.hasError = true
				this.error = err?.message || "Could not connect to serial port " + this.port
			}
		})
		this.handleGlobalError()
	}
	public state() {
		return {
			hasError: this.hasError,
			error: this.error
		}
	}
	public write = (texts: string[]) => new Promise<void>((res, rej) => {
		if (this.hasError) {
			return rej(this.error)
		}
		if (!Array.isArray(texts)) {
			return rej("Text must be an array of strings. Received " + typeof texts)
		}
		if (!this.serPorInst.isOpen) {
			return rej("Port "+ this.port + " is not open")
		}
		const errorMessages: string[] = []
		texts.forEach((text) => {
			this.serPorInst.write(Buffer.from(text), (err?: Error) => {
				if (err) {
					errorMessages.push(err.message)
				}
			})
		})
		if (errorMessages.length) {
			rej(errorMessages)
		}
		res()
	})
	public close = () => new Promise<void>((res) => {
		if (this.serPorInst.isOpen) {
			this.serPorInst.close(() => {
				this.serPorInst = null
				return res()
			})
		} else {
			this.serPorInst = null
			return res()
		}
	})
}