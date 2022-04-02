import { IpcRenderer } from 'electron';
import { Config } from './configSchema';
import { LoadConfigResponse } from './types/LoadConfigResponse';

interface AvailabePort {
	path: string
	manufacturer: string
	serialNumber: string
	pnpId: string
	locationId: string
	productId: string
	vendorId: string
}

declare global {
	interface Window {
		ipcRenderer: IpcRenderer
		availablePorts: AvailabePort[]
		config: Config
		configStatus?: LoadConfigResponse
	}
}

declare module ".import.css";