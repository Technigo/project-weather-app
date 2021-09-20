const API_URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=59.3326&lon=18.0649&exclude=minutely&units=metric&appid=e0b091865cb13799f8ef15c4fb40d2a9'; //'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e0b091865cb13799f8ef15c4fb40d2a9';
const weatherApp = document.getElementById('weatherApp');
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

fetch(API_URL)
	.then((res) => res.json())
	.then((data) => {
		const date = new Date(data.current.dt * 1000);
		weatherApp.innerHTML += `<p>Current date: ${date}</p> <p>Current location ${data.timezone}</p> <p>Todays weather  ${data.current.temp} </p>`;
		console.log('data', data);

		data.daily.slice(1).forEach((day) => {
			let weekDay = new Date(day.dt * 1000);
			weekDay = weekDay.getDay();
			weatherApp.innerHTML += `<p>${weekDays[weekDay]} ${weekDay} 🌈${day.temp.day}</p>`;
		});
	})
	.catch((error) => console.log('error', error));
