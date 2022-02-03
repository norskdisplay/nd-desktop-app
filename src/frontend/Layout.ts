import { customElement, html, WithoutShadowRoot } from './WithoutShadowRoot';

@customElement('nd-layout')
export class Layout extends WithoutShadowRoot {
	render() {
		return html`
			<div class="h-screen pb-14 bg-right bg-cover"">
				<!--Nav-->
				<div class="w-full container mx-auto p-6">
						
					<div class="w-full flex items-center justify-between">
						<div class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"> 
							<img class="h-8 fill-current text-indigo-600 pr-2" src="./static/logo.svg" alt="Norsk Display logo" />
						</div>				
					</div>
			
				</div>
			
				<!--Main-->
				<div class="container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col items-center">
					<my-element></my-element>
				</div>
			</div>
		`;
	}
}