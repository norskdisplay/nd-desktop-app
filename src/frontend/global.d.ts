import { ShowModalEventDetail, ShowToastEventDetail } from "./types/ShowToastEvetDetail";

export {};

declare global {
	type CloseToastEvent = CustomEvent<string>
	type ShowToastEvent = CustomEvent<ShowToastEventDetail>
	type ShowModalEvent = CustomEvent<ShowModalEventDetail>

	interface CustomEventMap {
		"close-toast": CloseToastEvent
		"show-toast": ShowToastEvent
		"show-modal": ShowModalEvent
	}

    interface Document { //adds definition to Document, but you can do the same with HTMLElement
        addEventListener<K extends keyof CustomEventMap>(type: K, listener: (this: Document, ev: CustomEventMap[K]) => void): void;
		removeEventListener<K extends keyof CustomEventMap>(type: K, listener: (this: Document, ev: CustomEventMap[K]) => void): void;
    }
}