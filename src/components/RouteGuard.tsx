import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { useUpdatedConfig } from "../utils/useUpdatedConfig";

export const RouteGuard = () => {
	const [firstRender, setFirstRender] = useState(true)
	const isLoadingConfig = useUpdatedConfig();
	const navigate = useNavigate()

	useEffect(() => {
		if (!isLoadingConfig && firstRender) {
			setFirstRender(false)
			navigate("/")
		}
	}, [isLoadingConfig, navigate, firstRender])

	if (isLoadingConfig) return <CircularProgress color="secondary" />
	
	return <Outlet />
}