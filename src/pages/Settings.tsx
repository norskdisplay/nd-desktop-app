import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAtomValue } from "jotai";
import { ComPortSelect } from "../components/ComPortSelect";
import { DataBitSelect } from "../components/DataBitSelect";
import { MaxTextLengthSelect } from "../components/MaxTextLengthSelect";
import { ParitySelect } from "../components/ParitySelect";
import { RefreshRateSelect } from "../components/RefreshRateSelect";
import { StopBitSelect } from "../components/StopBitSelect";
import { globalConfigSchema, GlobalConfigType } from "../sharedTypes/configSchema";
import { databitAtom, parityAtom, stopBitAtom } from "../atoms";
import { useState } from "react";
import Alert from "@mui/material/Alert";

export const Settings = () => {
	const [errors, setErrors] = useState<string[]>([]);
	const dataBits = useAtomValue(databitAtom)
	const parity = useAtomValue(parityAtom)
	const stopBits = useAtomValue(stopBitAtom)
	
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
			<Typography variant="h3" gutterBottom>
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
			<MaxTextLengthSelect />
			<RefreshRateSelect />
			<ComPortSelect />
			<ParitySelect />
			<StopBitSelect />
			<DataBitSelect />
			<Button variant="contained" color="success" onClick={save}>Save</Button>
		</>
	);
}