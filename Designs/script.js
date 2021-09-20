const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e0b091865cb13799f8ef15c4fb40d2a9';
const weatherApp = document.getElementById('weatherApp');

fetch(API_URL)
	.then((res) => res.json())
	.then((data) => console.log('data', data))
	.catch((error) => console.log('error', error));
