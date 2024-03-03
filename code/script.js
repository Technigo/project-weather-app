//DOM selectors
const backgroundColor = document.getElementById('background-color')
const weatherContainer = document.getElementById('weather-container')
const sun = document.getElementById('sun')
const icons = document.getElementById('icon-container')
const cityContainer = document.getElementById('city-container')
const forecastContainer = document.getElementById('forecast-container')

const errorDiv = document.getElementById('error')
const handleForecast = document.getElementById('forecast-list')

//Variabel for weekdays
const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

//Fetching the API
const fetchWeather = () => {
	fetch(
		'https://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1'
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			updateHtml(data)
		})
		.catch((error) => console.log(error))
}
fetchWeather()

//Function to get data to HTML
const updateHtml = (data) => {
	const weather = data.weather[0].main
	const city = data.name
	const temp = Math.trunc(data.main.temp)
	const rise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
	const set = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
	weatherContainer.innerHTML = `<p>${weather} |</p><p> ${temp}°C</p>`
	sun.innerHTML = `
    <p>sunrise ${rise}</p>
    <p>sunset ${set}</p>`
	console.log()

	weatherStyle(weather)
	filterTheTime(displayForecast)
}

//Fetching the API FORECAST
const fetchForecast = () => {
	fetch(
		'https://api.openweathermap.org/data/2.5/forecast?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1'
	)
		.then((response) => response.json())
		.then((forecast) => {
			console.log('forecast', forecast)
			updateForcast(forecast)
		})
		.catch((error) => console.log(error))
}
fetchForecast()

//Function that changes background/text-color depending on weather
const weatherStyle = (weather) => {
	if (weather === 'Clear') {
		backgroundColor.classList.add('sunny')
		cityContainer.innerHTML = `<p>Get your sunnies on. Umeå is looking rather great today.</p>`
	} else if (weather === 'Clouds' || weather === 'Mist') {
		backgroundColor.classList.add('cloud')
		cityContainer.innerText = `Light a fire and get cozy. Umeå is looking grey today.`
	} else if (weather === 'Rain') {
		backgroundColor.classList.add('rain')
		cityContainer.innerText = `Don't forget your umbrella. It's wet in Umeå today.`
	}
}

//funktion för att fitrera fram 12.00
const filterTheTime = (forecast) => {
	const filterForecast = forecast.list.filter((day) =>
		day.dt_txt.includes('12:00')
	)
	displayForecast(filterForecast)
}

const displayForecast = (filterForecast) => {
	let forecastHTML = ''
	filterForecast.forEach((day) => {
		const showDay = new Date(day.dt * 1000)
		const dayIndex = showDay.getDay()
		const weekDay = dayNames[dayIndex]
		const weekTemp = Math.round(day.main.temp)
		forecastHTML += `<div class ="weekday-list"><p>${weekDay}</p></div> <div class ="temp-list"><p>${weekTemp} °C</p></div>`
	})

	// Set forecastContainer innerHTML
	forecastContainer.innerHTML = forecastHTML
}

