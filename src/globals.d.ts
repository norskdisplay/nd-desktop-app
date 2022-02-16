import { IpcRenderer } from 'electron';
import { Config } from './configSchema';

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
	}
}