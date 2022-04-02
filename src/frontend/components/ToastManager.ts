import { ExistingToast } from '../types/Toast';
import { customElement, html, state, StyledBase } from './StyledBase';

@customElement('nd-toast-manager')
export class ToastManger extends StyledBase {
	@state()
	toasts: ExistingToast[] = []

	intervalRef: NodeJS.Timeout | null = null

	connectedCallback() {
		super.connectedCallback()
		document.addEventListener('show-toast', this.showToast);
		document.addEventListener('close-toast', this.closeToast);
		this.watchClose();
	}

	private watchClose() {
		const closeAfter = 10000
		this.intervalRef = setInterval(() => {
			this.toasts = this.toasts.filter((t) => t.autoclose ? (t.created + closeAfter) > Date.now() : true)
		}, 1000)
	}

	private showToast = (e: ShowToastEvent) => {
		const toast: ExistingToast = {
			id: Date.now().toString(),
			autoclose: true,
			created: Date.now(),
			...e.detail,
		}
		this.toasts = [...this.toasts, toast]
	}

	private closeToast = (e: CloseToastEvent) => {
		this.toasts = this.toasts.filter((t) => t.id !== e.detail)
	}

	disconnectedCallback(): void {
		super.disconnectedCallback()
		document.removeEventListener('show-toast', this.showToast);
		document.removeEventListener('close-toast', this.closeToast);
		if (this.intervalRef) window.clearInterval(this.intervalRef)
	}
	render() {
		return html`
			<div class="fixed bottom-1 right-1 z-50">
				${this.toasts.map((toast) => html`<nd-toast message=${toast.message} toastId=${toast.id} type=${toast.type}></nd-toast>`)}
			</div>
		`;
	}
}