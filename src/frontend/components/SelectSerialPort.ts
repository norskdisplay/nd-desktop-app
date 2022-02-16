import { property, state } from 'lit/decorators';
import { AvailabePort } from '../../globals';
import { isHTMLInputElement } from '../utils/isHTMLElement';
import { customElement, html, WithoutShadowRoot } from './WithoutShadowRoot';

@customElement('nd-select-serial-port')
export class SelectSerialPort extends WithoutShadowRoot {
	@property({ type: Array })
	availablePorts: AvailabePort[] = []

	@state()
	error = ""

	intervalRef: NodeJS.Timeout | null = null
	connectedCallback() {
		super.connectedCallback()
		this.getAvailablePorts()
		this.setInterval()
		document.addEventListener('close-toast', this.removeError);
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
	private removeError = () => {
		this.error = ""
	}
	private showError = (err: string) => {
		this.error = err
		setTimeout(() => {
			this.error = ""
		}, 10000)
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
		document.removeEventListener('close-toast', this.removeError);
	}
	render() {
		return html`
			<select class="text-gray-600 w-20 focus:outline-none font-normal h-10 flex items-center pl-3 text-sm" @change=${this.handleChange}>
				${this.availablePorts.map((port) => html`<option value="${port.path}">${port.path}</option>`)}
			</select>
			<nd-toast ?show=${!!this.error} message=${this.error}></nd-toast>
		`;
	}
}