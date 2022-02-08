import { IpcRenderer } from 'electron';

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
  }
}