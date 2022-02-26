const cityOptions= document.getElementById('city');
const headerMessage = document.getElementById('currentWeatherHeader');
const url = {
	stockholm: 'https://api.openweathermap.org/data/2.5/onecall?lat=59.33&lon=18.06&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d',
	seattle: 'https://api.openweathermap.org/data/2.5/onecall?lat=47.60&lon=-122.33&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d',
	bangkok: 'https://api.openweathermap.org/data/2.5/onecall?lat=13.73&lon=100.31&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d',
	toronto: 'https://api.openweathermap.org/data/2.5/onecall?lat=43.65&lon=-79.34&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d',
};

cityOptions.addEventListener('change', () => { 
	headerMessage.style.animation = "none";
	headerMessage.offsetHeight; /*trigger reflow*/
	headerMessage.style.animation = null;

	fetcher (url[cityOptions.value.toLowerCase()], ((data) => {
		updateCurrentWeatherDisplay(formatCurrentWeather(data));
		updateForecastDisplay(formatForecast(data));
	}));
}); 

const fetcher= (url, callback) => {
	fetch(url)
	.then((result) => {
		return result.json()
	})
	.then((data) => {
		callback(data);
	})
	.catch((error) => {
		console.log(error);
	});
}

const formatCurrentWeather = (data) => {

	let currentWeather = {
		condition: 'string',
		temp: '0°',
		sunrise: '00:00',
		sunset: '00:00',
	};

	currentWeather.condition = data.current.weather[0].main;
	currentWeather.temp = Math.round(data.current.temp) + "°"; // rounds to nearest integer

	let sunrise = new Date(data.current.sunrise * 1000); // converts unix timestamp to milliseconds
	let sunset = new Date(data.current.sunset * 1000); // converts unix timestamp to milliseconds
	currentWeather.sunrise = sunrise.toLocaleString("en-SE", {hour: "numeric", minute: "numeric", timeZone: data.timezone}); // displays HH:MM in the correct timezone
	currentWeather.sunset = sunset.toLocaleString("en-SE", {hour: "numeric", minute: "numeric", timeZone: data.timezone}); // displays HH:MM in the correct timezone

	return currentWeather;
};

const formatForecast = (data) => {

	let forecast = [];

	data.daily.forEach((day) => {
		let dailyForecast = {
				dayOfWeek: new Date(day.dt * 1000).toLocaleDateString("en-SE", {weekday: 'long'}), // converts number to english name
				lowTemp: Math.round(day.temp.min) + "°", // rounds to nearest integer
				highTemp: Math.round(day.temp.max) + "°", // rounds to nearest integer
		};
		forecast.push(dailyForecast) // adds object for each day to the forecast array
	});

	return forecast;
};

const updateCurrentWeatherDisplay = (currentWeather) => {
	
	const iconCloud = document.getElementById('iconCloud');
	const iconUmbrella = document.getElementById('iconUmbrella');
	const iconGlasses = document.getElementById('iconSunglasses');

	document.getElementById('welcome').style.display = 'none';
	iconGlasses.style.display = 'none';
	iconUmbrella.style.display = 'none';
	iconCloud.style.display = 'none';
	
	document.getElementById('currentWeatherCondition').innerHTML = `${currentWeather.condition} | ${currentWeather.temp}`;
	document.getElementById('currentWeatherSunrise').innerHTML = `sunrise ${currentWeather.sunrise}`;
	document.getElementById('currentWeatherSunset').innerHTML = `sunset ${currentWeather.sunset}`;

	if (currentWeather.condition === 'Clouds') {
		iconCloud.style.display = 'block';
		document.body.style.backgroundColor = "#F4F7F8";
		document.body.style.color = "#F47775";
		headerMessage.innerText = `Get cosy. ${cityOptions.value} is looking grey today.`;
	} else if (currentWeather.condition === 'Rain') {
		iconUmbrella.style.display = 'block';
		document.body.style.backgroundColor = "#A3DEF7";
		document.body.style.color = "#164A68";
		headerMessage.innerText = `Don't forget your umbrella. It's wet in ${cityOptions.value} today.`;
	} else if (currentWeather.condition === 'Clear'){
		iconGlasses.style.display = 'block';
		document.body.style.backgroundColor = "#F7E9B9";
		document.body.style.color = "#2A5510";
		headerMessage.innerText = `Get your sunnies on. ${cityOptions.value} is looking rather great today.`;
	} else {
		document.body.style.backgroundColor = "#CFC2CF";
		document.body.style.color = "#000000";
		headerMessage.innerText = `${cityOptions.value} has unpredictable weather in the forecast today!`;
	};
}

const updateForecastDisplay = (forecast) => {

	const forecastWrapper = document.getElementById('forecastWrapper');

	forecastWrapper.innerHTML = '';
	forecast.slice(1,8).forEach((day) => {
		forecastWrapper.innerHTML += `
		<div class="forecast-wrapper">
		<div class="row">
				<p>${day.dayOfWeek}</p>
				<p>${day.highTemp}</p>
				</div>
		</div>
	`});
}