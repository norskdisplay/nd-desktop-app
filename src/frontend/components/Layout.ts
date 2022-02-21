import { customElement, html, WithoutShadowRoot } from './WithoutShadowRoot';

@customElement('nd-layout')
export class Layout extends WithoutShadowRoot {
	render() {
		return html`
			<div class="h-full flex flex-col">
				<!--Nav-->
				<div class="container mx-auto p-6 flex">
					<div class="w-full flex items-center justify-between">
						<div class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"> 
							<img class="h-8 fill-current text-indigo-600 pr-2" src="./static/logo.svg" alt="Norsk Display logo" />
						</div>				
					</div>
					<nd-settings-dropdown></nd-settings-dropdown>
				</div>
			
				<!--Main-->
				<div class="container px-6 mx-auto flex flex-wrap flex-col items-center justify-center flex-grow">
					<nd-display-input />
				</div>
				<nd-toast-manger></nd-toast-manger>
			</div>
		`;
	}
}