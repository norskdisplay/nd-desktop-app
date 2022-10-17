import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { DebugConfigPathsResponse } from "../sharedTypes/debugConfig";

export const Debug = () => {
	const [paths, setPaths] = useState<DebugConfigPathsResponse>([])
	useEffect(() => {
		window.ipcRenderer.invoke("get-debug-paths").then((data: DebugConfigPathsResponse) => {
			setPaths(data)
		}).catch(() => {

		})
	}, [])
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Debug
			</Typography>
			<p>You might find these useful if you're debugging the application:</p>
			<ul>
				{paths.map((path) => (
					<li key={path.path} className="mb-1">
						<label className="d-block" htmlFor={path.name}>{path.name}</label>
						<input style={{ padding: "1em 0.5em" }} id={path.name}  readOnly={true} value={path.path} className="w-full" />
					</li>
				))}
			</ul>
		</>
	)
}