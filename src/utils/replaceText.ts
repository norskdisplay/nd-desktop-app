const getDayName = (d: Date) => d.toLocaleDateString(undefined, { weekday: 'long' })
const getMonthName = (d: Date) => d.toLocaleDateString(undefined, { month: 'long' })

const getFullDate = (d: Date) => {
	return `${d.getFullYear()}//${d.getMonth() + 1}//${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
}

export const replaceText = () => {
	const cachedNow = new Date(Date.now())
	return (str: string): string => str
		.replace("$$", "$")
		.replace("$h", getFullDate(cachedNow))
		.replace("$s", cachedNow.getSeconds().toString())
		.replace("$m", cachedNow.getMinutes().toString())
		.replace("$Y", cachedNow.getFullYear().toString())
		.replace("$M", getMonthName(cachedNow))
		.replace("$D", getDayName(cachedNow))
}