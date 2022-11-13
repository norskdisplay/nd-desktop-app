import { useSetAtom } from "jotai"
import { useEffect, useState } from "react"
import { Config, configSchema } from "../sharedTypes/configSchema"
import { communicationProtocolAtom, comPortAtom, configErrorAtom, databitAtom, displayTextAtom, ipAddressAtom, isSendingAtom, networkMaskAtom, parityAtom, refreshRateAtom, startAppOnOSLoginAtom, startSendingOnAppStartAtom, stopBitAtom, tcpPortAtom } from "../atoms";

export const useUpdatedConfig = () => {
	const [ isLoading, setIsLoading ] = useState(true)
	const setDataBits = useSetAtom(databitAtom)
	const setParity = useSetAtom(parityAtom)
	const setStopBits = useSetAtom(stopBitAtom)
	const setProtocol = useSetAtom(communicationProtocolAtom)
	const setStartOnOsLogin = useSetAtom(startAppOnOSLoginAtom)
	const setStartSendingOnAppStart = useSetAtom(startSendingOnAppStartAtom)
	const setRefreshRate = useSetAtom(refreshRateAtom)
	const setComPort = useSetAtom(comPortAtom)
	const setIp = useSetAtom(ipAddressAtom)
	const setNetworkMask = useSetAtom(networkMaskAtom)
	const setTcpPort = useSetAtom(tcpPortAtom)
	const setDisplayText = useSetAtom(displayTextAtom)
	const setConfigError = useSetAtom(configErrorAtom)
	const setIsRunning = useSetAtom(isSendingAtom)

	const loadConfig = () => {
		setConfigError(false)
		window.ipcRenderer.invoke('get-config').then((config: Config) => {
			if (configSchema.safeParse(config).success) {
				window.config = config
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
				setStartSendingOnAppStart(config.user.startSendingOnAppStart)
				setIsRunning(config.user.startSendingOnAppStart)
				setStartOnOsLogin(config.user.startAppOnOSLogin)
				if (config.displays.length) {
					setDisplayText(config.displays[0].description)
				}
			}
		}).finally(() => {
			setIsLoading(false)
		})
		window.ipcRenderer.invoke('get-config-status').then((status) => {
			window.configStatus = status
			if (status.type !== "success") {
				setConfigError(true)
			}
		})
	}
	
	useEffect(() => {
		loadConfig()
	}, [])
	
	return isLoading
}