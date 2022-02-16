import { z } from "zod";

// Program can be long running process. Should not close window.
// can cache text history - text displayed
// merge fields burde oppdateres i interval - eks $h = hours akkurat nå
// Droppe preview

export interface GlobalConfig {
	/**
	 * The number of displays to allow in the interface
	 * @default 100
	 */
	maxNumberOfDisplays: number
	/**
	 * @default 8
	 */
	dataBits: 5 | 6 | 7 | 8
	/**
	 * Can be 1 or 2
	 * @default 1
	 */
	stopBits: 1 | 2
	/**
	 * @default 9600
	 */
	baudRate: number
	/**
	 * @default 32
	 */
	highWaterMark: number
	/**
	 * One of the following 'none' | 'even' | 'mark' |'odd' | 'space'
	 * @default none
	 */
	parity: 'none' | 'even' | 'mark' |'odd' | 'space'
}
export const globalConfigSchema = z.object({
	maxNumberOfDisplays: z.number().min(1).max(1000),
	dataBits: z.number().min(5).max(8),
	stopBits: z.number().min(1).max(2),
	baudRate: z.number().min(1).max(999999),
	highWaterMark: z.number().min(1).max(999999),
	parity: z.enum(['none', 'even', 'mark', 'odd', 'space'])
})
// export const GlobalConfig = z.infer<typeof globalConfigSchema>
// TODO: find out why typescript complains about ZOD infer method missing

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

export interface DisplayConfig {
	/**
	 * Numbers of characters the display is able to show simultanously
	 * Not required to input for user
	 */
	characters?: number
	/**
	 * Ledetekst - foran editeringstekst står det en tekst
	 * "Silo 1"
	 */
	description: string
	/**
	 * Name of display, used to identify display in UI
	 */
	name: string
}
export const displaySchema = z.object({
	characters: z.number().min(1).optional(),
	description: z.string(),
	name: z.string()
})

export interface Config {
	config: GlobalConfig
	userSettings: UserSetting
	displays: DisplayConfig[]
}

export const configSchema = z.object({
	config: globalConfigSchema,
	userSettings: userSettingsSchema,
	displays: z.array(displaySchema)
})