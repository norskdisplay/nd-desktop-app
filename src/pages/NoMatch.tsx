import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export const NoMatch = () => (
	<>
		<Typography variant="h6" gutterBottom>
			404 Not found
		</Typography>
		<Link to="/">Back to home page</Link>
	</>
);