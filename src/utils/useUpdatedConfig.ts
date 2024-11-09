import { useSetAtom } from "jotai"
import { useEffect, useState } from "react"
import { Config, configSchema } from "../sharedTypes/configSchema"
import { communicationProtocolAtom, comPortAtom, configErrorAtom, databitAtom, displayConfigListAtom, isSendingAtom, parityAtom, refreshRateAtom, startAppOnOSLoginAtom, startSendingOnAppStartAtom, stopBitAtom } from "../atoms";

type UseUpdateConfig = {
	isLoading: boolean
	reload: () => void
}

export const useUpdatedConfig = (): UseUpdateConfig => {
	const [ isLoading, setIsLoading ] = useState(true)
	const setDataBits = useSetAtom(databitAtom)
	const setParity = useSetAtom(parityAtom)
	const setStopBits = useSetAtom(stopBitAtom)
	const setProtocol = useSetAtom(communicationProtocolAtom)
	const setStartOnOsLogin = useSetAtom(startAppOnOSLoginAtom)
	const setStartSendingOnAppStart = useSetAtom(startSendingOnAppStartAtom)
	const setRefreshRate = useSetAtom(refreshRateAtom)
	const setComPort = useSetAtom(comPortAtom)
	const setConfigError = useSetAtom(configErrorAtom)
	const setIsRunning = useSetAtom(isSendingAtom)
	const setDisplayConfigList = useSetAtom(displayConfigListAtom)

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
				setRefreshRate(config.out.refreshRate)
				setStartSendingOnAppStart(config.user.startSendingOnAppStart)
				setIsRunning(config.user.startSendingOnAppStart)
				setStartOnOsLogin(config.user.startAppOnOSLogin)
				setDisplayConfigList(config.displays)
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	return {
		isLoading, 
		reload: loadConfig
	}
}