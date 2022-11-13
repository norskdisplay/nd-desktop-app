import { logger } from "./Logger";
import { serialPort } from "./SerialPort";
import { tcpController } from "./TcpController";
import { CommunicationConfigType } from "./types/CommunicationConfigType";
import { throwIfItReachesHere } from "./utils/throwIfItReachesHere";

export class CommunicationController {
	runningService: "COM" | "TCP" = "COM"
	isRunning = false
	public start(service: CommunicationConfigType) {
		try {
			this.stop()
			this.runningService = service.protocol
			this.isRunning = true;
			this.serviceRegisterStart(service)
		} catch (e: unknown) {
			if (e instanceof Error) {
				logger.error(e)
			} else {
				logger.error("Unknown error occored: " + e)
			}
		}
	}

	private async serviceRegisterStart(service: CommunicationConfigType) {
		switch(service.protocol) {
			case "COM":
				serialPort.start(service)
				return
			case "TCP":
				tcpController.start(service)
				return
			default:
				throwIfItReachesHere(`Unexpected service name: ${service}`, service)
		}
	}

	private async serviceRegisterStop() {
		switch(this.runningService) {
			case "COM":
				await serialPort.stop()
				return
			case "TCP":
				tcpController.stop()
				return
			default:
				throwIfItReachesHere(`Unexpected service name: ${this.runningService}`, this.runningService)
		}
	}
	
	public async stop() {
		try {
			if (!this.isRunning) return
			await this.serviceRegisterStop();
			this.isRunning = false;
		} catch(e: unknown) {
			if (e instanceof Error) {
				logger.error(e)
			} else {
				logger.error("Unknown error occored: " + e)
			}
		}
	}
}
