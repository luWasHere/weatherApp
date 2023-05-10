import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { getCurrentWeather, getForecast } from "../../js/apiFunctions";
import { wait } from "@testing-library/user-event/dist/utils";
import { waitFor } from "@testing-library/react";
import { Link } from "react-router-dom";

const Weather = () => {
	const { weather } = useContext(WeatherContext);
	const [weatherData, setWeatherData] = useState();
	const [forecastData, setForecastData] = useState();

	useEffect(() => {
		getCurrentWeather(weather.locationUrl).then(
			(res) => res && setWeatherData(res)
		);
		getForecast(weather.locationUrl).then((res) => res && setForecastData(res));
	}, []);

	const [temp, setTemp] = useState(null);

	const tempBtn = (e) => {
		const btns = document.querySelectorAll(".tempBtn");
		btns.forEach((b) => {
			b.classList.remove("active");
		});

		e.target.classList.add("active");

		let typeOfTemp = e.target.innerText[1];
		typeOfTemp === "C"
			? setTemp(Math.round(weatherData.current.temp_c))
			: setTemp(Math.round(weatherData.current.temp_f));
	};

	const getDate = (date) => {
		const res = new Date(date * 1000);
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		const dateString = res.toLocaleString("en-US", options);

		return dateString;
	};

	return (
		<div className="weatherContainer">
			{weatherData && (
				<div className="weatherCard">
					<div className="head">
						<Link to="/" className="resetStyles">
							<i className="fa-solid fa-backward"></i>
						</Link>
						<div className="title">
							<h1>Buenos Aires, Argentina.</h1>
							<h2>{getDate(weatherData.location.localtime_epoch)}</h2>
						</div>
					</div>

					<div className="separator"></div>

					<div className="temp">
						<div className="numb">
							<img src={`${weatherData.current.condition.icon}`} alt="" />
							<div className="btns">
								<h3>{temp ? temp : Math.round(weatherData.current.temp_c)}</h3>
								<span className="tempBtn active" onClick={tempBtn}>
									°C
								</span>
								<span>||</span>
								<span className="tempBtn" onClick={tempBtn}>
									°F
								</span>
							</div>
						</div>
						<p>
							{`${weatherData.current.condition.text}`}
							<br />
							Humidity: {weatherData.current.humidity}%
							<br />
							Wind speed: {weatherData.current.wind_kph}km/h
						</p>
					</div>

					<div className="forecast">
						{forecastData && (
							<div>
								<div></div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Weather;
