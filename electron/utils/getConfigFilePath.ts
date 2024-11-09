import { app } from "electron"
import { resolve } from "path"

export const configFileName = "configv2.yml"
export const getConfigFilePath = () => resolve(app.getPath("userData"), configFileName)