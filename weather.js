const APIKEY = '3d9e5059943c355e05df6f5850ac47d3';

const getWeather = async (longitude, latitude) => {
	const base = 'https://api.openweathermap.org/data/2.5/weather';
	const query = `?lat=${latitude}&lon=${longitude}&units=metric&APPID=${APIKEY}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data;
};

const getForecast = async (longitude, latitude) => {
	const base = 'https://api.openweathermap.org/data/2.5/forecast';
	const query = `?lat=${latitude}&lon=${longitude}&units=metric&cnt=${40}&APPID=${APIKEY}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data;
};

const displayCurrentWeather = (weather, forecast) => {
	const currentWeather = document.querySelector('.weather-details-current');
	const sunrise = convertUnixToTime(weather.sys.sunrise, weather.timezone);
	const sunriseUtcSuffix =
		sunrise.timezoneOffset >= 0 ? '+' : `-${sunrise.timezoneOffset * -1}`;
	const sunset = convertUnixToTime(weather.sys.sunset, weather.timezone);
	const sunsetUtcSuffix =
		sunset.timezoneOffset >= 0 ? '+' : `-${sunset.timezoneOffset * -1}`;

	// Update current weather
	currentWeather.innerHTML = `
	<p class="current-temperature">${Math.floor(weather.main.temp)} &deg;C</p>
	<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">
	<p class="location">${weather.name}, ${weather.sys.country}</p>
	<p class="overall-weather">${capitalize(weather.weather[0].description)}</p>
	<p class="sunrise-sunset">Sunrise<span>${
		sunrise.utcTime
	} UTC${sunriseUtcSuffix}</span></p>
	<p class="sunrise-sunset">Sunset<span>${
		sunrise.utcTime
	} UTC${sunsetUtcSuffix}</span></p>
	
	<div class="statistics">
		<div>
			<p class="parameter-heading">Humidity</p>
			<p>${weather.main.humidity}%</p>
		</div>
		<div>
			<p class="parameter-heading">Pressure</p>
			<p>${weather.main.pressure} hPa</p>
		</div>
		<div>
			<p class="parameter-heading">Temp	(min)</p>
			<p>${Math.floor(weather.main.temp_min)} &deg;C</p>
		</div>
		<div>
			<p class="parameter-heading">Temp (max)</sup></p>
			<p>${Math.floor(weather.main.temp_max)} &deg;C</p>
		</div>
		<div>
			<p class="parameter-heading">Wind</p>
			<p>${weather.wind.deg}&deg; @ ${weather.wind.speed} m/s</p>
		</div>
	</div>
	`;
};

const displayCurrentForecast = forecast => {
	const forecastWeatherList = document.querySelector('#forecast-list');

	// Filtering out one forcast out of six, per day.
	const filteredForecast = forecast.list.filter(item => {
		return convertUnixToTime(item.dt) === '13:00';
	});

	console.log('FilteredItems', filteredForecast);

	// Reset forecast weather
	forecastWeatherList.innerHTML = '';

	// Update forecast weather
	filteredForecast.forEach(item => {
		forecastWeatherList.innerHTML += `
		<li>
			<div class="forecast-day">${convertUnixToDay(item.dt)}</div>
			<div>
				<img class="icon" src="https://openweathermap.org/img/wn/${
					item.weather[0].icon
				}@2x.png" alt="Weather icon">&nbsp;
			</div>
			<div class="forecast-day">${Math.floor(item.main.temp)} &deg;C</div>
		</li>`;
	});
};
