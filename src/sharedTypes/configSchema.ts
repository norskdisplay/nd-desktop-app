import { z } from "zod";
import isIp from 'validator/lib/isIP';
import { comConfigSchema } from "./comConfig";
import { isNetworkMask } from "./tcpConfig";
import { userConfigSchema } from "./userConfig";

export const communicationProtocolEnum = z.enum(["COM", "TCP"]);
export type CommunicationProtocolType = z.infer<typeof communicationProtocolEnum>

export const refreshRateSchema = z.number().min(100).max(10000)
export type RefreshRateType = z.infer<typeof refreshRateSchema>

export const outConfigSchema = z.object({
	refreshRate: refreshRateSchema,
	protocol: communicationProtocolEnum,
	comConfig: comConfigSchema.nullable()
}).refine((args) => {
	if (args.protocol !== "COM") return true;
	return args.comConfig != null;
}, {
	message: "COM config is required",
	path: ["comConfig"]
})

export type OutConfig = z.infer<typeof outConfigSchema>

export const displayTypeEnum = z.enum(["numeric", "alphanumeric", "graphic"]);
export type DispayTypeEnumType = z.infer<typeof displayTypeEnum>

export const displayConfigSchema = z.object({
	id: z.string(),
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
	description: z.string().optional(),
	/**
	 * Name of display, used to identify display in UI
	 */
	name: z.string(),
	ip: z.string().refine(isIp, "This does not look like a valid IP address.").optional(),
	networkMask: z.string().refine(isNetworkMask, "This does not look like a valid network mask").optional(),
	port: z.number().min(0).max(65535).optional(),
	// TODO are these required?
	addressGroup: z.number().min(0).max(255),
	addressUnit: z.number().min(0).max(255)
})

export type DisplayConfig = z.infer<typeof displayConfigSchema>

export const configSchema = z.object({
	out: outConfigSchema,
	user: userConfigSchema,
	displays: z.array(displayConfigSchema)
})
// .refine((args) => {
// 	if (args.out.protocol !== "TCP") return true;
// 	return !args.displays.some(x => !x.ip || x.port == null)
// }, { message: "CUSTOM VALUDATION DID NOT PASS"})

export type Config = z.infer<typeof configSchema>