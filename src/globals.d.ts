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

interface Config {
	maxDisplayNumber: number
	dataBits: number // 8, 7, 6, or 5 @default 8
	stopBits: number // 1 or 2 @default 1
	baudRate: number // @default 9600
	highWaterMark: number // @default 32
	parity: 'none' | 'even' | 'mark' |'odd' | 'space'
}

interface UserSetting {
	port: string // com port
	// windowSize??
	/**
	 * Time between message send
	 * from 1 to 100000
	 */
	writeInterval: number
}

// Program can be long running process. Should not close window.
// can cache text history - text displayed
// merge fields burde oppdateres i interval - eks $h = hours akkurat nå
// Droppe preview

interface DisplayConfig {
	/**
	 * Numbers of characters the display is able to show simultanously
	 * Not required to input for user
	 */
	characters?: number
	/**
	 * Ledetekst - foran editeringstekst står det en tekst
	 * "Silo 1"
	 */
	description: string
	/**
	 * Name of display, used to identify display in UI
	 */
	name: string
}

declare global {
	interface Window {
		ipcRenderer: IpcRenderer
		availablePorts: AvailabePort[]
	}
}