import { configSchema } from "../src/configSchema"
import { defaultConfig } from "../src/electron/defaultConfig"

const start = () => {
	configSchema.parse(defaultConfig)
}

start()
