import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { useState } from "react";
import { refreshRateAtom } from "../atoms";

export const RefreshRateSelect = () => {
	const [refreshRate, setRefreshRate] = useAtom(refreshRateAtom)
	const [value, setValue] = useState(refreshRate);
	const [error, setError] = useState("")

	const handleRefreshRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10)
		let isValid = true
		if (isNaN(value)) {
			setError("Refresh rate must me a number")
			isValid = false
		}
		if (value < 10) {
			setError("Refresh rate minimum is 10")
			isValid = false
		}
		if (value > 100000) {
			setError("Refresh rate maximum is 100 000")
			isValid = false
		}
		setValue(value);
		if (isValid) {
			setError("")
			setRefreshRate(value)
		}
	}

	return (
		<FormControl sx={{ mb: 4, width: '100%' }} error={!!error} variant="standard">
			<TextField
				id="refresh-rate"
				label="Refresh rate"
				variant="standard"
				value={value}
				onChange={handleRefreshRateChange}
				type="number"
			/>
			{error && <FormHelperText id="component-error-text">{error}</FormHelperText>}
		</FormControl>
	);
}