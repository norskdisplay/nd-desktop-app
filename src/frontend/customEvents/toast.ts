import { ShowModalEventDetail, ShowToastEventDetail } from './../types/ShowToastEvetDetail';

export const closeToastEvent = (toastId: string): CloseToastEvent => new CustomEvent('close-toast', { detail: toastId })
export const showToastEvent = (arg: ShowToastEventDetail): ShowToastEvent => new CustomEvent("show-toast", { detail: arg })

export const showModalEvent = (arg: ShowModalEventDetail): ShowModalEvent => new CustomEvent("show-modal", { detail: arg })