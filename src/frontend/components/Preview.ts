import { property } from 'lit/decorators';
import { customElement, html, StyledBase } from './StyledBase';

@customElement('nd-preview')
export class Preview extends StyledBase {
	@property({ type: String })
	text = ""
	render() {
		return html`
			<div class="mb-2 border-gray-300 rounded border p-3 min-height-50 relative">
				<span class="absolute nd-preview-text text-gray-600">Preview</span>
				${this.text}
			</div>
		`;
	}
}