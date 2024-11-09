import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAtomValue } from "jotai";
import { communicationProtocolAtom, displayConfigListAtom } from "../atoms";
import Alert from "@mui/material/Alert";
import { StartSendingOnAppStartSelect } from "../components/StartSendingOnAppStartSelect";
import { RefreshRateSelect } from "../components/RefreshRateSelect";
import { useEffect, useState } from "react";
import { CommunicationProtocolSelect } from "../components/CommunicationProtocolSelect";
import { COMFormSection } from "../components/COMFormSection";
import { StartAppOnOSLoginSelect } from "../components/StartAppOnOSLoginSelect";
import { DisplayConfig } from "../sharedTypes/configSchema";
import { NumberOfDisplays } from "../components/NumberOfDisplays";
import { FormProvider, useForm } from "react-hook-form";
import { DisplayListForm } from "../components/DisplayListForm";
import { useUpdatedConfig } from "../utils/useUpdatedConfig";
import { CircularProgress } from "@mui/material";
import { useSaveConfig } from "../hooks/saveConfig";

export type FormValues = {
	displays: DisplayConfig[]
}

export const Settings = () => {
	const { save, errors } = useSaveConfig()
	const [machineIp, setMachineIp] = useState("")
	const { isLoading, reload } = useUpdatedConfig()
	const displayList = useAtomValue(displayConfigListAtom)
	
	const protocol = useAtomValue(communicationProtocolAtom)

	const {
		handleSubmit,
		...restForm
	  } = useForm<FormValues>({
		defaultValues: {
			displays: displayList
		}
	  })

	useEffect(() => {
		window.ipcRenderer.invoke("get-current-ipv4").then((address) => {
			setMachineIp(address)
		})
	}, [])

	const handleSave = async (values: DisplayConfig[]) => {
		await save(values)
		if (errors.length) return;
		reload()
	}

	if (isLoading) return <CircularProgress />
	return (
		<FormProvider {...restForm} handleSubmit={handleSubmit}>
			<form style={{ paddingBottom: "20px", }} onSubmit={handleSubmit((values) => handleSave(values.displays))}>
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
				<NumberOfDisplays />
				<CommunicationProtocolSelect />
				
				{protocol === "COM" &&
					<COMFormSection /> 
				}
				{protocol !== "COM" &&
					<>
						<Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
							This machine has IP address: {machineIp}
						</Typography>
						<DisplayListForm />
					</>
				}
				<div style={{ display: "flex", justifyContent: "end", position: "sticky", bottom: 0, width: "100%", padding: "1em 0"  }}>
					<Button variant="contained" color="success" type="submit">Save</Button>
				</div>
			</form>
		</FormProvider>
	);
}