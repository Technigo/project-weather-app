const weatherContainer = document.querySelector('.weather-app');
const infoMessage = document.getElementById('info-message');

// Convert timestamp to "Time"
const convertUnixToTime = (time, timezone) => {
	let convertedTime = moment.unix(time);
	return moment(convertedTime).format('kk:ss');
};

// Convert timestamp to "Day"
const convertUnixToDay = time => {
	let convertedTime = moment.unix(time);
	return moment(convertedTime).format('dddd');
};

// Convert timestamp to "Date"
const convertUnixToDate = time => {
	let convertedTime = moment.unix(time);
	return moment(convertedTime).format('YYYY-MM-DD');
};

// Convert timestamp to "Date and time"
const convertUnixToDateTime = time => {
	let convertedTime = moment.unix(time);
	return moment(convertedTime);
};

// Capitalize first letter in string
const capitalize = s => {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
};

// Update city calls weather and forecast functions
const updateCity = async (longitude, latitude, formattedAddress) => {
	const weather = await getWeather(longitude, latitude);
	const forecast = await getForecast(longitude, latitude);

	// Adding some additional information to the weather object
	weather.displayName = formattedAddress;
	weather.longitude = longitude;
	weather.latitude = latitude;

	// Returning weather and forecast object
	return {
		weather,
		forecast
	};
};

// Geerates and presents the weather and forecast information in the UI
const updateUI = data => {
	const { weather, forecast } = data;
	displayForecastEvery3Hours(weather, forecast);
	displayCurrentWeather(weather);
	displayCurrentForecast(forecast);

	// Display weather details container
	if (weatherContainer.classList.contains('hide')) {
		weatherContainer.classList.remove('hide');
		infoMessage.classList.add('hide');
	}
};
