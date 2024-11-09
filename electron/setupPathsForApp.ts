import * as path from "path";
import { logger } from "./Logger";

export const setupPathsForApp = (app: Electron.App) => {
    // Set shared data path to ProgramData for all users
    if (process.env.PROGRAMDATA) {
        const sharedDataPath = path.join(process.env.PROGRAMDATA, 'nd-desktop-app');
        app.setPath('userData', sharedDataPath); 
        logger.info("userData path set to program data")
    } else {
        logger.info("Unable to use ProgramData-folder. Using default userData path...")
    }

    // Create a logs folder within the choosen userData-folder
    app.setAppLogsPath(process.env.PROGRAMDATA)
};