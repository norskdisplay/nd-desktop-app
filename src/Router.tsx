import CircularProgress from "@mui/material/CircularProgress";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { communicationProtocolAtom, comPortAtom, configErrorAtom, databitAtom, displayTextAtom, ipAddressAtom, networkMaskAtom, parityAtom, refreshRateAtom, startAppOnOSLoginAtom, startSendingOnAppStartAtom, stopBitAtom, tcpPortAtom } from "./atoms";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { NoMatch } from "./pages/NoMatch";
import { Settings } from "./pages/Settings";
import { Config, configSchema } from "./sharedTypes/configSchema";

export const Router = () => {
	const setDataBits = useSetAtom(databitAtom)
	const setParity = useSetAtom(parityAtom)
	const setStopBits = useSetAtom(stopBitAtom)
	const setProtocol = useSetAtom(communicationProtocolAtom)
	const setStartOnOsLogin = useSetAtom(startAppOnOSLoginAtom)
	const setStartOnAppStart = useSetAtom(startSendingOnAppStartAtom)
	const setRefreshRate = useSetAtom(refreshRateAtom)
	const setComPort = useSetAtom(comPortAtom)
	const setIp = useSetAtom(ipAddressAtom)
	const setNetworkMask = useSetAtom(networkMaskAtom)
	const setTcpPort = useSetAtom(tcpPortAtom)
	const setDisplayText = useSetAtom(displayTextAtom)
	const [isConfigLoaded, setIsConfigLoaded] = useState(false);
	const [isConfigStatusLoaded, setIsConfigStatusLoaded] = useState(false);
	const setConfigError = useSetAtom(configErrorAtom)

	const loadInitialData = () => {
		window.ipcRenderer.invoke('get-config').then((config: Config) => {
			if (configSchema.safeParse(config).success) {
				window.config = config
				setIsConfigLoaded(true)
				if (config.out.comConfig) {
					const { comConfig } = config.out
					setDataBits(comConfig.dataBits)
					setParity(comConfig.parity)
					setStopBits(comConfig.stopBits)
					setComPort(comConfig.port)
				}
				setProtocol(config.out.protocol)
				if (config.out.tcpConfig) {
					const { tcpConfig } = config.out
					setIp(tcpConfig.ip)
					setNetworkMask(tcpConfig.networkMask)
					setTcpPort(tcpConfig.port)
				}
				setRefreshRate(config.out.refreshRate)
				setStartOnAppStart(config.user.startAppOnOSLogin)
				setStartOnOsLogin(config.user.startSendingOnAppStart)
				if (config.displays.length) {
					setDisplayText(config.displays[0].description)
				}
			}
		})
		window.ipcRenderer.invoke('get-config-status').then((status) => {
			window.configStatus = status
			setIsConfigStatusLoaded(true)
		})
	}

	useEffect(() => {
		loadInitialData()
	}, [])

	useEffect(() => {
		if (isConfigStatusLoaded && window.configStatus) {
			if (window.configStatus.type !== "success") {
				setConfigError(true)
			}
		}
	}, [isConfigStatusLoaded])

	if (!isConfigLoaded && !isConfigStatusLoaded) return <CircularProgress color="secondary" />
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="settings" element={<Settings />} />
				<Route path="*" element={<NoMatch />} />
			</Route>
		</Routes>
	)
}