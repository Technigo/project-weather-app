const API_KEY = 'e0b091865cb13799f8ef15c4fb40d2a9';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;
const API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;

const weatherApp = document.getElementById('weatherApp');
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

fetch(API_URL)
	.then((res) => res.json())
	.then((data) => {
		const date = new Date(data.dt * 1000);
		weatherApp.innerHTML += `
			<p>Current date: ${date}</p>
			<p>Current location: ${data.name}</p>
			<p>Todays temperature: ${Math.round(data.main.temp * 10) / 10}</p>
			<p>Todays weather: ${data.weather[0].description}</p>
			`;
		console.log('data', data);

		// data.daily.slice(1).forEach((day) => {
		// 	let weekDay = new Date(day.dt * 1000);
		// 	weekDay = weekDay.getDay();
		// 	weatherApp.innerHTML += `<p>${weekDays[weekDay]} ${weekDay} 🌈${day.temp.day}</p>`;
		// });
	})
	.catch((error) => console.log('error', error));

fetch(API_URL_FORECAST)
	.then((res) => res.json())
	.then((data) => {
		const date = new Date(data.dt * 1000);
		const filteredForecast = data.list.filter((item) => item.dt_txt.includes('12:00'));
		console.log(filteredForecast);
		filteredForecast.forEach((day) => {
			let weekDay = new Date(day.dt * 1000);
			weekDay = weekDay.getDay();
			weatherApp.innerHTML += `<p>${weekDays[weekDay]} 🌈${Math.round(day.main.temp * 10) / 10}</p>`;
		});

		// weatherApp.innerHTML += `
		// <p>Current date: ${date}</p>
		// <p>Current location: ${data.name}</p>
		// <p>Todays temperature: ${Math.round(data.main.temp * 10) / 10}</p>
		// <p>Todays weather: ${data.weather[0].description}</p>
		// `;

		console.log('data', data);
	})
	.catch((error) => console.log('error', error));
