import { FormControl, FormHelperText, Slider, Typography } from "@mui/material"
import { useAtom } from "jotai";
import { useState } from "react";
import { numberOfDisplaysAtom } from "../atoms/numberOfDisplaysAtom";

export const NumberOfDisplays = () => {
    const [numberOfDisplays, setNumberOfDisplays] = useAtom(numberOfDisplaysAtom)
    const [num, setNum] = useState(numberOfDisplays);
    const [error, setError] = useState("")
    const validate = (event: Event, value: number | number[], activeThumb: number) => {
        try {
            setError("")
            let isValid = true
            if (Array.isArray(value)) throw new Error();
            if (value > 16) {
                setError("Max is 16 displays")
                isValid = false
            }
            if (value < 1) {
                setError("Minimum 1 display")
                isValid = false
            }
            setNum(value)
            if (isValid) {
                setError("")
                setNumberOfDisplays(value)
            }
        } catch {
            setNum(numberOfDisplays)
            setError("Value must be a number")
        }
    }
    return (
        <FormControl sx={{ mb: 4, width: '100%' }} error={!!error} variant="standard">
            <Typography id="input-slider" gutterBottom>
                Number of displays  
            </Typography>
			<Slider
                value={num}
                step={1}
                min={1}
                max={16}
                marks
                valueLabelDisplay="auto"
                aria-label="Number of displays"
                onChange={validate}
            />
			{error && <FormHelperText id="component-error-text">{error}</FormHelperText>}
		</FormControl>
    )
}