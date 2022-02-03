import { customElement, html, property, WithoutShadowRoot } from './WithoutShadowRoot';

@customElement('my-element')
export class MyElement extends WithoutShadowRoot {
	@property({ type: String })
	name = 'World';
	render() {
		return html`
			<h1>Hello, ${this.name}!</h1>
			<slot></slot>
		`;
	}
}