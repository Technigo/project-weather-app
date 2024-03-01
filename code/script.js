//API - but I dont have time to break it down now
/*
const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&APPID=";
const API_KEY = "1e48fdf267ccc8ee33c1c78150dcbab1";
const city = "Umea, Sweden";
*/

//DOM selectors
const weatherContainer = document.getElementById('weather-container')
const imgContainer = document.getElementById('img-container')
const cityContainer = document.getElementById('city-container')
const forecastContainer = document.getElementById('forecast-container')

const handleTemp = document.getElementById('temperature')
const handleName = document.getElementById('city-name')
const weatherDescription = document.getElementById('weather-description')

//Fetching the API
const fetchWeather = () => {
	fetch(
		'https://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1'
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data)

			const nameChoice = data.name
			const tempChoice = Math.trunc(data.main.temp)
			const weatherDescr = data.weather[0].main

			console.log(weatherDescr)

			handleName.innerText = nameChoice
			handleTemp.innerText = `${tempChoice} °C`
			weatherDescription.innerText = `${weatherDescr}`
		})

	
}
fetchWeather()


//Function showing content on browser with .innerHTML
	const showWeather = () => {
		weatherContainer.innerHTML = `
			<p>hello world<p>`
		cityContainer.innerHTML = `
			<p>hello world<p>`
		forecastContainer.innerHTML = `
			<p>mon</p>`
		console.log('hello')
	}
	showWeather()