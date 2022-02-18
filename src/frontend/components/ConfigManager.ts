import { isHTMLElement } from './../utils/isHTMLElement';
import { customElement, html, state, WithoutShadowRoot } from './WithoutShadowRoot';

@customElement('nd-config-manager')
export class ConfigManager extends WithoutShadowRoot {
	@state()
	show = false

	private handleClick() {
		this.show = !this.show
	}

	connectedCallback() {
		super.connectedCallback()
		console.log("Running connected callback")
		document.addEventListener('click', this.outsideClickListener);
	}

	outsideClickListener = (e: MouseEvent) => {
		if (!e.target || !isHTMLElement(e.target)) return
		const specifiedElement = this.querySelector("#uploaddropdowncontainer")
		if (!specifiedElement) return
		const isClickInside = specifiedElement.contains(e.target);
		if (!isClickInside) {
			if( this.show) this.show = false
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback()
		document.removeEventListener("click", this.outsideClickListener)
	}
	render() {
		return html`
			<div class="ml-auto relative" id="uploaddropdowncontainer">
				<button @click=${this.handleClick} class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded rounded-t-none rounded-b-none text-white px-2 py-2 text-sm flex justify-content-center items-center" type="button">
					<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="3"></circle>
						<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1
							0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0
							0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2
							2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0
							0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1
							0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0
							0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65
							0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0
							1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0
							1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2
							0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0
							1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0
							2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0
							0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65
							1.65 0 0 0-1.51 1z"></path>
					</svg>
					<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
				</button>
				<!-- Dropdown menu -->
				<div class="${this.show ? "" : "hidden"} bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow drop-shadow-lg my-2 block absolute right-0 min-w-12em" id="dropdown">
					<div class="px-4 py-3">
						<span class="block text-sm font-bold">Config</span>
					</div>
					<ul class="py-1" aria-labelledby="dropdown">
						<li>
							<a href="#" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Upload</a>
						</li>
						<li>
							<a href="#" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Download</a>
						</li>
					</ul>
				</div>
			</div>
		`;
	}
}