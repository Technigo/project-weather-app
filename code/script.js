//API
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = '1e48fdf267ccc8ee33c1c78150dcbab1'
const city = 'Umea,Sweden'

const URL = `${BASE_URL}weather?q=${city}&units=metric&APPID=${API_KEY}`

//'https://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1'

//DOM selectors
const weatherContainer = document.getElementById('weather-container')
const imgContainer = document.getElementById('img-container')
const cityContainer = document.getElementById('city-container')
const forecastContainer = document.getElementById('forecast-container')
const errorDiv = document.getElementById('error')
const handleTemp = document.getElementById('temperature')
const handleName = document.getElementById('city-name')
const weatherDescription = document.getElementById('weather-description')

//Fetching the API
const fetchWeather = () => {
	fetch('https://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1')
		.then((response) => response.json())
		.then((data) => dataToHTML(data))
		
		.catch((error) => {
			errorDiv.innerText = `😬`
		})
}
fetchWeather()
console.log(dataToHTML(data))


//Function to get data to HTML
const dataToHTML = (data) => {
	const nameChoice = data.name
	const tempChoice = Math.trunc(data.main.temp)
	const weatherDescr = data.weather[0].main

	handleName.innerText = nameChoice
	handleTemp.innerText = `${tempChoice} °C`
	weatherDescription.innerText = `${weatherDescr}`
}
dataToHTML()
console.log('hej')

//Function showing content on browser with .innerHTML
const showWeather = () => {
	weatherContainer.innerHTML = `
			<p>hello world<p>`
	cityContainer.innerHTML = `
			<p>hello world<p>`
	forecastContainer.innerHTML = `
			<p>mon</p>`
}
showWeather()