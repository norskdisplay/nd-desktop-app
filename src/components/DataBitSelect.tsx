import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAtom } from "jotai";
import { dataBitsEnum, DataBitType } from "../sharedTypes/configSchema";
import InputLabel from "@mui/material/InputLabel";
import { databitAtom } from "../atoms";

export const DataBitSelect = () => {
	const [dataBit, setDataBit] = useAtom(databitAtom)

	const handleChange = (e: SelectChangeEvent<DataBitType>) => {
		setDataBit(e.target.value as DataBitType)
	}

	return (
		<FormControl sx={{ mb: 4, width: '100%' }} variant="standard">
			<InputLabel id="stopbit-label">Data Bit</InputLabel>
			<Select<DataBitType>
				labelId="stopbit-label"
				id="stopbitselect"
				value={dataBit}
				label="Data Bit"
				onChange={handleChange}
			>
				{Object.values(dataBitsEnum.Values).map((val) => <MenuItem key={val} value={val}>{val}</MenuItem>)}
			</Select>
		</FormControl>
	);
}