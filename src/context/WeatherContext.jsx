import React, { createContext, useEffect, useState } from "react";

export const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
	const [weather, setWeather] = useState({});

	useEffect(() => {
		console.log(weather);
	}, [weather]);

	let data = {
		weather,
		setWeather,
	};

	return (
		<WeatherContext.Provider value={data}>{children}</WeatherContext.Provider>
	);
};

export default WeatherContextProvider;
