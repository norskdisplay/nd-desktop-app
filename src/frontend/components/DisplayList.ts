import { customElement, html, StyledBase } from './StyledBase';

@customElement('nd-display-list')
export class DisplayList extends StyledBase {
	render() {
		return html`
		<h1 class="text-2xl mb-2">Your displays</h1>
			<ul>
				${window.config.displays.map((display) => html`
					<li class="drop-shadow-lg rounded py-3 px-5 bg-white hover:bg-gray-100 cursor-pointer mb-2">
						<nd-accordation text=${display.name}>${display.description || "No description."}</nd-accordation>
					</li>
				`)}
			</ul>
		`;
	}
}