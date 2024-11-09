import Button from "@mui/material/Button";
import { useAtom, useAtomValue } from "jotai";
import { displayConfigListAtom, isSendingAtom } from "../atoms";
import { DisplayList } from "../components/DisplayList";
import { KeyboardEvent, useEffect, useState } from "react";
import { useSaveConfig } from "../hooks/saveConfig";
import InfoIcon from '@mui/icons-material/Info';

export const Home = () => {
	const displayConfigList = useAtomValue(displayConfigListAtom)
	const { save } = useSaveConfig()
	const [isSending, setIsSending] = useAtom(isSendingAtom)
	const [hasResolvedSendingState, setHasResolvedSendingState] = useState(false)
	const [isSaving, setIsSaving] = useState(false)

	useEffect(() => {
		const checkSendingState = async () => {
			try {
				setIsSending(await window.ipcRenderer.invoke("is-sending"));
			} catch (e) {
				console.error(e)
			} finally {
				setHasResolvedSendingState(true)
			}
		}
		checkSendingState()
	}, [setIsSending, setHasResolvedSendingState])

	const submit = async () => {
		try {
			setIsSaving(true)
			await save(displayConfigList)
		} catch (e) {
			console.error(e)
		} finally {
			setIsSaving(false)
		}
	}

	const stop = async () => {
		try {
			await window.ipcRenderer.invoke("stop-sending");
			setIsSending(false)
		} catch (e) {
			console.error(e)
		}
	}

	const start = async () => {
		try {
			await window.ipcRenderer.invoke("start-sending");
			setIsSending(true)
		} catch (e) {
			console.error(e)
		}
	}

	const showInfoWindow = () => {
		window.ipcRenderer.invoke("open-help-window");
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLParagraphElement>) => {
		if (event.code === "Enter" || event.code === "Space") {
			showInfoWindow()
		}
	}

	return (
		<div className="homepage" style={{ paddingBottom: "20px" }}>
			<p onClick={showInfoWindow} tabIndex={0} onKeyDown={handleKeyDown} style={{ display: "flex" }}>See all available merge fields<InfoIcon style={{ marginLeft: "4px" }}/></p>
			<div className="mb-2">
				<DisplayList />
			</div>
			{isSending ? ( 
				<>
					<Button onClick={stop} disabled={!hasResolvedSendingState}>Stop sending</Button>
				</>
			) : (
				<Button onClick={start} disabled={!hasResolvedSendingState}>Start sending</Button>
			)}
			<div style={{ display: "flex", justifyContent: "end", position: "sticky", bottom: 0, width: "100%", padding: "1em 0", pointerEvents: "none"  }}>
				<Button variant="contained" color="success" style={{ pointerEvents: "all" }} disabled={isSaving} onClick={submit}>{isSaving ? "Saving..." : "Save"}</Button>
			</div>
		</div>
	)
}