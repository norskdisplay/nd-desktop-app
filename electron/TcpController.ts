import { TcpControllerConfig } from "./types/CommunicationConfigType";
import { Socket } from "net"
import { logger } from "./Logger";
import { includeMergeFields } from "../src/utils/replaceText";
import { withAscii } from "./utils/withAscii";

export class TcpController {
	private config: TcpControllerConfig | null = null
	private refreshRate: number = 0
	intervalRef: NodeJS.Timeout | null = null
	private socket: Socket | null = null

	private startWrite(str: string) {
		if (this.socket == null) return
		
		this.intervalRef = setInterval(() => {
			if (this.socket != null) {
				var textToWrite = withAscii(includeMergeFields(str))
				this.socket.write(textToWrite)
			}
		}, this.refreshRate)
	}

	private registerErrorHandler() {
		if (this.socket == null) return
		this.socket.on("error", (err) => {
			logger.debug("Socket error occured. Error: " + err.message)
			
			if (err.message.includes("ETIMEDOUT")) {
				this.stop()
				if (this.config == null) return
				this.start(this.config)
			}
		})
	}
	
	public start(config: TcpControllerConfig) {
		if (config.config == null) return // Should not happen
		this.config = config
		this.refreshRate = config.config.refreshRate
		this.socket = new Socket()
		this.socket.connect({ port: config.config.port, host: config.config.ip })
		logger.debug("Trying to connect to socket with config " + JSON.stringify({ port: config.config.port, host: config.config.ip }))
		this.registerErrorHandler()
		this.startWrite(config.text)
	}
	public stop() {
		if (this.intervalRef) {
			clearInterval(this.intervalRef)
			this.intervalRef = null
		}
		if (this.socket != null) {
			this.socket.removeAllListeners()
			this.socket.destroy()
			this.socket = null
		}
	}
}

export const tcpController = new TcpController()