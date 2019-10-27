const weatherContainer = document.querySelector('.weather-details');
const currentWeather = document.querySelector('.weather-details-current');
const forecastWeatherList = document.querySelector('#forecast-list');
const error = document.querySelector('.error');

const updateCity = async city => {
	const weather = await getWeather(city);
	const forecast = await getForecast(city);

	return {
		weather,
		forecast
	};
};

const convertTime = time => {
	let convertedTime = moment.unix(time);
	return moment(convertedTime).format('kk:ss');
};

const displayError = err => {
	if (err) {
		error.innerHTML = 'No such city. Please try again.';
		if (error.classList.contains('hide')) {
			error.classList.remove('hide');
		}
	}
};

const updateUI = data => {
	const { weather, forecast } = data;

	// Hide error message and weather details container
	if (!error.classList.contains('hide')) {
		error.classList.add('hide');
		weatherContainer.classList.add('hide');
	}

	// Update current weather
	currentWeather.innerHTML = `
		<p>Todays weather in:</p>
		<p>${weather.name}</p>
		<p>${
			weather.main.temp
		} &#8451; ${weather.weather[0].description.toUpperCase()}</p>
		<p>Sunrise: ${convertTime(weather.sys.sunrise)}</p>
		<p>Sunset: ${convertTime(weather.sys.sunset)}</p>
	`;

	// Update forecast weather¨
	// forecastWeather.innerHTML = ``;

	// Display weather details container
	if (weatherContainer.classList.contains('hide')) {
		weatherContainer.classList.remove('hide');
	}

	console.log(data);
};
