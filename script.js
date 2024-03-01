const weather = document.getElementById("weather");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const suggestion = document.getElementById("suggestion");
let riseHours
let riseMinutes
let setHours
let setMinutes
let currentStyle
let updateStyle

const API_URL = 'https://api.openweathermap.org/data/2.5/';
const today = 'weather'
const fiveDays = 'forecast'
const API_KEY = '881f27fa83654bcdd65f36b0a3aad2a0';
const area = 'Oslo,Norway';
const units = 'metric';
const lat = 59.911491
const long = 10.757933
const dailyForcast = `${API_URL}${today}?q=${area}&units=${units}&APPID=${API_KEY}`
const fiveDayForcast = `${API_URL}${fiveDays}?q=${area}&units=${units}&APPID=${API_KEY}`
const main = document.querySelector('main')




const fetchFiveDayForcast = () => {
	fetch(fiveDayForcast).then(response => {
		if (!response.ok) {
			throw new Error('HTTP error! Status:${response.status}');
		}
		return response.json();
	}
	).then(data => {
		console.log(data)
	}
	).catch(error => {
		console.error('Error: ', error.message);
	}
	)
}
fetchFiveDayForcast();

const fetchForcast = () => {
	fetch(dailyForcast).then(response => {
		if (!response.ok) {
			throw new Error('HTTP error! Status:${response.status}');
		}
		return response.json();
	}
	).then(data => {
		const rise = convertTime(data.sys.sunrise);
		const set = convertTime(data.sys.sunset);
		currentStyle = data.weather[0].main
		getStyles(currentStyle)
		main.classList.add(updateStyle)
		weather.innerHTML = `${data.weather[0].main}`
		temperature.innerHTML = `${data.main.temp}°`
		sunrise.innerHTML = rise
		sunset.innerHTML = set
		console.log(data)

	}
	).catch(error => {
		console.error('Error: ', error.message);
	}
	)
}

const convertTime = (time) => {
	const hour = Math.floor(time % 86400 / 3600) + 1
	const minute = Math.floor(time % 3600 / 60)
	return (`${hour}:${minute}`)
}

const getStyles = (currentStyle) => {
	switch (currentStyle) {
		case 'rain':
			console.log("its rain")
			updateStyle = 'rain';
			break;
		case 'Clouds':
			console.log("its cloudy")
			updateStyle = 'cloudy';
			console.log(updateStyle)
			break;
		case 'sunny':
			console.log("its sunny")
			updateStyle = 'sun';
			break;
		default:
			console.log("i dont get the weather")
	}
}


fetchForcast();

