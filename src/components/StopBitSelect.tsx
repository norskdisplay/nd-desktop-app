import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAtom } from "jotai";
import InputLabel from "@mui/material/InputLabel";
import { stopBitAtom } from "../atoms";
import { stopBitEnum, StopBitType } from "../sharedTypes/comConfig";

export const StopBitSelect = () => {
	const [stopBit, setStopBit] = useAtom(stopBitAtom)

	const handleChange = (e: SelectChangeEvent<StopBitType>) => {
		setStopBit(e.target.value as StopBitType)
	}

	return (
		<FormControl sx={{ mb: 4, width: '100%' }} variant="standard">
			<InputLabel id="stopbit-label">Stop Bit</InputLabel>
			<Select<StopBitType>
				labelId="stopbit-label"
				id="stopbitselect"
				value={stopBit}
				label="Stop Bit"
				onChange={handleChange}
			>
				{Object.values(stopBitEnum.Values).map((val) => <MenuItem key={val} value={val}>{val}</MenuItem>)}
			</Select>
		</FormControl>
	);
}