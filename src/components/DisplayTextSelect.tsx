import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import InfoIcon from '@mui/icons-material/InfoRounded';

export const DisplayTextSelect: React.FC<{ onChange: (val: string) => void }> = ({ onChange }) => {
	const [text, setText] = useState("")
	const [error, setError] = useState("")
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value)
		onChange(e.target.value)
	}

	const showModalNativeWindow = () => {
		window.ipcRenderer.invoke("open-help-window")
	}
	return (
		<>
			<FormControl sx={{ mb: 2, width: '100%' }} error={!!error} variant="standard">
				<TextField
					label="Display text"
					variant="standard"
					value={text}
					onChange={handleChange}
					id="outlined-start-adornment"
					type="text"
					style={{ fontSize: "2em"}}
					InputProps={{
						endAdornment:
							<InputAdornment position="end">
								<IconButton
									aria-label="Show info"
									onClick={showModalNativeWindow}
									edge="end"
								>
									<InfoIcon />
								</IconButton>
							</InputAdornment>
					}}
				/>
				{error && <FormHelperText id="component-error-text">{error}</FormHelperText>}
			</FormControl>
		</>
	)
}