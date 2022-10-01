import Alert from "@mui/material/Alert"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Fade from "@mui/material/Fade"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { ErrorType, ValidationError } from "../sharedTypes/LoadConfigResponse"

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

export const ConfigErrorModal = () => {
	if (!window.configStatus) return null;

	const getErrorBody = () => (
		<>
			<p>An error occured when loading your local config. Exception message was:</p><p>${(window.configStatus as ErrorType).message as string}</p>
		</>
	)

	const getValidationErrorBody = () => {
		const issueString = (window.configStatus as ValidationError).data.map((issue) => {
			console.log(issue)
			return <li><pre className="bg-slate-200 inline-block rounded px-0.5">{issue.path.join(".")}</pre> {issue.message}</li>
		})
		return (
			<>
				<Alert severity="error">Due to errors in the uploaded config file, the application is in error mode. Fix the errors below and restart the application:</Alert>
				<ul>{issueString}</ul>
			</>
		)
	}

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={true}
			onClose={() => null}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={true}>
				<Box sx={style}>
					<div className="overflow-auto h-full">
						<Typography id="transition-modal-title" variant="h6" component="h2">
							{window.configStatus!.type === "error" ?
								"Whoops, error in config file" :
								"Validation errors in uploaded file"}
						</Typography>
						{window.configStatus!.type === "error" ? getErrorBody() : getValidationErrorBody()}
					</div>
				</Box>
			</Fade>
		</Modal>
	)
}