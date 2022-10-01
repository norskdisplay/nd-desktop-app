import Alert from "@mui/material/Alert"
import { useAtomValue } from "jotai"
import { displayTextAtom } from "../atoms"
import { replaceText } from "../utils/replaceText"

const handleReplaceText = replaceText()

export const PreviewDisplayText = () => {
	const text = useAtomValue(displayTextAtom)
	if (text === "") return null
	return (
		<>
			Preview:
			<Alert icon={false} severity="success" className="mb-1">
				{handleReplaceText(text)}
			</Alert>
		</>
	)
}