import { serialPort } from "./SerialPort";
import { tcpController } from "./TcpController";
import { CommunicationConfigType } from "./types/CommunicationConfigType";
import { throwIfItReachesHere } from "./utils/throwIfItReachesHere";

export class CommunicationController {
	runningService: "COM" | "TCP" = "COM"
	public start(service: CommunicationConfigType) {
		this.stop()
		this.runningService = service.protocol
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
	
	public async stop() {
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
}
