import { z } from "zod"

export const parityEnum = z.enum(['none', 'even', 'mark', 'odd', 'space']);
export type ParityType = z.infer<typeof parityEnum>

export const stopBitEnum = z.enum(["1", "2"]);
export type StopBitType = z.infer<typeof stopBitEnum>

export const dataBitsEnum = z.enum(["5", "6", "7", "8"]);
export type DataBitType = z.infer<typeof dataBitsEnum>

export const comConfigSchema = z.object({
	port: z.number().min(0).max(999),
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

export type COMConfig = z.infer<typeof comConfigSchema>