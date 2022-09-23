const path = require("path")
const fs = require("fs/promises")

const root = path.resolve(__dirname, "../")
const dist = path.resolve(root, "./dist")

const start = async () => {
	try {
		const magicString = "TAILWIND_INSERT_HERE"
		const html = await fs.readFile(path.resolve(root, "./index.html"), "utf-8")
		const style = await fs.readFile(path.resolve(dist, "./style.css"), "utf-8")
		const newHTML = html.replace(magicString, style)
		await fs.writeFile(path.resolve(dist, "index.html"), newHTML, "utf-8")
		process.exit(0)
	} catch (e) {
		console.log(e)
		process.exit(1)
	}
}

start();