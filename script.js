const API_KEY = 'e0b091865cb13799f8ef15c4fb40d2a9';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;
const API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;

const weatherApp = document.getElementById('weatherApp');
const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

fetch(API_URL)
	.then((res) => res.json())
	.then((data) => {
		const date = new Date(data.dt * 1000);
		const sunrise = new Date(data.sys.sunrise * 1000);
		const sunset = new Date(data.sys.sunset * 1000);
		const weatherTypes = data.weather[0].main
		weatherApp.innerHTML += `
			<p>${weatherTypes} | ${Math.round(data.main.temp * 10) / 10}&#176;</p>
			<p>sunrise ${sunrise.getHours()}:${sunrise.getMinutes()}</p>
			<p>sunset ${sunset.getHours()}:${sunset.getMinutes()}</p>
			`;
		console.log('data current', data);

			if (weatherTypes === "Clear") {
				weatherApp.innerHTML += `<p>Don't forget your umbrella! It's wet in Stockholm today!</p>`
			} else if (weatherTypes === "Cloudy") {
				weatherApp.innerHTML += `<p>Don't forget your umbrella! It's wet in Stockholm today!</p>`
			} else if (weatherTypes === "Cloudy") {
				weatherApp.innerHTML += `<p>Don't forget your umbrella! It's wet in Stockholm today!</p>`
			} 
		})
		
	.catch((error) => console.log('error', error));

fetch(API_URL_FORECAST)
	.then((res) => res.json())
	.then((data) => {
		const date = new Date(data.dt * 1000);
		const filteredForecast = data.list.filter((item) => item.dt_txt.includes('12:00'));
		console.log(filteredForecast);
		filteredForecast.slice(1).forEach((day) => {
			let weekDay = new Date(day.dt * 1000);
			weekDay = weekDay.getDay();
			weatherApp.innerHTML += `<p>${weekDays[weekDay]} ${Math.round(day.main.temp * 10) / 10}&#176;</p>`;
		});

		console.log('data forecast', data);
	})
	.catch((error) => console.log('error', error));
	