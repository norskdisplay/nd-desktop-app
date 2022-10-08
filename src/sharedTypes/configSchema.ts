import { z } from "zod";
import isIp from 'validator/lib/isIP';

const networkMaskRegex = /^(\*|25[0-5\*]|2[0-4\*][0-9\*]|[01\*]?[0-9\*][0-9\*]?)\.(\*|25[0-5\*]|2[0-4\*][0-9\*]|[01\*]?[0-9\*][0-9\*]?)\.(\*|25[0-5\*]|2[0-4\*][0-9\*]|[01\*]?[0-9\*][0-9\*]?)\.(\*|25[0-5\*]|2[0-4\*][0-9\*]|[01\*]?[0-9*][0-9*]?)$/
const isNetworkMask = (maybeMask: string) => {
	return networkMaskRegex.test(maybeMask)
}

export const parityEnum = z.enum(['none', 'even', 'mark', 'odd', 'space']);
export type ParityType = z.infer<typeof parityEnum>

export const stopBitEnum = z.enum(["1", "2"]);
export type StopBitType = z.infer<typeof stopBitEnum>

export const dataBitsEnum = z.enum(["5", "6", "7", "8"]);
export type DataBitType = z.infer<typeof dataBitsEnum>

export const communicationProtocolEnum = z.enum(["COM", "TCP"]);
export type CommunicationProtocolType = z.infer<typeof communicationProtocolEnum>

export const ComConfiguration = z.object({
	/**
	 * @default 8
	 */
	dataBits: dataBitsEnum,
	/**
	 * Can be 1 or 2
	 * @default 1
	 */
	stopBits: stopBitEnum,
	/**
	 * @default 9600
	 */
	baudRate: z.number().min(1).max(999999),
	/**
	 * @default 32
	 */
	highWaterMark: z.number().min(1).max(999999),
	/**
	 * One of the following 'none' | 'even' | 'mark' |'odd' | 'space'
	 * @default none
	 */
	parity: parityEnum
})

export const TCPConfiguration = z.object({
	ip: z.string().refine(isIp, "This does not look like a valid IP address."),
	networkMask: z.string().refine(isNetworkMask, "This does not look like a valid network mask"),
	port: z.number().min(0).max(65535)
})

export const globalConfigSchema = z.object({
	/**
	 * The number of displays to allow in the interface
	 * @default 100
	 */
	maxNumberOfDisplays: z.number().min(1).max(1000),
	/**
	 * @default 8
	 */
	dataBits: dataBitsEnum,
	/**
	 * Can be 1 or 2
	 * @default 1
	 */
	stopBits: stopBitEnum,
	/**
	 * @default 9600
	 */
	baudRate: z.number().min(1).max(999999),
	/**
	 * @default 32
	 */
	highWaterMark: z.number().min(1).max(999999),
	/**
	 * One of the following 'none' | 'even' | 'mark' |'odd' | 'space'
	 * @default none
	 */
	parity: parityEnum
})

export type GlobalConfigType = z.infer<typeof globalConfigSchema>

export interface UserSetting {
	/**
	 * The selected COM port
	 * @default COM1
	 */
	port: string
	/**
	 * Time between message send
	 * from 1 to 100000
	 * @default 500
	 */
	writeInterval: number
}
export const userSettingsSchema = z.object({
	port: z.string(),
	writeInterval: z.number().min(1)
})

export const displayTypeEnum = z.enum(["numeric", "alphanumeric", "graphic"]).optional();
export type DispayTypeEnumType = z.infer<typeof displayTypeEnum>

export const displaySchema = z.object({
	/** if shared com port, use address to disiuish  */
	address: z.number().min(0).max(99).optional(),
	/**
	 * number of lines the display can write
	 */
	lines: z.number().min(1).max(16).optional(),
	type: displayTypeEnum,
	/**
	 * Numbers of characters the display is able to show simultanously
	 * Not required to input for user
	 */
	characters: z.number().min(1).optional(),
	/**
	 * Ledetekst - foran editeringstekst står det en tekst
	 * "Silo 1"
	 */
	description: z.string(),
	/**
	 * Name of display, used to identify display in UI
	 */
	name: z.string()
})

export type DisplayConfig = z.infer<typeof displaySchema>

export interface Config {
	config: GlobalConfigType
	userSettings: UserSetting
	displays: DisplayConfig[]
}

export const configSchema = z.object({
	config: globalConfigSchema,
	userSettings: userSettingsSchema,
	displays: z.array(displaySchema)
})