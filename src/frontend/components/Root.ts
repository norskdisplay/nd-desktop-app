import { customElement, html, state, StyledBase } from './StyledBase';

const delay = async (ms: number) => new Promise((res) => {
	setTimeout(res, ms);
})

@customElement('nd-root')
export class Root extends StyledBase {
	@state()
	loading = true
	connectedCallback(): void {
		super.connectedCallback();
		this.checkDataReady();
	}
	async checkDataReady(): Promise<void> {
		console.log("Running chech", window.config, this.loading)
		if (window.config === undefined) {
			await delay(10);
			return this.checkDataReady();
		}
		console.log("Setting loading false")
		this.loading = false;
	}
	render() {
		if (this.loading) {
			return html`<div>Loading</div>`
		}
		return html`
			<nd-layout></nd-layout>
		`;
	}
}