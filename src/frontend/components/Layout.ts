import { showModalEvent } from '../customEvents/toast';
import { customElement, html, property, StyledBase } from './StyledBase';

@customElement('nd-layout')
export class Layout extends StyledBase {
	@property({ type: Boolean })
	showSettings = false;
	connectedCallback(): void {
		super.connectedCallback();
		document.addEventListener('show-settings', this.showSettingsHandler);
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
	showSettingsHandler = () =>  {
		this.showSettings = true;
	}
	disconnectedCallback(): void {
		super.disconnectedCallback()
		document.removeEventListener("show-settings", this.showSettingsHandler)
	}
	render() {
		return html`
			<div class="h-full flex flex-col">
				<!--Nav-->
				<div class="container mx-auto p-6 flex">
					<div class="w-full flex items-center justify-between">
						<div class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"> 
							<img class="h-8 fill-current text-indigo-600 pr-2" src="../static/logo.svg" alt="Norsk Display logo" />
						</div>				
					</div>
					<nd-settings-dropdown></nd-settings-dropdown>
				</div>

				<!--Main-->
				<div class="container px-6 mx-auto flex flex-wrap flex-col justify-center flex-grow">
					<div class="flex justify-center mb-2 text-zinc-500">
						Broadcasting on ${window.config.userSettings.port} with frequency 3 times per second
						<button aria-label="Edit settings" title="Edit broadcast settings"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M18.414 2a.997.997 0 0 0-.707.293l-2 2-1.414 1.414L3 17v4h4L21.707 6.293a.999.999 0 0 0 0-1.414l-2.586-2.586A.997.997 0 0 0 18.414 2zm0 2.414 1.172 1.172-1.293 1.293-1.172-1.172 1.293-1.293zm-2.707 2.707 1.172 1.172L6.172 19H5v-1.172L15.707 7.121z"/></svg></button>
					</div>
					<nd-display-list></nd-display-list>
				</div>
				<nd-toast-manager></nd-toast-manager>
				<nd-upload-error></nd-upload-error>
				<nd-modal ?show=${this.showSettings}><nd-settings></nd-settings></nd-modal>
			</div>
		`;
	}
}