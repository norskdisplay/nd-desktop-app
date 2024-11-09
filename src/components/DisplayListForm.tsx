import { FormControl, Typography } from "@mui/material"
import FormHelperText from "@mui/material/FormHelperText"
import TextField from "@mui/material/TextField"
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormValues } from "../pages/Settings";
import { useAtomValue } from "jotai";
import { numberOfDisplaysAtom } from "../atoms/numberOfDisplaysAtom";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid"

export const DisplayListForm = () => {
	const { register, control, formState: { errors } } = useFormContext<FormValues>()
	const numberOfDisplays = useAtomValue(numberOfDisplaysAtom)
	const { fields, append, remove } = useFieldArray<FormValues>({
		control,
		name: "displays",
	});

	const addDisplay = () => {
		append({ ip: "", name: "", networkMask: "", port: 0, addressGroup: 0, addressUnit: 0, id: uuidv4() })
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const syncArrayLength = () => {
		if (numberOfDisplays > fields.length) {
			new Array(numberOfDisplays - fields.length).fill(0).forEach(() => {
				addDisplay()
			})
		}
		if (numberOfDisplays < fields.length) {
			new Array(fields.length - numberOfDisplays).fill(0).forEach(() => {
				remove(fields.length - 1)
			})
		}
	}

	// A hack to sync the number of displays selected with the number field arrays
	useEffect(() => {
		syncArrayLength()
	}, [numberOfDisplays, syncArrayLength])
	return (
		<>
			{fields.map((item, index) => {
				var fieldErrors = errors?.displays ? errors.displays[index] : null
				return (
				<li key={item.id} style={{ listStyle: "none", border: "1px solid rgba(255,255,255,0.2)", margin: "1em 0", padding: "1em", }}>
					<Typography variant="h6" sx={{ mb: 2 }}>{item.name ? item.name : `Display #${index + 1}`}</Typography>
					<FormControl sx={{ mb: 4, mr: 2, width: '100%', flexGrow: 1, }} variant="standard">
						<TextField id="standard-basic" label="Name of display" {...register(`displays.${index}.name`, {
							required: "Name is required",
						})} variant="standard" />
					</FormControl>

					<div style={{ display: "flex" }}>
						<FormControl sx={{ mb: 4, mr: 2, width: '100%', flexGrow: 1, }} variant="standard">
							<TextField id="standard-basic" label="Receiver IP Address" {...register(`displays.${index}.ip`, {
								required: "IP is required",
							})} variant="standard" />
							<FormHelperText>Send to this IP</FormHelperText>
						</FormControl>
						<FormControl sx={{ mb: 4, }} variant="standard">
							<TextField id="standard-basic" label="Port" type="number" {...register(`displays.${index}.port`, {
								required: "Port is required",
								valueAsNumber: true,
							})} variant="standard" />
						</FormControl>
					</div>

					<div style={{ display: "flex" }}>
						<FormControl sx={{ mb: 4, mr: 2, width: '100%', flexGrow: 1, }} variant="standard">
							<TextField id="standard-basic" label="Address group" type="number" {...register(`displays.${index}.addressGroup`, {
								required: true,
								min: 0,
								valueAsNumber: true,
							})} variant="standard" />
						</FormControl>
						<FormControl sx={{ mb: 4, }} variant="standard">
							<TextField id="standard-basic" label="Address unit" type="number" min="0" {...register(`displays.${index}.addressUnit`, {
								required: true,
								min: 0,
								valueAsNumber: true,
							})} variant="standard" />
							{fieldErrors?.addressUnit && <>error!</>}
						</FormControl>
					</div>

					<FormControl sx={{ mb: 4, width: '100%' }} variant="standard">
						<TextField id="standard-basic" label="Network mask" variant="standard" {...register(`displays.${index}.networkMask`, {
								required: "Network mask is required",
							})} />
					</FormControl>
				</li>
			)})}
		</>
	)
}