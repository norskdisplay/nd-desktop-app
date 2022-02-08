function isElement(o: any){
	return (
		typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
		o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
	);
}

export const isHTMLElement = (e: unknown): e is HTMLElement => e !== undefined && e !== null && isElement(e)
export const isHTMLInputElement = (e: unknown): e is HTMLInputElement => isHTMLElement(e) && "value" in e