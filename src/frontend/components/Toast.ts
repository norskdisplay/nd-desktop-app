import { closeToastEvent } from '../customEvents/toast';
import { NewToast } from '../types/Toast';
import { customElement, html, property, WithoutShadowRoot } from './WithoutShadowRoot';

interface ThemeReturn {
	background: string
	color: string
	border: string
}

@customElement('nd-toast')
export class Toast extends WithoutShadowRoot {
	@property({ type: String })
	toastId = ""

	@property({ type: String })
	message = ""

	@property({ type: String })
	type: NewToast["type"] = "success"

	private close = () => {
		document.dispatchEvent(closeToastEvent(this.toastId))
	}

	private getTheme = (): ThemeReturn => {
		switch(this.type) {
			case "error":
				return {
					background: "bg-red-600",
					color: "text-white",
					border: "border-red-500"
				}
			case "warning":
				return {
					background: "bg-yellow-400",
					color: "text-black",
					border: "border-amber-500"
				}
			case "success": 
				return {
					background: "bg-green-300",
					color: "text-black",
					border: "border-green-400"
				}
		}
	}

	private capitalizeFirstLetter(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	render() {
		const { background, color, border } = this.getTheme();
		return html`
			<div class="fixed bottom-1 right-1 z-50 ${background} shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
				<div class="${background} flex justify-between items-center py-2 px-3 bg-clip-padding border-b ${border} rounded-t-lg">
				<p class="font-bold ${color} flex items-center">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
					</svg>
					${this.capitalizeFirstLetter(this.type)}
				</p>
				<div class="flex items-center">
					<p class="${color} opacity-90 text-xs"></p>
					<button type="button" class="btn-close btn-close-white box-content w-4 h-4 ml-2 ${color} border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:${color} hover:opacity-75 hover:no-underline" aria-label="Close" @click=${this.close}>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x pointer-events-none" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z"></path>
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
					<!-- <button class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" @click=${this.close} aria-label="close modal" role="button"> -->
						
					</button>
				</div>
				</div>
				<div class="p-3 ${background} rounded-b-lg break-words ${color}">
					${this.message}
				</div>
			</div>
		`;
	}
}