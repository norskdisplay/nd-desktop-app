import Button from "@mui/material/Button";
import { DisplayTextSelect } from "../components/DisplayTextSelect";
import { PreviewDisplayText } from "../components/PreviewDisplayText";

export const Home = () => {
	const save = () => {
		// TODO
	}
	return (
		<>
			<DisplayTextSelect />
			<PreviewDisplayText />
			<Button variant="contained" color="success" onClick={save}>Save</Button>
		</>
	)
}