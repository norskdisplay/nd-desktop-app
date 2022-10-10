import { z } from "zod";
import { comConfigSchema } from "./comConfig";
import { tcpConfigSchema } from "./tcpConfig";
import { userConfigSchema } from "./userConfig";

export const communicationProtocolEnum = z.enum(["COM", "TCP"]);
export type CommunicationProtocolType = z.infer<typeof communicationProtocolEnum>

export const outConfigSchema = z.object({
	refreshRate: z.number().min(100).max(10000),
	protocol: communicationProtocolEnum,
	tcpConfig: tcpConfigSchema.nullable(),
	comConfig: comConfigSchema.nullable()
}).refine((args) => {
	if (args.protocol !== "COM") return true;
	return args.comConfig != null;
}, {
	message: "COM config is required",
	path: ["comConfig"]
}).refine((args) => {
	if (args.protocol !== "TCP") return true;
	return args.tcpConfig != null;
}, {
	message: "TCP config is required",
	path: ["tcpConfig"]
})

export type OutConfig = z.infer<typeof outConfigSchema>

export const displayTypeEnum = z.enum(["numeric", "alphanumeric", "graphic"]);
export type DispayTypeEnumType = z.infer<typeof displayTypeEnum>

export const displayConfigSchema = z.object({
	/** if shared com port, use address to disiuish  */
	address: z.number().min(0).max(99).optional(),
	/**
	 * number of lines the display can write
	 */
	lines: z.number().min(1).max(16).optional(),
	type: displayTypeEnum.optional(),
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

export type DisplayConfig = z.infer<typeof displayConfigSchema>

export const configSchema = z.object({
	out: outConfigSchema,
	user: userConfigSchema,
	displays: z.array(displayConfigSchema)
})

export type Config = z.infer<typeof configSchema>