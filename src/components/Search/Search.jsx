import React, { useContext, useState } from "react";
import { getAutocomplete } from "../../js/apiFunctions";
import { WeatherContext } from "../../context/WeatherContext";
import { Link } from "react-router-dom";

const Search = () => {
	const { setWeather, weather } = useContext(WeatherContext);
	const [suggestions, setSuggestions] = useState([]);

	const handleChange = async (input) => {
		const value = input.target.value;
		const results = await getAutocomplete(value);
		setSuggestions(results);
	};

	const getLocation = (sug) => {
		setWeather({
			...weather,
			locationName: sug.name,
			locationUrl: sug.url,
			coords: `${sug.lon},${sug.lat}`,
		});
	};

	return (
		<div className="searchContainer">
			<div className="searchBarContainer">
				<h1>How's the Weather?</h1>
				<div className="inputContainer">
					<input
						type="text"
						placeholder="Search for a location"
						onChange={handleChange}
					/>
					{suggestions && (
						<ul className="suggestions">
							{suggestions.map((suggestion) => (
								<Link
									key={suggestion.id}
									to="/weather"
									className="resetStyles sugg"
								>
									<li
										onClick={() => getLocation(suggestion)}
									>{`${suggestion.name}, ${suggestion.region}, ${suggestion.country}`}</li>
								</Link>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default Search;
