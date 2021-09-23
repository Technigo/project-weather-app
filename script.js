const API_KEY = 'e0b091865cb13799f8ef15c4fb40d2a9';
const API_URL_CURRENT = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;

const weatherApp = document.getElementById('weatherApp');
const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
// pre defining variable coordinates to be able to store coords from first fetch in to second fetch
const coordinates = {
	lat: '',
	lon: '',
};

// run api fetch for current weather
fetch(API_URL_CURRENT)
	.then((res) => res.json())
	.then((data) => {
		// stores lat and lon from current weather fetch in to coordinates object
		coordinates.lat = data.coord.lat;
		coordinates.lon = data.coord.lon;

		const sunrise = new Date(data.sys.sunrise * 1000);
		const sunset = new Date(data.sys.sunset * 1000);
		const weatherTypes = data.weather[0].main;
		// put current weather in html
		weatherApp.innerHTML += `
			<section class="top-site">
        <p class="top-text">${weatherTypes.toLowerCase()} | ${Math.round(data.main.temp * 10) / 10}&#176;</p>
        <p class="top-text">sunrise ${sunrise.getHours() < 10 ? '0' + sunrise.getHours() : sunrise.getHours()}.${sunrise.getMinutes()}</p>
        <p class="top-text">sunset ${sunset.getHours()}.${sunset.getMinutes()}</p>
			</section>`;
		console.log('data current', data);
		// generate description text based on weather type
		if (weatherTypes === 'Clear') {
			weatherApp.innerHTML += `<img class="icon" src="./Designs/Design-2/icons/noun_Sunglasses_2055147.svg"><h2 class="description">Get your sunnies on. Stockholm is looking rather great today.</h2>`;
			weatherApp.style.color = '#2A5510';
			weatherApp.parentNode.style.backgroundColor = '#F7E9B9';
		} else if (weatherTypes === 'Clouds') {
			weatherApp.innerHTML += `<img class="icon" src="./Designs/Design-2/icons/noun_Cloud_1188486.svg"><h2 class="description">Light a fire and get cosy. Stockholm is looking grey today.</h2>`;
			weatherApp.style.color = '#F47775';
			weatherApp.parentNode.style.backgroundColor = '#F4F7F8';
		} else if (weatherTypes === 'Rain') {
			weatherApp.innerHTML += `<img class="icon" src="./Designs/Design-2/icons/noun_Umbrella_2030530.svg"><h2 class="description">Don't forget your umbrella! It's wet in Stockholm today!</h2>`;
			weatherApp.style.color = '#164A68';
			weatherApp.parentNode.style.backgroundColor = '#A3DEF7';
		}
	})
	.then(() => {
		// building the api url from coordinates from previous fetch
		// needs to be in then() from previous fetch to be able to get coordinate data from that fetch in correct time
		const API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly&units=metric&appid=${API_KEY}`;
		// run api fetch for weather forecast
		fetch(API_URL_FORECAST)
			.then((res) => res.json())
			.then((data) => {
				console.log('data forecast', data);
				// remove todays weather from forecast and put in html
				data.daily.slice(1).forEach((day) => {
					let weekDay = new Date(day.dt * 1000);
					weekDay = weekDay.getDay();
					weatherApp.innerHTML += `
            <section class="forecast">
              <p class="forecast-day">${weekDays[weekDay]}</p>
              <p class="forecast-temp"> ${Math.round(day.temp.day * 1) / 1}&#176;</p>
            </section>
          `;
				});
			})
			.catch((error) => console.log('error', error));
	})
	.catch((error) => console.log('error', error));
