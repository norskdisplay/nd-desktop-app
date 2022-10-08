import FormControl from "@mui/material/FormControl";
import { useAtom } from "jotai";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { startAppOnOSLoginAtom } from "../atoms/startAppOnOSLoginAtom";

export const StartAppOnOSLoginSelect = () => {
	const [autostart, setAutostart] = useAtom(startAppOnOSLoginAtom)

	const handleChange = () => {
		setAutostart(!autostart)
	}

	return (
		<FormControl sx={{ mb: 4, width: '100%' }} variant="standard">
			<FormControlLabel
				control={
					<Switch
						checked={autostart}
						onChange={handleChange}
						name="startbroadcast"
					/>
				}
				label="Start app when starting this machine"
			/>
		</FormControl>
	);
}