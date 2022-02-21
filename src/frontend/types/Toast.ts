export interface NewToast  {
	type: "error" | "warning" | "success",
	message: string
}

export interface ExistingToast extends NewToast {
	id: string
}