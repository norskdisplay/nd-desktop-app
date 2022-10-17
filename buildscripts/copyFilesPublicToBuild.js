const path = require("path")
const fs = require("fs").promises

const publicPath = path.resolve(__dirname, "../public")
const buildPath = path.resolve(__dirname, "../build")

const filesToMove = ["helptext.html"]

const run = async () => {
	try {
		console.log("Starting copyFilesPublicToBuild script...")

		const promises = filesToMove.map((fileName => fs.copyFile(path.resolve(publicPath, fileName), path.resolve(buildPath, fileName))))
		await Promise.all(promises)

		console.log("Success copyFilesPublicToBuild")
	} catch(e) {
		console.log("Error copyFilesPublicToBuild")
		console.error(e)
	}
}

run()