import { property } from 'lit/decorators';
import { customElement, html, WithoutShadowRoot, state, LitElement } from './WithoutShadowRoot';

@customElement('nd-accordation')
export class Accordation extends LitElement {
	createRenderRoot() {
		Object.keys(this).map((key) => console.log(key, (this as any)[key])); 
		return this;
	}
	@property({ type: String })
	text = ""
	@state()
	open = false
	render() {
		return html`
			<button @click=${() => this.open = !this.open}>
				${this.text}
			</button>
			<div class="mb-2 border-gray-300 rounded border p-3 min-height-50 relative ${this.open ? "" : "hidden"}">
				<slot></slot>
			</div>
		`;
	}
}