import { Paper } from "@mui/material"
import { DisplayListView } from "./DisplayListView"
import { useAtomValue } from "jotai"
import { displayConfigListAtom } from "../atoms"

export const DisplayList = () => {
    const displayConfigList = useAtomValue(displayConfigListAtom)
    return (
        <ul className="display-list">
            {displayConfigList.map((x: any, index: number) => (
                <Paper key={x.name}>
                    <DisplayListView {...x} number={index + 1} key={x.name} />
                </Paper>
            ))}
        </ul>
    )
}