import { Router } from './Router';
import { Provider } from 'jotai';

function App() {
	return (
		<Provider>
			<Router/>
		</Provider>
	);
}

export default App;
