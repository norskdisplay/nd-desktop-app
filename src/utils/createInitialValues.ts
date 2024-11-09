import { Atom } from "jotai"

export const createInitialValues = () => {
	const initialValues: Set<readonly [Atom<unknown>, unknown]> = new Set();
	const get = () => initialValues
	const set = <Value>(anAtom: Atom<Value>, value: Value) => {
	initialValues.add([anAtom, value])

	}
	return { get, set }
}
