export const withAscii = (str: string, group = 0, unit = 0) => {
	return String.fromCharCode(2) + String.fromCharCode(1) + String.fromCharCode(group) + String.fromCharCode(unit) + String.fromCharCode(2) + str + String.fromCharCode(13)
}
