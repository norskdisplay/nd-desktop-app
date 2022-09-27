import { app } from "electron"
import { resolve } from "path"

export const configFileName = "config.yml"
export const getConfigFilePath = () => resolve(app.getPath("userData"), configFileName)