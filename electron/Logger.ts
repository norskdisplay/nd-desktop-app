import { createWriteStream } from "fs"
import { app } from "electron"

// https://stackoverflow.com/questions/8393636/configure-node-js-to-log-to-a-file-instead-of-the-console/33898010#33898010
class Logger {
	path = app.getPath("logs") + "\\nd-desktop.log"
	logStream = createWriteStream(this.path, { flags: "a" })
	isDevMode = !app.isPackaged

	getDateString() {
		const date = new Date()
		return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
	}

	getSafeMessage(m: unknown): string {
		if (!m) return "No message provided to Logger"
		if (m instanceof Object && m.toString) {
			return m.toString()
		}
		return `${m}`
	}	

	writeLog(prefix: string, m: unknown) {
		const date = this.getDateString()
		const safeMessage = this.getSafeMessage(m)
		if (this.isDevMode) {
			console.log(`${prefix} ${safeMessage}`)
			if (typeof m !== "string") console.log(m)
		}
		this.logStream.write(`[${date}]${prefix} ${safeMessage}\n`)
	}
	debug(m: unknown) {
		this.writeLog("[DEBUG]:", m)
	}
	info(m: unknown) {
		this.writeLog("[INFO]:", m)
	}
	warning(m: unknown) {
		this.writeLog("[WARNING]:", m)
	}
	error(m: unknown) {
		this.writeLog("[ERROR]:", m)
	}
}

export const logger = new Logger();