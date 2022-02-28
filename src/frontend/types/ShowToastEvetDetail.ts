export interface ShowToastEventDetail {
	type: "success" | "warning" | "error"
	message: string
}

export interface ShowModalEventDetail {
	heading: string
	body: string
}