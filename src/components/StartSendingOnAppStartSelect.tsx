import FormControl from "@mui/material/FormControl";
import { useAtom } from "jotai";
import { startSendingOnAppStartAtom } from "../atoms";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export const StartSendingOnAppStartSelect = () => {
	const [broadcast, setBroadcast] = useAtom(startSendingOnAppStartAtom)

	const handleChange = () => {
		setBroadcast(!broadcast)
	}

	return (
		<FormControl sx={{ mb: 4, width: '100%' }} variant="standard">
			<FormControlLabel
				control={
					<Switch
						checked={broadcast}
						onChange={handleChange}
						name="startbroadcast"
					/>
				}
				label="Start sending on application start"
			/>
		</FormControl>
	);
}