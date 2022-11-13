import FormControl from "@mui/material/FormControl";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { maxTextLengthAtom } from "../atoms";

function valuetext(value: number) {
	return `${value}`;
}

export const MaxTextLengthSelect = () => {
	const [textLength, setTextLength] = useAtom(maxTextLengthAtom)

	const handleTextLengthChange = (e: Event, value: number | number[]) => setTextLength(Array.isArray(value) ? value[0] : value)

	return (
		<div style={{ maxWidth: "80%" }}>
			<FormControl sx={{ mb: 4, width: '100%' }} variant="standard">
				<Typography variant="caption">Max input length</Typography>
				<Slider
					aria-label="Temperature"
					value={textLength}
					onChange={handleTextLengthChange}
					getAriaValueText={valuetext}
					valueLabelDisplay="auto"
					step={1}
					min={1}
					max={100}
					aria-labelledby="input-slider"
				/>
			</FormControl>
		</div>
	);
}