import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import { useAtom } from "jotai"
import { communicationProtocolAtom } from "../atoms"
import { communicationProtocolEnum, CommunicationProtocolType } from "../sharedTypes/configSchema"

const never = (val: never) => {
	throw new Error("Value " + val + "Is not handled by label function")
}

const getProtocolLabel = (val: CommunicationProtocolType) => {
	switch(val) {
		case "COM": 
			return "COM-port"
		case "TCP":
			return "Ethernet (TCP)"
		default:
			return never(val)
	}
}

export const CommunicationProtocolSelect = () => {
	const [protocol, setProtocol] = useAtom(communicationProtocolAtom)
	return (
		<FormControl sx={{ mb: 4, width: '100%' }} variant="standard">
			<FormLabel id="demo-radio-buttons-group-label">Protocol</FormLabel>
			<RadioGroup
				aria-labelledby="demo-radio-buttons-group-label"
				defaultValue="female"
				name="radio-buttons-group"
				value={protocol}
				onChange={(e) => setProtocol(e.target.value as CommunicationProtocolType)}
			>
				{Object.values(communicationProtocolEnum.Values).map((value) => <FormControlLabel key={value} value={value} control={<Radio />} label={getProtocolLabel(value)} />)}
			</RadioGroup>
		</FormControl>
	)
}