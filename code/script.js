//DOM selectors
const backgroundColor = document.getElementById('background-color')
const weatherContainer = document.getElementById('weather-container')
const sun = document.getElementById('sun')
const icons = document.getElementById('image-container')
const cityContainer = document.getElementById('city-container')
const forecastContainer = document.getElementById('forecast-container')
const errorDiv = document.getElementById('error')

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
	console.log(sun)

	weatherStyle(weather)
	filterTheTime(updateForecast)
}

//Function that changes background/text-color depending on weather. ${city} not working.
const weatherStyle = (weather) => {
	// Hide all images
	document.querySelectorAll('.img-container img').forEach((img) => {
		img.style.display = 'none'
	})
	// Remove all weather-related classes
    backgroundColor.classList.remove('sunny', 'cloud', 'rain');

	if (weather === 'Clear') {
		backgroundColor.classList.add('sunny')
		cityContainer.innerHTML = `<h1>Get your sunnies on. Umeå is looking rather great today.</h1>`
		document.getElementById('sunny').style.display = 'block'
	} else if (weather === 'Clouds' || weather === 'Mist') {
		backgroundColor.classList.add('cloud')
		cityContainer.innerHTML = `<h1>Light a fire and get cozy. Umeå is looking grey today.</h1>`
		document.getElementById('cloud').style.display = 'block'
	} else if (weather === 'Rain') {
		backgroundColor.classList.add('rain')
		cityContainer.innerHTML = `<h1>Don't forget your umbrella. It's wet in Umeå today.</h1>`
		document.getElementById('rain').style.display = 'block'
	}
}

//Variabel for weekdays


const updateForecast = (filteredForecast) => {
	console.log('filterForecast:', data)

	let forecastHTML = ''
	// Check if filterForecast is an array before attempting to use forEach
	if (!Array.isArray(data)) {
		console.error('data is not an array')
		return
	}
	data.forEach((day) => {
		const showDay = new Date(day.dt * 1000)
		const dayIndex = showDay.getDay()
		const weekDay = dayNames[dayIndex]
		const weekTemp = Math.round(day.main.temp)
		const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
		forecastHTML += `<div class ="weekday-list"><p>${weekDay}</p></div> <div class ="temp-list"><p>${weekTemp} °C</p></div>`
	})

	// Set forecastContainer innerHTML
	forecastContainer.innerHTML = forecastHTML
}

//funktion för att filtrera fram 12.00
const filterTheTime = (data) => {
        const filteredForecast = data.list.filter((day) =>
            day.dt_txt.includes('12:00')
        )
        updateForecast()
}

//Fetching the API FORECAST
const fetchForecast = () => {
    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1'
    )
        .then((response) => response.json())
        .then((data) => {
            console.log('forecast', data)
            updateForecast(data)
        })
        .catch((error) => console.log(error))
}
fetchForecast()
