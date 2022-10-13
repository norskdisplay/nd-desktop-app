import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAtomValue } from "jotai";
import { communicationProtocolAtom, comPortAtom, databitAtom, ipAddressAtom, networkMaskAtom, parityAtom, tcpPortAtom, refreshRateAtom, startSendingOnAppStartAtom, stopBitAtom, baduRateAtom, displayTextAtom } from "../atoms";
import Alert from "@mui/material/Alert";
import { StartSendingOnAppStartSelect } from "../components/StartSendingOnAppStartSelect";
import { RefreshRateSelect } from "../components/RefreshRateSelect";
import { useState } from "react";
import { CommunicationProtocolSelect } from "../components/CommunicationProtocolSelect";
import { COMFormSection } from "../components/COMFormSection";
import { TCPFormSection } from "../components/TCPFormSection";
import { StartAppOnOSLoginSelect } from "../components/StartAppOnOSLoginSelect";
import { Config, configSchema } from "../sharedTypes/configSchema";
import { startAppOnOSLoginAtom } from "../atoms/startAppOnOSLoginAtom";
import { TCPConfig, tcpConfigSchema } from "../sharedTypes/tcpConfig";
import { COMConfig, comConfigSchema } from "../sharedTypes/comConfig";

export const Settings = () => {
	const [errors, setErrors] = useState<string[]>([]);
	const dataBits = useAtomValue(databitAtom)
	const parity = useAtomValue(parityAtom)
	const stopBits = useAtomValue(stopBitAtom)
	const protocol = useAtomValue(communicationProtocolAtom)
	const startOnOsLogin = useAtomValue(startAppOnOSLoginAtom)
	const startOnAppStart = useAtomValue(startSendingOnAppStartAtom)
	const refreshRate = useAtomValue(refreshRateAtom)
	const comPort = useAtomValue(comPortAtom)
	const ip = useAtomValue(ipAddressAtom)
	const networkMask = useAtomValue(networkMaskAtom)
	const tcpPort = useAtomValue(tcpPortAtom)
	const baduRate = useAtomValue(baduRateAtom)
	const displayText = useAtomValue(displayTextAtom)

	const save = async () => {
		setErrors([])
		const tcpConfig: TCPConfig = {
			ip: ip,
			networkMask: networkMask,
			port: tcpPort
		}
		const comConfig: COMConfig = {
			port: comPort,
			baudRate: baduRate,
			dataBits: dataBits,
			highWaterMark: 32,
			parity: parity,
			stopBits: stopBits,
		}
		const unusedConfigIsValid = protocol === "COM" ? tcpConfigSchema.safeParse(tcpConfig).success : comConfigSchema.safeParse(comConfig).success
		const config: Config = {
			out: {
				refreshRate: refreshRate,
				protocol: protocol,
				comConfig: protocol === "TCP" && !unusedConfigIsValid ? null : comConfig,
				tcpConfig: protocol === "COM" && !unusedConfigIsValid ? null : tcpConfig,
			},
			user: {
				startAppOnOSLogin: startOnOsLogin,
				startSendingOnAppStart: startOnAppStart
			},
			displays: [{
				description: displayText,
				name: "Display #1",
			}]
		};
		var parser = configSchema.safeParse(config);

		if (parser.success) {
			const err = await window.ipcRenderer.invoke("update-config", parser.data)
			if (Array.isArray(err)) {
				setErrors(err)
			}
			return;
		}
		if (!parser.success) {
			
			parser.error.issues.map((issue) => setErrors([...errors, issue.message]));
			window.scrollTo({
				top: 0
			})
		}
	}

	return (
		<>
			<Typography variant="h6" gutterBottom>
				Configuration
			</Typography>
			{!!errors.length &&
				<Alert variant="filled" severity="error" style={{ marginBottom: "2em" }}>
					Whoops, the following errors occured:
					<ul>
						{errors.map((err, ind) => <li key={err + "_" + ind}>{err}</li>)}
					</ul>
				</Alert>
			}
			<StartAppOnOSLoginSelect />
			<StartSendingOnAppStartSelect />
			<RefreshRateSelect />
			<CommunicationProtocolSelect />
			{protocol === "COM" ?
				<COMFormSection /> :
				<TCPFormSection />
			}
			<Button variant="contained" color="success" onClick={save}>Save</Button>
		</>
	);
}