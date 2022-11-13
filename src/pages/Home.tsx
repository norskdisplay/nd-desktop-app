import Button from "@mui/material/Button";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { communicationProtocolAtom, comPortAtom, databitAtom, isSendingAtom, ipAddressAtom, networkMaskAtom, parityAtom, tcpPortAtom, refreshRateAtom, startSendingOnAppStartAtom, stopBitAtom, startAppOnOSLoginAtom, displayTextAtom, baduRateAtom } from "../atoms";
import { DisplayTextSelect } from "../components/DisplayTextSelect";
import { PreviewDisplayText } from "../components/PreviewDisplayText";
import { COMConfig, comConfigSchema } from "../sharedTypes/comConfig";
import { Config, configSchema } from "../sharedTypes/configSchema";
import { TCPConfig, tcpConfigSchema } from "../sharedTypes/tcpConfig";
import { delay } from "../utils/delay";

export const Home = () => {
	const [text, setText] = useState("")
	const [isSaving, setIsSaving] = useState(false)
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
	const [displayText, setDisplayText] = useAtom(displayTextAtom)
	const baduRate = useAtomValue(baduRateAtom)
	const [isSending, setIsSending] = useAtom(isSendingAtom)

	const submit = async () => {
		if (text === "") return
		try {
			setIsSaving(true)
			await Promise.all([save(), delay(1000)])
			setIsSending(true)
			setDisplayText(text)
		} catch (e) {
			if (e instanceof Error) {
				setErrors([e.message])
			}
		} finally {
			setIsSaving(false)
		}
	}

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
				description: text,
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

	const stop = async () => {
		try {
			await window.ipcRenderer.invoke("stop-sending");
			setIsSending(false)
		} catch (e) {

		}
	}
	return (
		<div className="homepage">
			<div className="mb-2">
				<DisplayTextSelect onChange={(t) => setText(t)} />
				<Button variant="contained" color="success" disabled={isSaving} onClick={submit}>{isSaving ? "Saving..." : "Save"}</Button>
			</div>
			{isSending && 
				<>
					<PreviewDisplayText />
					<Button onClick={stop}>Stop sending</Button>
				</>
			}
		</div>
	)
}