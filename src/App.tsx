import { Layout } from './components/Layout';
import {
	Routes,
	Route
} from "react-router-dom";
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { NoMatch } from './pages/NoMatch';
import { useAtom } from "jotai";
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { configErrorAtom } from './atoms/configErrorAtom';

function App() {
	const [isConfigLoaded, setIsConfigLoaded] = useState(false);
	const [isConfigStatusLoaded, setIsConfigStatusLoaded] = useState(false);
	const [, setConfigError] = useAtom(configErrorAtom)

	const loadInitialData = () => {
		window.ipcRenderer.invoke('get-config').then((config) => {
			window.config = config
			setIsConfigLoaded(true)
		})
		window.ipcRenderer.invoke('get-config-status').then((status) => {
			window.configStatus = status
			setIsConfigStatusLoaded(true)
		})
	}

	useEffect(() => {
		loadInitialData()
	}, [])

	useEffect(() => {
		if (isConfigStatusLoaded && window.configStatus) {
			if (window.configStatus.type !== "success") {
				setConfigError(true)
			}
		}
	}, [isConfigStatusLoaded])

	if (!isConfigLoaded && !isConfigStatusLoaded) return <CircularProgress color="secondary" />
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="settings" element={<Settings />} />
				<Route path="*" element={<NoMatch />} />
			</Route>
		</Routes>
	);
}

export default App;
