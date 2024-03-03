//Breaking down URL - not working
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = '1e48fdf267ccc8ee33c1c78150dcbab1'
const city = 'Umea, Sweden'

const URL = `${BASE_URL}weather?q=${city}&units=metric&APPID=${API_KEY}`

//DOM selectors
const backgroundColor = document.getElementById('background-color')
const weatherContainer = document.getElementById('weather-container')
const sun = document.getElementById('sun')
const imgContainer = document.getElementById('img-container')
const cityContainer = document.getElementById('city-container')
const forecastContainer = document.getElementById('forecast-container')

const errorDiv = document.getElementById('error')
const handleForecast = document.getElementById('forecast-list')

//global scope

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

//Fetching the API FORECAST
const fetchForecast = () => {
	fetch(
		'https://api.openweathermap.org/data/2.5/forecast?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1'
	)
		.then((response) => response.json())
		.then((forecast) => {
			console.log(forecast)
			updateForcast(forecast)
		})
		.catch((error) => console.log(error))
}
fetchForecast()

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
    sunrise ${rise}
    sunset ${set}`
	console.log(sun.innerHTML)
}
//call function with updateHtml() ?

//Variabel for weekdays
const dateNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

//Function to display forecast
const updateForecast = (forecast) => {}

//Function that changes background/text-color depending on weather
const weatherStyle = (weather) => {
	if (weather === 'Clear') {
		backgroundColor.style.backgroundImage =
			'/images/noun_Sunglasses_2055147.svg'
	} else if (weather === 'Clouds' || 'Mist') {
		backgroundColor.style.backgroundImage = '/images/noun_Cloud_1188486.svg'
	} else if (weather === 'Rain') {
		backgroundColor.style.backgroundImage = '/images/noun_Umbrella_2030530.svg'
	}
}
weatherStyle()

const displayForecast = (filterForecast) => {
	filterForecast.forEach((day) => {
		const weekDay = new Date(day.dt * 1000)
		const dayIndex = weekDay.getDay()
		const date = dateNames[dayIndex]
		const weekTemp = Math.round(day.main.temp)
		forecastContainer.innerHTML += `<h4>${weekDay}</h4></div>
    <h4>${weekTemp} °C</h4>`
	})
	
}
displayForecast()

//funktion för att fitrera
const filterTheTime = (forecast) => {
	const filterForecast = forecast.list.filter((day) =>
		day.dt_txt.includes('12:00')
	)
	console.log(filterTheTime)
	displayForecast()
}
