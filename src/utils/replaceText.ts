const getDayName = (d: Date) => d.toLocaleDateString(undefined, { weekday: 'long' })
const getMonthName = (d: Date) => d.toLocaleDateString(undefined, { month: 'long' })

const getFullDate = (d: Date) => {
	return `${d.getFullYear()}//${d.getMonth() + 1}//${padded(d.getDate())} ${padded(d.getHours())}:${padded(d.getMinutes())}`
}

const padded = (input: string | number) => {
	if (typeof input === "string" && !input) return "";
	return ("0" + input).slice(-2);
}

export const includeMergeFields = (str: string) => {
	const date = new Date(Date.now())
	if (typeof str != "string") throw new Error("Argument is not of type string. Received " + typeof str)
	return str
	.replace("$$", "$")
	.replace("$full", getFullDate(date))
	.replace("$h", padded(date.getHours()))
	.replace("$s", padded(date.getSeconds()))
	.replace("$m", padded(date.getMinutes()))
	.replace("$Y", date.getFullYear().toString())
	.replace("$M", getMonthName(date))
	.replace("$D", getDayName(date))
}

export const replaceText = () => {
	return (str: string): string => includeMergeFields(str)
}