import { COMConfig } from '../../src/sharedTypes/comConfig'
import { DisplayConfig, RefreshRateType } from '../../src/sharedTypes/configSchema';

export type SerialPortControllerConfig =  {
	protocol: "COM",
	texts: string[],
	config: null | COMConfig & { refreshRate: RefreshRateType }
}

export type DisplayConnection = {
	text: string
	ip: string
	port: number
}

export type TcpControllerConfig = {
	protocol: "TCP",
	displays: DisplayConfig[]
	config: { refreshRate: RefreshRateType }
}

export type CommunicationConfigType = SerialPortControllerConfig | TcpControllerConfig