import { Config } from "../src/sharedTypes/configSchema";

export const defaultConfig: Config = {
	out: {
		refreshRate: 1000,
		protocol: "TCP",
		comConfig: {
			port: 0,
			baudRate: 9600,
			dataBits: "8",
			highWaterMark: 32,
			parity: "none",
			stopBits: "1",
		},
	},
	user: {
		startAppOnOSLogin: false,
		startSendingOnAppStart: true
	},
	displays: []
}