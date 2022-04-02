import { property } from 'lit/decorators';
import { customElement, html, StyledBase, state } from './StyledBase';

@customElement('nd-accordation')
export class Accordation extends StyledBase {
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