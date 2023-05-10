import axios from "axios";

const key = process.env.REACT_APP_API_KEY;
const url = "http://api.weatherapi.com/v1";

export const getCurrentWeather = async (location) => {
	if (location) {
		try {
			const res = await axios.get(
				`${url}/forecast.json?key=${key}&q=${location}&days=6&aqi=no&alerts=no&hour=25`
			);
			return res.data;
		} catch (error) {
			console.error("Error al obtener la información del clima:", error);
		}
	}
};

export const getAutocomplete = async (input) => {
	if (input !== "") {
		const res = await axios.get(
			`https://api.weatherapi.com/v1/search.json?key=${key}&q=${input}`
		);
		return res.data;
	} else return null;
};
