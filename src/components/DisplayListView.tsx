import { Card, CardContent, TextField, Typography } from "@mui/material"
import { DisplayConfig } from "../sharedTypes/configSchema"
import { ChangeEvent } from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { displayConfigListAtom } from "../atoms"
import { PreviewDisplayText } from "./PreviewDisplayText"

export const DisplayListView = ({ name, description, number, id }: DisplayConfig & { number: number }) => {
    const setDisplayList = useSetAtom(displayConfigListAtom)
    const displayList = useAtomValue(displayConfigListAtom)
    function handleTextChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const display = displayList.find(x => x.id === id)
        if (!display) return
        display.description = event.target.value;
        setDisplayList([...displayList])
    }

    return (
        <Card sx={{ minWidth: 275, marginBottom: "1em" }}>
            <CardContent>
                <Typography sx={{ fontSize: 14, marginBottom: "1em", }} color="text.secondary" gutterBottom>
                {number} - {name}
                </Typography>
                <TextField
                    name="name"
                    label="Display text"
                    value={description}
                    onChange={handleTextChange}
                    variant="standard"
                    sx={{ marginBottom: "1em" }}
                    fullWidth={true} />
                {description &&
                    <PreviewDisplayText text={description} />
                }
            </CardContent>
        </Card>
    )
}