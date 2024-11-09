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
		try {
			if (e.target.value !== "0" && !e.target.value) throw new Error();
			const value = parseInt(e.target.value, 10)
			let isValid = true
			const minValue = 100
			const maxValue = 10000
			if (isNaN(value)) {
				setError("Refresh rate must me a number")
				isValid = false
			}

			if (value < minValue) {
				setError("Refresh rate minimum is 100")
				isValid = false
			}
			if (value > maxValue) {
				setError("Refresh rate maximum is 10 000")
				isValid = false
			}
			setValue(value);
			if (isValid) {
				setError("")
				setRefreshRate(value)
			}
		} catch {
			setValue(0)
			setError("Refresh rate must be a number")
		}
	}

	return (
		<FormControl sx={{ mb: 4, width: '100%' }} error={!!error} variant="standard">
			<TextField
				id="refresh-rate"
				label="Refresh rate (milliseconds)"
				variant="standard"
				value={value}
				error={!!error}
				onChange={handleRefreshRateChange}
				type="number"
			/>
			{error && <FormHelperText id="component-error-text">{error}</FormHelperText>}
		</FormControl>
	);
}