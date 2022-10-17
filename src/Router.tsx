import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { RouteGuard } from "./components/RouteGuard";
import { Debug } from "./pages/Debug";
import { HelpText } from "./pages/HelpText";
import { Home } from "./pages/Home";
import { NoMatch } from "./pages/NoMatch";
import { Settings } from "./pages/Settings";

export const Router = () => (
	<Routes>
		<Route path="/" element={<RouteGuard />}>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="index.html" element={<Home />} />
				<Route path="helptext" element={<HelpText />} />
				<Route path="debug" element={<Debug />} />
				<Route path="settings" element={<Settings />} />
				<Route path="*" element={<NoMatch />} />
			</Route>
		</Route>
	</Routes>
)