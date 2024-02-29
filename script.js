const weather = document.getElementById("weather");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const suggestion = document.getElementById("suggestion");
let riseHours
let riseMinutes
let setHours
let setMinutes


const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = '881f27fa83654bcdd65f36b0a3aad2a0';
const area = 'Oslo,Norway';
const units = 'metric';
const forcast = `${API_URL}q=${area}&units=${units}&APPID=${API_KEY}`


const fetchForcast = () => {
	fetch(forcast).then(response => {
		if (!response.ok) {
			throw new Error('HTTP error! Status:${response.status}');
		}
		return response.json();
	}
	).then(data => {
		const rise = convertTime(data.sys.sunrise);
		const set = convertTime(data.sys.sunset);
		weather.innerHTML = `${data.weather[0].main}`
		temperature.innerHTML = `${data.main.temp}°`
		sunrise.innerHTML = rise
		sunset.innerHTML = set
	}
	).catch(error => {
		console.error('Error: ', error.message);
	}
	)
}

fetchForcast();
const convertTime = (time) => {
	const hour = Math.floor(time % 86400 / 3600) + 1
	console.log(hour)
	const minute = Math.floor(time % 3600 / 60)
	console.log(minute)
	return (`${hour}:${minute}`)
}

convertTime();
