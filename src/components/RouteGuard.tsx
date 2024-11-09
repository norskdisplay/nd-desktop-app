import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { useUpdatedConfig } from "../utils/useUpdatedConfig";
import { useAtom, useAtomValue } from "jotai";
import { displayConfigListAtom, numberOfDisplaysAtom } from "../atoms";

export const RouteGuard = () => {
	const [firstRender, setFirstRender] = useState(true)
	const { isLoading } = useUpdatedConfig();
	const navigate = useNavigate()
	const displayList = useAtomValue(displayConfigListAtom)
	const [, setNumberOfDisplays] = useAtom(numberOfDisplaysAtom)

	useEffect(() => {
		if (!isLoading && firstRender) {
			// This is breaking the rules of hooks but we want to do this only once
			setNumberOfDisplays(displayList.length === 0 ? 1 : displayList.length)
			setFirstRender(false)
			navigate("/")
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, navigate, firstRender])

	if (isLoading) return <CircularProgress color="secondary" />
	
	return <Outlet />
}