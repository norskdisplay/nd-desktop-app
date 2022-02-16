import { AvailabePort } from "../globals"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const RequiredSerialPort = require("serialport")

const SerialPort = "list" in RequiredSerialPort ? RequiredSerialPort : RequiredSerialPort.SerialPort

export class SerialPortController {
	private serPorInst: typeof SerialPort | null = null
	private hasError = false
	private error: string | null = null
	constructor(private port: string) {
		this.serPorInst = new SerialPort({
			path: port,
			dataBits: 8,
			stopBits: 1,
			baudRate: 9600
		}, (err: Error) => {
			if (err) {
				this.hasError = true
				this.error = err?.message || "Could not connect to serial port " + port
			}
		})
		this.handleGlobalError()
	}
	static getAvailablePorts = () => new Promise<AvailabePort[]>((res, rej) => {
		SerialPort.list().then(res, rej)
	})
	private handleGlobalError() {
		this.serPorInst.on('error', (err: Error) => {
			this.hasError = true
			this.error = err.message
		})
	}
	public state() {
		return {
			hasError: this.hasError,
			error: this.error
		}
	}
	public configuredPort() {
		return this.port
	}
	public write = (text: string) => new Promise<void>((res, rej) => {
		if (this.hasError) {
			return rej(this.error)
		}
		if (typeof text !== "string") {
			return rej("Text must be of type string. Received " + typeof text)
		}
		if (!this.serPorInst.isOpen) {
			return rej("Port "+ this.port + " is not open")
		}
		this.serPorInst.write(Buffer.from(text), (err?: Error) => {
			if (err) {
				return rej(err.message)
			}
			return res()
		})
	})
	public disconnect = () => new Promise<void>((res) => {
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