import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DisplayTextSelect } from "../components/DisplayTextSelect";
import { PreviewDisplayText } from "../components/PreviewDisplayText";

export const Home = () => {
	const save = () => {
		// TODO
	}
	return (
		<>
			<Typography variant="h3" gutterBottom>
				Home
			</Typography>
			<DisplayTextSelect />
			<PreviewDisplayText />
			<Button variant="contained" color="success" onClick={save}>Save</Button>
		</>
	)
}