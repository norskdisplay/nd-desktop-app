import { Config } from './configSchema';
import { ZodError } from "zod";

export type ValidationError = {
	type: "validationerror",
	data: ZodError<Config>["issues"]
} 

export type LoadConfigResponse = {
	type: "success",
	message: string
} | {
	type: "error",
	message: string
} | ValidationError

export type UploadConfigResponse = {
	type: "success",
	message: string
}| {
	type: "error",
	message: string
} | {
	type: "cancelled"
} | ValidationError