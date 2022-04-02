import { LitElement } from "lit"

const styleTag = document.querySelector('#style-template')?.querySelector("style") as HTMLStyleElement

export class WithoutShadowRoot extends LitElement {
	connectedCallback(): void {
		super.connectedCallback();
		const style = styleTag.cloneNode(true);

		this.shadowRoot?.appendChild(style)
	}
}

export * from "lit"
export { customElement, property, state } from 'lit/decorators.js';
export { unsafeHTML } from "lit/directives/unsafe-html"