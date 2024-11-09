import { atom } from "jotai";
import { DisplayConfig } from "../sharedTypes/configSchema";

export const displayConfigListAtom = atom<DisplayConfig[]>([])
