import { TcpControllerConfig } from "./types/CommunicationConfigType";
import { Socket } from "net"
import { logger } from "./Logger";
import { includeMergeFields } from "../src/utils/replaceText";
import { withAscii } from "./utils/withAscii";
import { DisplayConfig } from "../src/sharedTypes/configSchema";

export class TcpController {
	private refreshRate: number = 0
	intervalRef: NodeJS.Timeout | null = null
	private socketsMap: {
		[name: string]: DisplayConfig & {
			retries: 0
			socket: Socket
			text: string
		}
	} = {}

	private startWrite() {
		if (this.socketsMap == null) return
		
		this.intervalRef = setInterval(() => {
			Object.values(this.socketsMap).filter(entry => typeof entry.text === "string" && entry.text !== "").forEach((entry) => {
				var textToWrite = withAscii(includeMergeFields(entry.text))
				entry.socket.write(textToWrite)
			})
		}, this.refreshRate)
	}

	// private registerErrorHandlers() {
	// 	if (this.socketsMap == null) return
	// 	// TODO FIND OUT WHY NODE PROCESS DIES ON ETIMEOUT BEFORE RETRY
	// 	Object.entries(this.socketsMap).forEach(([key, value]) => {
	// 		value.socket.on("error", (err) => {
	// 			logger.error(`Socket error occured for ${key}. Error:` + err.message)
				
	// 			var code = (err as any).code
	// 			if (err.message.includes("ETIMEDOUT") || (code && code.includes("ETIMEDOUT"))) {
	// 				this.restartSocket(key)
	// 			}
	// 		})
	// 	})
	// }

	private registerErrorHandlerOnSocket(key: string, socket: Socket) {
		socket.on("error", (err) => {
			logger.error(`Socket error occured for ${key}. Error:` + err.message)
			
			var code = (err as any).code
			if (err.message.includes("ETIMEDOUT") || (code && code.includes("ETIMEDOUT"))) {
				this.restartSocket(key)
			}
		})
	}

	private getSocketMapKey(d: DisplayConfig) {
		return `${d.description ?? ""}_${d.ip}:${d.port}`
	}

	private createAndConnectSocket(key: string, ip: string, port: number): Socket {
		const socket = new Socket()
		this.registerErrorHandlerOnSocket(key, socket)
		socket.connect({ port: port, host: ip })
		return socket
	}

	private setupConnections(displays: DisplayConfig[]) {
		// TODO validate config before starting
		displays.forEach((display) => {
			const socketMapKey = this.getSocketMapKey(display)
			const socket = this.createAndConnectSocket(socketMapKey, display.ip!, display.port!)
			this.socketsMap[socketMapKey] = {
				socket,
				retries: 0,
				text: display.description!,
				...display
			}
		})
	}
	
	public start(config: TcpControllerConfig) {
		if (config.config == null) return // Should not happen
		this.refreshRate = config.config.refreshRate
		logger.debug("Trying to connect to socket with config " + JSON.stringify(config))
		this.setupConnections(config.displays)
		this.startWrite()
	}

	public restartSocket(key: string) {
		const hasKey = key in this.socketsMap
		if (!hasKey) {
			logger.error("Expected "+key+" in socket map but was not found")
			return
		}

		const entry = this.socketsMap[key]
		if (entry.retries > 5) {
			logger.error(`Retries for connection with key ${key} and ip ${entry.ip} and port ${entry.port} failed after ${entry.retries} retries`)
			delete this.socketsMap[key]
			return
		}

		this.destroySocket(entry.socket)
		const newSocket = this.createAndConnectSocket(key, entry.ip!, entry.port!)
		entry.socket = newSocket
		entry.retries += 1
	}

	private destroySocket(socket: Socket){
		socket.removeAllListeners()
		socket.destroy()
	}

	public stop() {
		// stop 
		if (this.intervalRef) {
			clearInterval(this.intervalRef)
			this.intervalRef = null
		}
		if (this.socketsMap == null) return;
		Object.values(this.socketsMap).forEach((entry) => {
			this.destroySocket(entry.socket)
		})
	}
}

export const tcpController = new TcpController()