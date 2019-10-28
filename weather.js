const APIKEY = '3d9e5059943c355e05df6f5850ac47d3';

const getWeather = async city => {
	const base = 'https://api.openweathermap.org/data/2.5/weather';
	const query = `?q=${city}&units=metric&APPID=${APIKEY}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data;
};

const getForecast = async city => {
	const base = 'https://api.openweathermap.org/data/2.5/forecast';
	const query = `?q=${city}&units=metric&cnt=${40}&APPID=${APIKEY}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data;
};
