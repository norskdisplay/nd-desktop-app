import { handleReplaceText } from './../utils/handleReplaceText';
import { isHTMLInputElement } from '../utils/isHTMLElement';
import { customElement, html, property, state, StyledBase } from './StyledBase';

@customElement('nd-display-input')
export class DisplayInput extends StyledBase {
	@property({ type: Boolean })
	show = false;
	@state()
	inputText = ""

	@state()
	port = ""

	replaceText = handleReplaceText()
	private toggleShow() {
		this.show = !this.show
	}

	connectedCallback() {
		super.connectedCallback()
		document.addEventListener('selected-port', this.handePortChange)
	}

	private handePortChange = (e: Event) => {
		this.port = (e as CustomEvent).detail.port
	}

	private handleInput = (e: InputEvent) => {
		if (!isHTMLInputElement(e.target)) return
		this.inputText = this.replaceText(e.target.value)
	}

	private sendText = async () => {
		await window.ipcRenderer.invoke('send-text-serial-port', this.inputText)
	}
	render() {
		return html`
			<div class="w-full">
				<div class="relative">
					<label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Display text</label>
					<div class="absolute right-0 top-0 text-gray-600 flex items-center h-full cursor-pointer" @click=${this.toggleShow}>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z"></path>
							<circle cx="12" cy="12" r="9"></circle>
							<line x1="12" y1="8" x2="12.01" y2="8"></line>
							<polyline points="11 12 12 12 12 16 13 16"></polyline>
						</svg>
					</div>
				</div>
				<div class="flex border-gray-300 rounded overflow-hidden border mb-4 mt-2 focus-within:border-blue-500">
					<nd-select-serial-port selected=${this.port}></nd-select-serial-port>
					<input id="name" class="text-gray-600 outline-none font-normal w-full h-10 flex items-center pl-3 text-sm" placeholder="Write text here" @input=${this.handleInput}>
					<button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded rounded-t-none rounded-b-none text-white px-2 py-2 text-sm" @click=${this.sendText}>Save</button>
				</div>
				<div>
					<nd-preview text=${this.inputText} />
				</div>
			</div>
			<nd-modal ?show=${this.show} />
		`;
	}
}