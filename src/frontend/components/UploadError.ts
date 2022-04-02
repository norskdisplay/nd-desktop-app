import { ShowModalEventDetail } from '../types/ShowToastEvetDetail';
import { customElement, html, unsafeHTML, state, StyledBase } from './StyledBase';

@customElement('nd-upload-error')
export class ModalManger extends StyledBase {
	@state()
	show = false

	@state()
	modalContent: ShowModalEventDetail = {
		heading: "",
		body: ""
	}

	connectedCallback() {
		super.connectedCallback()
		document.addEventListener('show-modal', this.showModal);
	}

	private showModal = (e: ShowModalEvent) => {
		this.modalContent = e.detail
		this.show = true
	}

	private close() {
		this.show = false
		this.modalContent = {
			heading: "",
			body: ""
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback()
		document.removeEventListener('show-modal', this.showModal);
	}
	render() {
		if (!this.show) return null
		return html`
			<div class="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
				<div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
					<div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
						<h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">${this.modalContent.heading}</h1>
						<div class="mb-5">
							${unsafeHTML(this.modalContent.body)}
						</div>

						<div class="flex items-center justify-start w-full">
							<button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" @click=${this.close}>Close</button>
						</div>
						<button class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" @click=${this.close} aria-label="close modal" role="button">
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z"></path>
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
						</button>
					</div>
				</div>
			</div>
		`;
	}
}