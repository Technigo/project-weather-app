const weatherContainer = document.querySelector('.weather-app');
const error = document.querySelector('.error');

const convertUnixToTime = (time, timezone) => {
	let timezoneOffset = timezone / 3600;
	// console.log(timezoneOffset);
	let convertedTime = moment.unix(time);
	// return moment(convertedTime).format('kk:ss');
	return {
		utcTime: moment(convertedTime).format('kk:ss'),
		timezoneOffset: timezoneOffset
	};
};

const convertUnixToDay = time => {
	let convertedTime = moment.unix(time);
	// console.log(convertedTime);
	return moment(convertedTime).format('dddd');
};

const capitalize = s => {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
};

const updateCity = async (longitude, latitude, formattedAddress) => {
	const weather = await getWeather(longitude, latitude);
	const forecast = await getForecast(longitude, latitude);

	weather.displayName = formattedAddress;
	weather.longitude = longitude;
	weather.latitude = latitude;

	return {
		weather,
		forecast
	};
};

const updateUI = data => {
	const { weather, forecast } = data;

	displayCurrentWeather(weather, forecast);
	displayCurrentForecast(forecast);

	// Display weather details container
	if (weatherContainer.classList.contains('hide')) {
		weatherContainer.classList.remove('hide');
	}

	console.log(data);
};
