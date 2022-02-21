import { ExistingToast } from '../types/Toast';
import { customElement, html, state, WithoutShadowRoot } from './WithoutShadowRoot';

@customElement('nd-toast-manger')
export class ToastManger extends WithoutShadowRoot {
	@state()
	toasts: ExistingToast[] = [{
		type: "error",
		message: "something went wrong",
		id: Date.now().toString()
	}]

	connectedCallback() {
		super.connectedCallback()
		document.addEventListener('show-toast', this.showToast);
		document.addEventListener('close-toast', this.closeToast);
	}

	private showToast = () => {
		const toast: ExistingToast = {
			type: "error",
			message: "something went wrong",
			id: Date.now().toString()
		}
		this.toasts = [...this.toasts, toast]
	}

	private closeToast = (e: CustomEventMap["close-toast"]) => {
		this.toasts = this.toasts.filter((t) => t.id !== e.detail)
	}

	disconnectedCallback(): void {
		super.disconnectedCallback()
		document.removeEventListener('show-toast', this.showToast);
		document.removeEventListener('close-toast', this.closeToast);
	}
	render() {
		return html`
			${this.toasts.map((toast) => html`<nd-toast message=${toast.message} toastId=${toast.id}></nd-toast>`)}
		`;
	}
}