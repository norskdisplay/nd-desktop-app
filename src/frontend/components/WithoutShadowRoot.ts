import { LitElement } from "lit"

export class WithoutShadowRoot extends LitElement {
	createRenderRoot() {
		return this;
	}
}

export * from "lit"
export { customElement, property, state } from 'lit/decorators.js';