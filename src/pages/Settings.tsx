import Typography from "@mui/material/Typography";
import { useAtom } from 'jotai'
import Slider from '@mui/material/Slider';
import { textInputLengthAtom } from "../atoms/textInputLengthAtom";

function valuetext(value: number) {
	return `${value}`;
}

export const Settings = () => {
	const [textLength, setTextLength] = useAtom(textInputLengthAtom)
	const handleTextLengthChange = (e: Event, value: number | number[]) => setTextLength(Array.isArray(value) ? value[0] : value)
	return (
		<>
			<Typography variant="h3" gutterBottom>
				Configuration
			</Typography>
			<Typography id="input-slider" gutterBottom>
				Max input length
			</Typography>
			<Slider
				aria-label="Temperature"
				value={textLength}
				onChange={handleTextLengthChange}
				getAriaValueText={valuetext}
				valueLabelDisplay="auto"
				step={1}
				marks
				min={1}
				max={100}
				aria-labelledby="input-slider"
			/>
		</>
	);
}