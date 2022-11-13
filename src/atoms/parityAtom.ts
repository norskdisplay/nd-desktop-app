import { atom } from 'jotai'
import { ParityType } from '../sharedTypes/comConfig'

export const parityAtom = atom<ParityType>("none")