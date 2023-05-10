import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { getCurrentWeather } from "../../js/apiFunctions";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const Weather = () => {
	const { weather } = useContext(WeatherContext);
	const [weatherData, setWeatherData] = useState();

	useEffect(() => {
		getCurrentWeather(weather.locationUrl).then(
			(res) => res && setWeatherData(res)
		);
	}, []);

	const [temp, setTemp] = useState("c");

	const tempBtn = (e) => {
		const btns = document.querySelectorAll(".tempBtn");
		btns.forEach((b) => {
			b.classList.remove("active");
		});

		e.target.classList.add("active");

		let typeOfTemp = e.target.innerText[1];
		typeOfTemp === "C" ? setTemp("c") : setTemp("f");
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

	if (!weatherData) {
		return <Loader />;
	}

	return (
		<div className="weatherContainer">
			{weatherData && (
				<div className="weatherCard">
					<div className="head">
						<Link to="/" className="resetStyles">
							<i className="fa-solid fa-backward"></i>
						</Link>
						<div className="title">
							<h1>
								{weatherData.location.name}
								<span>
									{" ("}
									{weatherData.location.region}, {weatherData.location.country}
									{")"}
								</span>
							</h1>
							<h2>{getDate(weatherData.location.localtime_epoch)}</h2>
						</div>
					</div>

					<div className="separator"></div>

					<div className="temp">
						<div className="numb">
							<img src={`${weatherData.current.condition.icon}`} alt="" />
							<div className="btns">
								<h3>{Math.round(weatherData.current[`temp_${temp}`])}</h3>
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

					<div className="forecastContainer">
						{weatherData.forecast.forecastday.map((day) => {
							return (
								<div className="day">
									<h4>
										{(() => {
											const date = new Date(day.date);
											const dayOfWeek = date
												.toLocaleString("en-us", { weekday: "short" })
												.slice(0, 3);

											return dayOfWeek;
										})()}
									</h4>
									<img src={day.day.condition.icon} alt="" />
									<span>
										{Math.round(day.day[`maxtemp_${temp}`])}
										<p>mx</p>
										{Math.round(day.day[`mintemp_${temp}`])}
										<p>mn</p>
									</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default Weather;
