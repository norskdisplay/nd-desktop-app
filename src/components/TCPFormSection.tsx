import { FormControl, Typography } from "@mui/material"
import FormHelperText from "@mui/material/FormHelperText"
import TextField from "@mui/material/TextField"
import { useAtom } from "jotai"
import React, { useEffect, useState } from "react"
import { ipAddressAtom, networkMaskAtom, portAtom } from "../atoms"

export const TCPFormSection = () => {
	const [ip, setIp] = useAtom(ipAddressAtom)
	const [port, setPort] = useAtom(portAtom)
	const [mask, setMask] = useAtom(networkMaskAtom)
	const [machineIp, setMachineIp] = useState("")
	
	useEffect(() => {
		window.ipcRenderer.invoke("get-current-ipv4").then((address) => {
			setMachineIp(address)
		})
	}, [])

	const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIp(e.target.value)
	}

	const handlePortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10)
		setPort(value)
	}

	const handleNetworkMaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMask(e.target.value)
	}

	return (
		<>
			<Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
				This machine has IP address: {machineIp}
			</Typography>
			<FormControl sx={{ mb: 4, width: '100%' }} variant="standard">
				<TextField id="standard-basic" label="Receiver IP Address" value={ip} onChange={handleIpChange} variant="standard" />
				<FormHelperText>Send to this IP</FormHelperText>
			</FormControl>
			<FormControl sx={{ mb: 4, width: '100%' }} variant="standard">
				<TextField id="standard-basic" label="Send to this port" type="number" value={port} onChange={handlePortChange} variant="standard" />
			</FormControl>
			<FormControl sx={{ mb: 4, width: '100%' }} variant="standard">
				<TextField id="standard-basic" label="Network mask" variant="standard" value={mask} onChange={handleNetworkMaskChange} />
			</FormControl>
		</>
	)
}