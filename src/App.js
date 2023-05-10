import { Route, Routes, BrowserRouter } from "react-router-dom";
import SearchContainer from "./components/Search/SearchContainer";
import WeatherContainer from "./components/Weather/WeatherContainer";
import WeatherContextProvider from "./context/WeatherContext";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<WeatherContextProvider>
					<Routes>
						<Route path="/" element={<SearchContainer />}></Route>
						<Route path="/weather" element={<WeatherContainer />}></Route>
					</Routes>
				</WeatherContextProvider>
				<img src="https://i.imgur.com/tmZ2MWV.jpeg" alt="" className="bg" />
			</BrowserRouter>
		</div>
	);
}

export default App;
