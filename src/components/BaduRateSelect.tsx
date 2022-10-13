import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { useState } from "react";
import { baduRateAtom } from "../atoms";

export const BaduRateSelect = () => {
	const [baduRate, setBaduRate] = useAtom(baduRateAtom)
	const [value, setValue] = useState(baduRate);
	const [error, setError] = useState("")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10)
		let isValid = true
		if (isNaN(value)) {
			setError("Badu rate must me a number")
			isValid = false
		}
		if (value < 1) {
			setError("Badu rate minimum is 1")
			isValid = false
		}
		if (value > 999999) {
			setError("Badurate maximum is 999 999")
			isValid = false
		}
		setValue(value);
		if (isValid) {
			setError("")
			setBaduRate(value)
		}
	}

	return (
		<FormControl sx={{ mb: 4, width: '100%' }} error={!!error} variant="standard">
			<TextField
				id="badu-rate"
				label="Badu rate"
				variant="standard"
				value={value}
				onChange={handleChange}
				type="number"
			/>
			{error && <FormHelperText id="component-error-text">{error}</FormHelperText>}
		</FormControl>
	);
}