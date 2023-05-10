import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SearchContainer from "./components/Search/SearchContainer";
import WeatherContainer from "./components/Weather/WeatherContainer";
import WeatherContextProvider from "./context/WeatherContext";

import Loader from "./components/Loader/Loader";

function App() {
	let location = useLocation();

	return (
		<div className="App">
			<WeatherContextProvider>
				<TransitionGroup>
					<CSSTransition key={location.key} classNames="fade" timeout={2000}>
						<Routes location={location}>
							<Route path="/" element={<SearchContainer />}></Route>
							<Route path="/weather" element={<WeatherContainer />}></Route>
							<Route path="/loader" element={<Loader />}></Route>
						</Routes>
					</CSSTransition>
				</TransitionGroup>
			</WeatherContextProvider>
			<img src="https://i.imgur.com/tmZ2MWV.jpeg" alt="" className="bg" />
		</div>
	);
}

export default App;
