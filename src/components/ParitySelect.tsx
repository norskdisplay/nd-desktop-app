import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAtom } from "jotai";
import { parityAtom } from "../atoms/parityAtom";
import InputLabel from "@mui/material/InputLabel";
import { parityEnum, ParityType } from "../sharedTypes/comConfig";

export const ParitySelect = () => {
	const [parity, setParity] = useAtom(parityAtom)

	const handleChangeParity = (e: SelectChangeEvent<ParityType>) => {
		setParity(e.target.value as ParityType)
	}

	return (
		<FormControl sx={{ mb: 4, width: '100%' }} variant="standard">
			<InputLabel id="parity-label">Parity</InputLabel>
			<Select
				labelId="parity-label"
				id="demo-simple-select"
				value={parity}
				label="Parity"
				onChange={handleChangeParity}
			>
				{Object.values(parityEnum.Values).map((val) => <MenuItem key={val} value={val}>{val}</MenuItem>)}
			</Select>
		</FormControl>
	);
}