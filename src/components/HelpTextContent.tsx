import Typography from "@mui/material/Typography";

export const HelpTextContent = () => (
	<>
		<Typography id="transition-modal-title" variant="h6" component="h2">
			Variables in display text
		</Typography>
		<div className="mb-1">
			<pre className="inline-block">$$</pre> will print a <pre className="inline-block">$</pre>
		</div>
		<div className="mb-1">
			<pre className="inline-block">$full</pre> will print the full date and time in format YYYY/mm/dd hh:mm
		</div>
		<div className="mb-1">
			<pre className="inline-block">$h</pre> will print the hour
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
	</>
)