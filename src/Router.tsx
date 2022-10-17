import CircularProgress from "@mui/material/CircularProgress";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Debug } from "./pages/Debug";
import { HelpText } from "./pages/HelpText";
import { Home } from "./pages/Home";
import { NoMatch } from "./pages/NoMatch";
import { Settings } from "./pages/Settings";
import { useUpdatedConfig } from "./utils/useUpdatedConfig";

export const Router = () => {
	const isLoadingConfig = useUpdatedConfig();

	if (isLoadingConfig) return <CircularProgress color="secondary" />
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="index.html" element={<Home />} />
				<Route path="helptext" element={<HelpText />} />
				<Route path="debug" element={<Debug />} />
				<Route path="settings" element={<Settings />} />
				<Route path="*" element={<NoMatch />} />
			</Route>
		</Routes>
	)
}