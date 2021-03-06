import { property, state } from 'lit/decorators';
import { AvailabePort } from '../../globals';
import { isHTMLInputElement } from '../utils/isHTMLElement';
import { customElement, html, StyledBase } from './StyledBase';

@customElement('nd-select-serial-port')
export class SelectSerialPort extends StyledBase {
	@property({ type: Array })
	availablePorts: AvailabePort[] = []

	@state()
	error = ""

	intervalRef: NodeJS.Timeout | null = null
	connectedCallback() {
		super.connectedCallback()
		this.getAvailablePorts()
		this.setInterval()
	}
	private getAvailablePorts() {
		window.ipcRenderer.invoke('get-available-serial-ports').then((data) => {
			if (JSON.stringify(this.availablePorts) !== JSON.stringify(data)) {
				this.availablePorts = data
			}
		})
	}
	private setInterval = () => {
		this.intervalRef = setInterval(() => {
			this.getAvailablePorts()
		}, 1000)
	}
	
	private handleChange = async (e: InputEvent) => {
		if (!isHTMLInputElement(e.target)) return
		window.ipcRenderer.invoke("set-choosen-serial-port", e.target.value)
		document.dispatchEvent(new CustomEvent('selected-port', {
			detail: {
				port: e.target.value
			}
		}))
	}
	disconnectedCallback(): void {
		if (this.intervalRef) clearInterval(this.intervalRef)
	}
	render() {
		return html`
			<select class="text-gray-600 w-20 focus:outline-none font-normal h-10 flex items-center pl-3 text-sm" @change=${this.handleChange}>
				${this.availablePorts.map((port) => html`<option value="${port.path}">${port.path}</option>`)}
			</select>
		`;
	}
}