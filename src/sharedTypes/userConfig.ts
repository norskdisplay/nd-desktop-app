import { z } from "zod"

export const userConfigSchema = z.object({
	startAppOnOSLogin: z.boolean(),
	startSendingOnAppStart: z.boolean()
})

export type UserConfigType = z.infer<typeof userConfigSchema>