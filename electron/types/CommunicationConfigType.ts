import { TCPConfig } from './../../src/sharedTypes/tcpConfig';
import { COMConfig } from '../../src/sharedTypes/comConfig'
import { RefreshRateType } from '../../src/sharedTypes/configSchema';

export type SerialPortControllerConfig =  {
	protocol: "COM",
	text: string,
	config: null | COMConfig & { refreshRate: RefreshRateType }
}

export type TcpControllerConfig = {
	protocol: "TCP",
	text: string,
	config: null | TCPConfig & { refreshRate: RefreshRateType }
}

export type CommunicationConfigType = SerialPortControllerConfig | TcpControllerConfig