const getDayName = (d: Date) => d.toLocaleDateString(undefined, { weekday: 'long' })
const getMonthName = (d: Date) => d.toLocaleDateString(undefined, { month: 'long' })

export const handleReplaceText = () => {
	const cachedNow = new Date(Date.now())
	return (str: string): string => str
		.replace("$$", "$")
		.replace("$h", cachedNow.getHours().toString())
		.replace("$s", cachedNow.getSeconds().toString())
		.replace("$m", cachedNow.getMinutes().toString())
		.replace("$Y", cachedNow.getFullYear().toString())
		.replace("$M", getMonthName(cachedNow))
		.replace("$D", getDayName(cachedNow))
}