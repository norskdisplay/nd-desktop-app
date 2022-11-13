import Alert from "@mui/material/Alert"
import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"
import { displayTextAtom, refreshRateAtom } from "../atoms"
import { replaceText } from "../utils/replaceText"

const handleReplaceText = replaceText()

export const PreviewDisplayText = () => {
	const text = useAtomValue(displayTextAtom)
	const refreshRate = useAtomValue(refreshRateAtom)
	const [textCurrent, setTextCurrent] = useState(handleReplaceText(text))
	
	useEffect(() => {
		setTextCurrent(handleReplaceText(text))
		let counter = setInterval(() => {
			setTextCurrent(handleReplaceText(text))
		}, refreshRate)
		return () => {
			clearInterval(counter)
		}
	}, [refreshRate, text])
	
	if (text === "") return null
	return (
		<>
			<Alert icon={false} variant="outlined" severity="info" className="mb-1">
				<div style={{ fontSize: "1em", fontWeight: "bold", marginBottom: "0.5em" }}>Text on sign:</div>
				{textCurrent}
			</Alert>
		</>
	)
}