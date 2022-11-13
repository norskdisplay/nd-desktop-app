import { Config } from "../src/sharedTypes/configSchema";

export const defaultConfig: Config = {
	out: {
		refreshRate: 500,
		protocol: "COM",
		comConfig: {
			port: 0,
			baudRate: 9600,
			dataBits: "8",
			highWaterMark: 32,
			parity: "none",
			stopBits: "1",
		},
		tcpConfig: null
	},
	user: {
		startAppOnOSLogin: false,
		startSendingOnAppStart: false
	},
	displays: []
}