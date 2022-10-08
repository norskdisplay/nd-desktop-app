import { ComPortSelect } from "./ComPortSelect"
import { DataBitSelect } from "./DataBitSelect"
import { ParitySelect } from "./ParitySelect"
import { StopBitSelect } from "./StopBitSelect"

export const COMFormSection = () => {
	return (
		<>
			<ComPortSelect />
			<ParitySelect />
			<StopBitSelect />
			<DataBitSelect />
		</>
	)
}