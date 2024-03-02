
//Breaking down URL - not working
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = '1e48fdf267ccc8ee33c1c78150dcbab1'
const city = 'Umea, Sweden'

const URL = `${BASE_URL}weather?q=${city}&units=metric&APPID=${API_KEY}`

//DOM selectors
const weatherContainer = document.getElementById('weather-container')
const imgContainer = document.getElementById('img-container')
const cityContainer = document.getElementById('city-container')
const forecastContainer = document.getElementById('forecast-container')

const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')

const errorDiv = document.getElementById('error')
const handleTemp = document.getElementById('temperature')
const handleName = document.getElementById('city-name')
const handleForecast = document.getElementById('forecast-list')
const weatherDescription = document.getElementById('weather-description')

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
		let filteredForecast = forecast.list.filter((day) =>
			day.dt_txt.includes('12:00')
	)})
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
  	const set = new Date(data.city.sunset * 1000).toLocaleTimeString([], {
    	hour: '2-digit',
    	minute: '2-digit',
  	})
  
  	weatherContainer.innerHTML = `<p>${weather} |</p><p>${temp}</p>
  	<p>${rise}</p>
  	<p>${set}</p>
  	`
}
const dateNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat',]
//Function to display forecast
const displayForecast = (filteredForecast) => {
  filteredForecast.forEach((day) => {
    const weekDay = new Date(day.dt * 1000)
    const dayIndex = weekDay.getDay()
    const date = dateNames[dayIndex]
    const weekTemp = Math.round(day.main.temp)
    forecastContainer.innerHTML += `<h4>${weekDay}</h4></div>
    <h4>${weekTemp} °C</h4>`
  })
}






//const weatherIcon = day.weather[0].icon
			//handleForecast.innerHTML = ''

			//filteredForecast.forEach((day) => {
			//const weekTemp = day.main.temp.toFixed(0)
				

				//let weekday = new Date()
				//let today = weekday.getDay()
				//let tomorrow = today + 1

                //insert picture for cloud/sun/rain?
				/*
				handleForecast.innerHTML += `
                <div id="forecast-list">
                <p>${new Date(day.dt_txt.replace(/-/g, '/')).toLocaleDateString(
									'en-US',
									{
										weekday: 'short',
									}
								)} 
                </p>
                <p id="weekTemp">${weekTemp}ºC</p>
                ${[day.weather[0].main]}
                </div>
                `
				*/

		
				//skapa lista över fyra dagar fram. temp kl 12.00
				//skapa funktion som filtrerar ut värden från object i array

//const nameChoice = data.name
//const tempChoice = Math.trunc(data.main.temp)
//const weatherDescr = data.weather[0].main
//handleName.innerText = city
//handleTemp.innerText = `${temp} °C`
//weatherDescription.innerText = `${weather}`

/*
const rise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([],{
	hour: '2-digit',
	minute: '2-digit',
})


const set = new Date(data.sys.sunset * 1000).toLocaleTimeString([],{
	hour: '2-digit',
	minute: '2-digit',
})
*/