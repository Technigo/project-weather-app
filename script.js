const weather = document.getElementById("weather")
const temperature = document.getElementById("temperature")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const suggestion = document.getElementById("suggestion")
const icon = document.getElementById("icon")
const forcast = document.querySelector("forcast")


const API_URL = 'https://api.openweathermap.org/data/2.5/'
const today = 'weather'
const fiveDays = 'forecast'
const API_KEY = '881f27fa83654bcdd65f36b0a3aad2a0'
const city = 'Oslo'
const country = 'Norway'
const units = 'metric'
const dailyForcast = `${API_URL}${today}?q=${city},${country}&units=${units}&APPID=${API_KEY}`
const fiveDayForcast = `${API_URL}${fiveDays}?q=${city},${country}&units=${units}&APPID=${API_KEY}`
const main = document.querySelector('main')

let riseHours
let riseMinutes
let setHours
let setMinutes
let currentStyle
let updateStyle
let suggestionTxt
let timestamp
let timezone
let weekday
let hours
let minutes

const fetchFiveDayForcast = () => {
	fetch(fiveDayForcast).then(response => {
		if (!response.ok) {
			throw new Error('HTTP error! Status:${response.status}');
		}
		return response.json();
	}
	).then(weekData => {
		const uniqueDays = weekData.list.filter((time) => time.dt_txt.includes("00:00:00"));
		uniqueDays.forEach(d => {

			const timestamp = d.dt
			const forcast = document.querySelector(".forcast")
			forcast.innerHTML += `
			<div class ="lines">
			<div class="day">${convertDay(weekday)}</div>
			<div class="temp">${parseInt(d.main.temp).toFixed(1)}°</div>
				<div/>`
			convertTime(timestamp)
			console.log(d.dt_txt)
		});
	}
	).catch(error => {
		console.error('Error: ', error.message);
	})
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
		const rise = convertTime(data.sys.sunrise)
		const set = convertTime(data.sys.sunset)
		currentStyle = data.weather[0].main
		getStyles(currentStyle)
		main.classList.add(updateStyle)
		icon.classList.add(updateStyle)
		weather.innerText = `${data.weather[0].main} | ${parseInt(data.main.temp).toFixed(1)}°`
		sunrise.innerText = `sunrise ${rise}`
		sunset.innerText = `sunset ${set}`
		suggestion.innerText = suggestionTxt
	}
	).catch(error => {
		console.error('Error: ', error.message);
	})
}

const convertTime = (time) => {
	let unix_timestamp = time
	let date = new Date(unix_timestamp * 1000)
	let hours = date.getHours()
	let minutes = date.getMinutes()
	weekday = date.getDay()

	console.log("day: " + convertDay(weekday) + " hours: " + hours + " minutes: " + minutes)
	return (`${hours}:${minutes}`)
}


const convertDay = (weekday) => {
	switch (weekday) {
		case 0:
			return "Sun"
		case 1:
			return "Mon"
		case 2:
			return "Tue"
		case 3:
			return "Wed"
		case 4:
			return "Thu"
		case 5:
			return "Fri"
		case 6:
			return "Sat"
		default:
			break
	}
}

const getStyles = (currentStyle) => {
	switch (currentStyle) {
		case 'Rain':
			console.log("its rain")
			updateStyle = 'rainy';
			suggestionTxt = `Don't forget your umbrella. It's wet in ${city} today.`
			break;
		case 'Drizzle':
			console.log("its drizzle")
			updateStyle = 'rainy';
			suggestionTxt = `You might concider bringing your umbrella. We might get some light rain in ${city} today.`
			break;
		case 'Thunderstorm':
			console.log("thundertime")
			updateStyle = 'rainy';
			suggestionTxt = `Uhu looks like a thunder in ${city} today.`
			break;
		case 'Snow':
			console.log("its snowing")
			updateStyle = 'rainy';
			suggestionTxt = `Light a fire and get cosy. ${city} is looks like snow today.`
			break;
		case 'Clear':
			console.log("its clear skies")
			updateStyle = 'sunny';
			suggestionTxt = `Get your sunnies on. ${city} is looking rather great today.`
			break;
		case 'Clouds':
			console.log("its cloudy")
			updateStyle = 'cloudy';
			suggestionTxt = `Light a fire and get cosy. ${city} is looking grey today.`
			console.log(updateStyle)
			break;
		case 'Sun':
			console.log("its sunny")
			updateStyle = 'sunny';
			suggestionTxt = `Get your sunnies on. ${city} is looking rather great today.`
			break;
		default:
			console.log("could not find weathertype")
			console.log(data.weather[0].main)
	}
}


fetchForcast();

