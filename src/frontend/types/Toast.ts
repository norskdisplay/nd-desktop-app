export interface NewToast  {
	type: "error" | "warning" | "success",
	message: string
	autoclose?: boolean
}

export interface ExistingToast extends NewToast {
	id: string
	autoclose: boolean
	created: number
}