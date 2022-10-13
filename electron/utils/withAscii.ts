export const withAscii = (str: string) => {
	return String.fromCharCode(2) + str + String.fromCharCode(13)
}
