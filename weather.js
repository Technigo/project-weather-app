const APIKEY = '3d9e5059943c355e05df6f5850ac47d3';

const getWeather = async (longitude, latitude) => {
	const base = 'https://api.openweathermap.org/data/2.5/weather';
	const query = `?lat=${latitude}&lon=${longitude}&units=metric&APPID=${APIKEY}`;

	const response = await fetch(base + query);
	const data = await response.json();
	console.log('test');
	return data;
};

const getForecast = async (longitude, latitude) => {
	const base = 'https://api.openweathermap.org/data/2.5/forecast';
	const query = `?lat=${latitude}&lon=${longitude}&units=metric&cnt=${40}&APPID=${APIKEY}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data;
};

const displayCurrentWeather = weather => {
	const currentWeather = document.querySelector('.weather-details-current');
	let backgroundColor = '';

	// Change background colors based on current temperature
	if (weather.main.temp > 20) {
		backgroundColor = 'linear-gradient(to bottom right, #ffc500, #c21500)';
	} else if (weather.main.temp >= 10) {
		backgroundColor = 'linear-gradient(to bottom right, #dce35b, #247026)';
	} else {
		backgroundColor = 'linear-gradient(to bottom right, #1cb5e0, #000046)';
	}

	document.body.style.background = backgroundColor;

	// Update current weather template
	currentWeather.innerHTML = `
  <p class="current-temperature">${Math.floor(weather.main.temp)} &deg;C</p>
  <img src="https://openweathermap.org/img/wn/${
		weather.weather[0].icon
	}@2x.png" alt="weather condition">
  <p class="location">${weather.displayName}</p>
  <p class="overall-weather">${capitalize(weather.weather[0].description)}</p>
  <p class="sunrise-sunset">Sunrise<span>${convertUnixToTime(
		weather.sys.sunrise
	)}</span></p>
  <p class="sunrise-sunset">Sunset<span>${convertUnixToTime(
		weather.sys.sunset
	)}</span></p>
  
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
      <p class="parameter-heading">Temp. (min)</p>
      <p>${weather.main.temp_min.toFixed(1)} &deg;C</p>
    </div>
    <div>
      <p class="parameter-heading">Temp. (max)</sup></p>
      <p>${weather.main.temp_max.toFixed(1)} &deg;C</p>
    </div>
    <div>
      <p class="parameter-heading">Wind</p>
      <p>${weather.wind.deg}&deg; @ ${weather.wind.speed.toFixed(1)} m/s</p>
    </div>
  </div>
  `;
};

const displayForecast5days = forecast => {
	const forecastWeatherList = document.querySelector('#forecast-list');

	// Filtering out one forcast out of six, per day.
	const filteredForecast = forecast.list.filter(item => {
		return convertUnixToTime(item.dt) === '13:00';
	});

	// Reset 24-hour forecast template with headings before generating the forecast template
	forecastWeatherList.innerHTML = `
  <li>
    <div class="forecast-day-heading"></div>
    <div class="forecast-day-heading"></div>
    <div class="forecast-day-heading">Humidity</div>
    <div class="forecast-day-heading">Pressure</div>
    <div class="forecast-day-heading">Wind</div>
    <div class="forecast-day-heading">Temp.</div>
  </li>`;

	// Generate 5-day forecast weather
	filteredForecast.forEach(item => {
		forecastWeatherList.innerHTML += `
    <li>
      <div class="forecast-day">${convertUnixToDay(item.dt)}</div>
      <div>
        <img class="icon" src="https://openweathermap.org/img/wn/${
					item.weather[0].icon
				}@2x.png" alt="weather condition">
      </div>
      <div class="forecast-day">${item.main.humidity}%</div>
      <div class="forecast-day">${item.main.pressure} hPa</div>
      <div class="forecast-day">${
				item.wind.deg
			}&deg; @ ${item.wind.speed.toFixed(1)} m/s</div>
      <div class="forecast-day">${Math.floor(item.main.temp)} &deg;C</div>
    </li>`;
	});
};

const displayForecast24hours = (weather, forecast) => {
	const forecastDaily = document.querySelector('#daily-forecast-list');

	const currentForecastItems = forecast.list.filter(items => {
		return (
			convertUnixToDateTime(items.dt) <
			convertUnixToDateTime(weather.dt).add(1, 'days')
		);
	});

	// Reset 24-hour forecast template
	forecastDaily.innerHTML = ``;

	// Generate 24-hour forecast template
	currentForecastItems.forEach(item => {
		forecastDaily.innerHTML += `
      <li>
        <p>${convertUnixToTime(item.dt)}</p>
        <p>${Math.floor(item.main.temp)} &deg;C</p>
        <img class="icon" src="https://openweathermap.org/img/wn/${
					item.weather[0].icon
				}@2x.png" alt="weather condition">
      </li>
    `;
	});
};
