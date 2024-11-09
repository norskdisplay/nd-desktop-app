import { useState } from "react"
import { TCPConfig, tcpConfigSchema } from "../sharedTypes/tcpConfig"
import { COMConfig, comConfigSchema } from "../sharedTypes/comConfig"
import { useAtomValue } from "jotai"
import { baduRateAtom, communicationProtocolAtom, comPortAtom, databitAtom, ipAddressAtom, networkMaskAtom, parityAtom, refreshRateAtom, startAppOnOSLoginAtom, startSendingOnAppStartAtom, stopBitAtom, tcpPortAtom } from "../atoms"
import { Config, configSchema, DisplayConfig } from "../sharedTypes/configSchema"

export const useSaveConfig = () => {
    const [errors, setErrors] = useState<string[]>([])
    const [isSaving, setIsSaving] = useState(false)
	const dataBits = useAtomValue(databitAtom)
	const parity = useAtomValue(parityAtom)
	const stopBits = useAtomValue(stopBitAtom)
	const protocol = useAtomValue(communicationProtocolAtom)
	const startOnOsLogin = useAtomValue(startAppOnOSLoginAtom)
	const startOnAppStart = useAtomValue(startSendingOnAppStartAtom)
	const refreshRate = useAtomValue(refreshRateAtom)
	const comPort = useAtomValue(comPortAtom)
	const ip = useAtomValue(ipAddressAtom)
	const networkMask = useAtomValue(networkMaskAtom)
	const tcpPort = useAtomValue(tcpPortAtom)
	const baduRate = useAtomValue(baduRateAtom)

    const save = async (displays: DisplayConfig[]) => {
        try {
            setIsSaving(true)
            console.log("values", displays)
            setErrors([])
            const tcpConfig: TCPConfig = {
                ip: ip,
                networkMask: networkMask,
                port: tcpPort
            }
            const comConfig: COMConfig = {
                port: comPort,
                baudRate: baduRate,
                dataBits: dataBits,
                highWaterMark: 32,
                parity: parity,
                stopBits: stopBits,
            }
            const unusedConfigIsValid = protocol === "COM" ? tcpConfigSchema.safeParse(tcpConfig).success : comConfigSchema.safeParse(comConfig).success
            const config: Config = {
                out: {
                    refreshRate: refreshRate,
                    protocol: protocol,
                    comConfig: protocol === "TCP" && !unusedConfigIsValid ? null : comConfig,
                },
                user: {
                    startAppOnOSLogin: startOnOsLogin,
                    startSendingOnAppStart: startOnAppStart
                },
                displays: displays.map((x) => ({...x, port: x.port, type: "alphanumeric"}))
            };
            var parser = configSchema.safeParse(config);
            
            console.log(parser)

            if (parser.success) {
                const err = await window.ipcRenderer.invoke("update-config", parser.data)
                if (Array.isArray(err)) {
                    setErrors(err)
                }
                return;
            }
            if (!parser.success) {
                parser.error.issues.map((issue) => setErrors([...errors, issue.message]));
                window.scrollTo({
                    top: 0
                })
            }
        } finally {
            setIsSaving(false)
        }
	}
    
    return {
        save,
        isSaving,
        errors,
    }
}