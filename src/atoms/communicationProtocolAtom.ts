import { atom } from 'jotai'
import { CommunicationProtocolType } from '../sharedTypes/configSchema'

export const communicationProtocolAtom = atom<CommunicationProtocolType>("COM")