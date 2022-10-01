import { Config } from './configSchema';
import { ZodError } from "zod";

export type ValidationError = {
	type: "validationerror",
	data: ZodError<Config>["issues"]
} 
export type ErrorType = {
	type: "error",
	message: string
}

export type SuccessType = {
	type: "success",
	message: string
}

export type LoadConfigResponse = SuccessType | ErrorType | ValidationError

export type UploadConfigResponse = {
	type: "success",
	message: string
}| {
	type: "error",
	message: string
} | {
	type: "cancelled"
} | ValidationError