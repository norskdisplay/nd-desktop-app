export const throwIfItReachesHere = (message: string, v: never) => {
	throw new Error(message)
}