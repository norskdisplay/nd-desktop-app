import { showModalEvent } from '../customEvents/toast';
import { customElement, html, WithoutShadowRoot } from './WithoutShadowRoot';

@customElement('nd-layout')
export class Layout extends WithoutShadowRoot {
	connectedCallback(): void {
		super.connectedCallback();
			setTimeout(() => {
				if (window.configStatus) {
					if (window.configStatus.type === "validationerror") {
						const issueString = window.configStatus.data.map((issue) => {
							return `<li><pre class="bg-slate-200 inline-block rounded px-0.5">${issue.path.join(".")}</pre> ${issue.message}</li>`
						}).join("")
						document.dispatchEvent(showModalEvent({
							heading: "Validation errors in uploaded file",
							body: `<p class="bg-red-600 text-white p-4 rounded-lg mb-4">Due to errors in the uploaded config file, the settings has not beed updated. Fix the following errors in the file and try again:</p><ul class="list-disc 
							list-inside">${issueString}</ul>`
						}))
					}
					if (window.configStatus.type === "error") {
						document.dispatchEvent(showModalEvent({
							heading: "Whoops, error in config file",
							body: `<p>An error occured when loading your local config. Exception message was:</p><p>${window.configStatus.message}</p>`
						}))
					}
				}
			}, 200)
	}
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
					<nd-accordation text="hello">some contet</nd-accordation>
					<nd-display-list></nd-display-list>
				</div>
				<nd-toast-manager></nd-toast-manager>
				<nd-upload-error></nd-upload-error>
			</div>
		`;
	}
}