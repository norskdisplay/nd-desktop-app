import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAtomValue } from "jotai";
import { globalConfigSchema, GlobalConfigType } from "../sharedTypes/configSchema";
import { communicationProtocolAtom, databitAtom, parityAtom, stopBitAtom } from "../atoms";
import Alert from "@mui/material/Alert";
import { StartSendingOnAppStartSelect } from "../components/StartSendingOnAppStartSelect";
import { MaxTextLengthSelect } from "../components/MaxTextLengthSelect";
import { RefreshRateSelect } from "../components/RefreshRateSelect";
import { useState } from "react";
import { CommunicationProtocolSelect } from "../components/CommunicationProtocolSelect";
import { COMFormSection } from "../components/COMFormSection";
import { TCPFormSection } from "../components/TCPFormSection";
import { StartAppOnOSLoginSelect } from "../components/StartAppOnOSLoginSelect";

export const Settings = () => {
	const [errors, setErrors] = useState<string[]>([]);
	const dataBits = useAtomValue(databitAtom)
	const parity = useAtomValue(parityAtom)
	const stopBits = useAtomValue(stopBitAtom)
	const protocol = useAtomValue(communicationProtocolAtom)

	const save = async () => {
		removeAllErrors()
		const config: GlobalConfigType = {
			baudRate: 9600,
			dataBits: dataBits,
			highWaterMark: 32,
			parity: parity,
			stopBits: stopBits,
			maxNumberOfDisplays: 100
		};
		var parser = globalConfigSchema.safeParse(config);

		if (parser.success) {
			// await window.ipcRenderer.invoke("update-config", parser.data)
			return;
		}
		if (!parser.success) {
			parser.error.issues.map((issue) => setErrors([...errors, issue.message]));
		}
	}

	const removeAllErrors = () => setErrors([])

	return (
		<>
			<Typography variant="h6" gutterBottom>
				Configuration
			</Typography>
			{!!errors.length &&
				<Alert variant="filled" severity="error" style={{ marginBottom: "2em" }}>
					Whoops, the following errors occured:
					<ul>
						{errors.map((err) => <li key={err}>{err}</li>)}
					</ul>
				</Alert>
			}
			<StartAppOnOSLoginSelect />
			<StartSendingOnAppStartSelect />
			<MaxTextLengthSelect />
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