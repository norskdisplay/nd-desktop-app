import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Backdrop from '@mui/material/Backdrop';
import TextField from "@mui/material/TextField"
import { useAtom } from "jotai"
import { useState } from "react"
import { displayTextAtom } from "../atoms"
import InfoIcon from '@mui/icons-material/InfoRounded';
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export const DisplayTextSelect = () => {
	const [text, setText] = useAtom(displayTextAtom)
	const [error, setError] = useState("")
	const [showModal, setShowModal] = useState(false)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)
	const handleShowModalClick = () => setShowModal(true)
	const handleModalClose = () => setShowModal(false)
	return (
		<>
			<FormControl sx={{ mb: 4, width: '100%' }} error={!!error} variant="standard">
				<TextField
					label="Display text"
					variant="standard"
					value={text}
					onChange={handleChange}
					id="outlined-start-adornment"
					type="text"
					InputProps={{
						endAdornment:
							<InputAdornment position="end">
								<IconButton
									aria-label="Show info"
									onClick={handleShowModalClick}
									edge="end"
								>
									<InfoIcon />
								</IconButton>
							</InputAdornment>
					}}
				/>
				{error && <FormHelperText id="component-error-text">{error}</FormHelperText>}
			</FormControl>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={showModal}
				onClose={handleModalClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={showModal}>
					<Box sx={style}>
						<div className="overflow-auto h-full">
							<Typography id="transition-modal-title" variant="h6" component="h2">
								Variables in display text
							</Typography>
							<div className="mb-1">
								<pre className="inline-block">$$</pre> will print a <pre className="inline-block">$</pre>
							</div>
							<div className="mb-1">
								<pre className="inline-block">$h</pre> will print the full date and time in format YYYY/mm/dd hh:mm
							</div>
							<div className="mb-1">
								<pre className="inline-block">$s</pre> will print the second
							</div>
							<div className="mb-1">
								<pre className="inline-block">$m</pre> will print minute
							</div>
							<div className="mb-1">
								<pre className="inline-block">$Y</pre> will print the current year (4 digits)
							</div>
							<div className="mb-1">
								<pre className="inline-block">$M</pre> will print the name of the current month
							</div>
							<div className="mb-1">
								<pre className="inline-block">$D</pre> will print the name of the current day
							</div>
						</div>
					</Box>
				</Fade>
			</Modal>
		</>
	)
}