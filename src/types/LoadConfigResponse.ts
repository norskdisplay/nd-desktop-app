import { Config } from './../configSchema';
import { ZodError } from "zod";

export type UploadConfigResponse = {
	type: "success",
	message: string
} | {
	type: "validationerror",
	data: ZodError<Config>["issues"]
} | {
	type: "error",
	message: string
} | {
	type: "cancelled"
}
