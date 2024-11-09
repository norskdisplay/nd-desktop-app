import isIp from 'validator/lib/isIP';
import { z } from "zod"

export const networkMaskRegex = /^(\*|25[0-5\*]|2[0-4\*][0-9\*]|[01\*]?[0-9\*][0-9\*]?)\.(\*|25[0-5\*]|2[0-4\*][0-9\*]|[01\*]?[0-9\*][0-9\*]?)\.(\*|25[0-5\*]|2[0-4\*][0-9\*]|[01\*]?[0-9\*][0-9\*]?)\.(\*|25[0-5\*]|2[0-4\*][0-9\*]|[01\*]?[0-9*][0-9*]?)$/
export const isNetworkMask = (maybeMask: string) => {
	return networkMaskRegex.test(maybeMask)
}

export const tcpConfigSchema = z.object({
	ip: z.string().refine(isIp, "This does not look like a valid IP address."),
	networkMask: z.string().refine(isNetworkMask, "This does not look like a valid network mask"),
	port: z.number().min(0).max(65535)
})

export type TCPConfig = z.infer<typeof tcpConfigSchema>