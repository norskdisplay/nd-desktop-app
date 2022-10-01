import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { useState } from "react";
import { comPortAtom } from "../atoms";

export const ComPortSelect = () => {
	const [comPort, setComPort] = useAtom(comPortAtom)
	const [error, setError] = useState("")

	const handleComPortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10)
		if (isNaN(value)) {
			setError("Value is not a number")
			return;
		}
		if (value < 0) {
			setError("Value cannot be less than zero")
			return;
		}
		if (value > 100) {
			setError("Max number is 100")
			return;
		}
		setError("")
		setComPort(value)
	}

	return (
		<FormControl sx={{ mb: 4, width: '100%' }} error={!!error} variant="standard">
			<TextField
				label="Select port"
				variant="standard"
				value={comPort}
				onChange={handleComPortChange}
				id="outlined-start-adornment"
				type="number"
				InputProps={{
					startAdornment: <InputAdornment position="start">COM</InputAdornment>
				}}
			/>
			{error && <FormHelperText id="component-error-text">{error}</FormHelperText>}
		</FormControl>
	);
}