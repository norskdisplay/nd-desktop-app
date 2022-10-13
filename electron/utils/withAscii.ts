export const withAscii = (str: string) => {
	// eslint-disable-next-line no-octal-escape
	return String.fromCharCode(2) + str + "\r".charCodeAt(0)
}
