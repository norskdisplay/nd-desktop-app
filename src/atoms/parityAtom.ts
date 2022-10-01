import { atom } from 'jotai'
import { ParityType } from '../sharedTypes/configSchema'

export const parityAtom = atom<ParityType>("none")