
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
			handleName.innerText = nameChoice
			handleTemp.innerText = `${tempChoice} °C`
			weatherDescription.innerText = `${weatherDescr}`

						const sunriseSeconds = data.sys.sunrise
						const sunsetSeconds = data.sys.sunset
						console.log('seconds', data.sys.sunrise)
						console.log('seconds', data.sys.sunset)

						const rise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
							[],
							{
								hour: '2-digit',
								minute: '2-digit',
							}
						)

						const set = new Date(data.sys.sunset * 1000).toLocaleTimeString(
							[],
							{
								hour: '2-digit',
								minute: '2-digit',
							}
						)

						sunrise.innerText = `${rise}`
						sunset.innerText = `${set}`
		})
}
fetchWeather()

console.log('hej')

//Function to get data to HTML
//Function showing content on browser with .innerHTML
//weather-container = temp, descr, sunset and sunrise
const showWeather = () => {
	weatherContainer.innerHTML = `
			<p>${tempChoice} °C<p>`
	cityContainer.innerHTML = `
			<p>hello world<p>`
	forecastContainer.innerHTML = `
			<p>mon</p>`
}
showWeather()


//Fetching the API FORECAST
const fetchForecast = () => {
	fetch(
		'https://api.openweathermap.org/data/2.5/forecast?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1'
	)
		.then((response) => response.json())
		.then((forecast) => {
			let filteredForecast = forecast.list.filter((day) =>
				day.dt_txt.includes('12:00')
			)

			handleForecast.innerHTML = ''

			filteredForecast.forEach((day) => {
				const weekTemp = day.main.temp.toFixed(0)
				const shortWeekDays = [
					'sun',
					'mon',
					'tue',
					'wed',
					'thu',
					'fri',
					'sat',
					'sun',
					'mon',
					'tue',
					'wed',
					'thu',
					'fri',
				]

				let weekday = new Date()
				let today = weekday.getDay()
				let tomorrow = today + 1

                //insert picture for cloud/sun/rain?
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

				console.log(filteredForecast)
				//skapa lista över fyra dagar fram. temp kl 12.00
				//skapa funktion som filtrerar ut värden från object i array
			})
		})
}
fetchForecast()
