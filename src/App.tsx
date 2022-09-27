import { Layout } from './components/Layout';
import {
	Routes,
	Route
} from "react-router-dom";
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { NoMatch } from './pages/NoMatch';
import { Provider } from "jotai";

function App() {
	return (
		<Provider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="settings" element={<Settings />} />
					<Route path="*" element={<NoMatch />} />
				</Route>
			</Routes>
		</Provider>
	);
}

export default App;
