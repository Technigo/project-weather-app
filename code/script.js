//DOM selectors
const backgroundColor = document.getElementById('background-color')
const weatherContainer = document.getElementById('weather-container')
const sun = document.getElementById('sun')
const icons = document.getElementById('image-container')
const cityContainer = document.getElementById('city-container')
const forecastContainer = document.getElementById('forecast-container')
const forecastItems = document.getElementById("forecast-items")
const errorDiv = document.getElementById('error')


//Fetching the API
const fetchWeather = () => {
	fetch(
		'https://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1'
	)
		.then((response) => response.json())
		.then((data) => {
			updateHtml(data)
		})
		.catch((error) => console.log(error))
}
fetchWeather()

//Function to get data to HTML
const updateHtml = (data) => {
	const weather = data.weather[0].main
	const cityName = data.name
	const temp = data.main.temp.toFixed(1)
	const rise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
	const set = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
	weatherContainer.innerHTML = `${weather} | ${temp}°C <p>Sunrise ${rise}</p><p>Sunset ${set}</p>`

	weatherStyle(weather, cityName)
}

//Function that changes background/text-color depending on weather.
//ev lägga till färger för vinter?
const weatherStyle = (weather, cityName) => {
	if (weather === 'Clear') {
		cityContainer.innerHTML += `<img src="/code/noun_Sunglasses_2055147.svg" alt="sunglasses"/><h1>Get your sunnies on! ${cityName} is looking rather great today!</h1>`
		document.body.style.backgroundColor = '#f7e9b9'
		document.body.style.color = '#2a5510'
	} else if (weather === 'Clouds' || weather === 'Mist') {
		cityContainer.innerHTML = `<img src="/code/noun_Cloud_1188486.svg" alt="cloud"/><h1>Light a fire and get cozy. ${cityName} is looking grey today.</h1>`
		document.body.style.backgroundColor = '#f4f7f8'
		document.body.style.color = '#f47775'
	} else if (weather === 'Rain') {
		cityContainer.innerHTML = `<img src="/code/noun_Umbrella_2030530.svg" alt="umbrella"/><h1>Don't forget your umbrella. It's wet in ${cityName} today.</h1>`
		document.body.style.backgroundColor = '#a3def7'
		document.body.style.color = '#164a68'
	}
}

//FRAM TILL HIT FUNKAR ALLT
//----------------------------------------

//Fetching the API FORECAST
const fetchForecast = () => {
	fetch(
		'https://api.openweathermap.org/data/2.5/forecast?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1'
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			//From the array of 40 objects, filtering out only the forecasts at 12:00: 
			const filteredForecast = data.list.filter((item) =>
				item.dt_txt.includes('12:00')
			)
			console.log(filteredForecast)
			//removing the last element in the array so we only display four days.
			const fourDayForecast = filteredForecast.slice(0, filteredForecast.length-1)
			console.log(fourDayForecast)
			
			//Now we have an array with four days (fourdayforecast) we want to display. This array we need to loop over using the "forEach-method":
			fourDayForecast.forEach((day) => {
				console.log(day)
				//we want the weekday and temp from each of the four days
				//starting with the weekday, converting timestamp to short weekday format
				const weekDay = new Date (day.dt*1000).toLocaleDateString("en", {weekday:"short"})
				console.log(weekDay)
				//now we want to get the temp
				const dayTemp = day.main.temp.toFixed(1) //ToFixed rounds temp value to one decimal
				console.log(dayTemp)
				forecastItems.innerHTML += `<li><span>${weekDay}</span><span>${dayTemp}</span></li>`
			})
		})
}
fetchForecast()

// const updateForecast = (weekDay, weekTemp) => {
// 	forecastContainer.innerHTML += `<div class ="weekday-list"><p>${weekDay}</p></div> <div class ="temp-list"><p>${weekTemp} °C</p></div>`
// 	console.log(forecastContainer.innerHTML)

// 	filterForecast()
// }
// updateForecast()

// const filterForecast = (data) => {
// 	filterForecast.forEach((day) => {
// 		const weekDay = new Date(day.dt * 1000)
// 		const weekTemp = day.main.temp.toFixed()
// 		data.forEach((day) => {
// 			const showDay = new Date(day.dt * 1000)
// 			const dayIndex = showDay.getDay()
// 			const weekDay = dayNames[dayIndex]
// 			const weekTemp = Math.round(day.main.temp)
// 			const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
// 			forecastHTML += `<div class ="weekday-list"><p>${weekDay}</p></div> <div class ="temp-list"><p>${weekTemp} °C</p></div>`
// 		})
// 	})
// }
// filterForecast()
