const getDayName = (d: Date) => d.toLocaleDateString(undefined, { weekday: 'long' })
const getMonthName = (d: Date) => d.toLocaleDateString(undefined, { month: 'long' })

const getFullDate = (d: Date) => {
	return `${d.getFullYear()}//${d.getMonth() + 1}//${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
}

export const includeMergeFields = (str: string) => {
	const date = new Date(Date.now())
	if (typeof str != "string") throw new Error("Argument is not of type string. Received " + typeof str)
	return str
	.replace("$$", "$")
	.replace("$h", getFullDate(date))
	.replace("$s", date.getSeconds().toString())
	.replace("$m", date.getMinutes().toString())
	.replace("$Y", date.getFullYear().toString())
	.replace("$M", getMonthName(date))
	.replace("$D", getDayName(date))
}

export const replaceText = () => {
	return (str: string): string => includeMergeFields(str)
}