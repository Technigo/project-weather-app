const weather = document.getElementById("weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const icon = document.getElementById("icon");
const message = document.getElementById("message");
const forecastWrapper = document.getElementById("forecastWrapper");
const cityForm = document.getElementById('cityForm')
const cityName = document.getElementById('cityName')
const submitBtn = document.getElementById("submitBtn")

const displayData = (data) => {
	const temperature = Math.round(data.main.temp)
	const description = data.weather[0].description
	const sunrisedata = new Date(data.sys.sunrise * 1000)
	const sunsetdata = new Date(data.sys.sunset * 1000)
	const city = data.name;
	const lat = data.coord.lat
	const lon = data.coord.lon

	let sunriseHours = sunrisedata.getHours();
	let sunriseMinutes = sunrisedata.getMinutes()
	let sunsetHours = sunsetdata.getHours();
	let sunsetMinutes = sunsetdata.getMinutes()

	if (sunriseHours < 10) {
		sunriseHours = `0${sunriseHours}`
	}

	if (sunriseMinutes < 10) {
		sunriseMinutes = `0${sunriseMinutes} `
	}

	if (sunsetHours < 10) {
		sunsetHours = `0${sunsetHours}`
	}

	if (sunsetMinutes < 10) {
		sunsetMinutes = `0${sunsetMinutes} `
	}

	weather.innerHTML = `${description} | ${temperature}°`
	sunrise.innerHTML = `sunrise: ${sunriseHours}.${sunriseMinutes}`
	sunset.innerHTML = `sunset: ${sunsetHours}.${sunsetMinutes}`

	if (data.weather[0].main === "Clear") {
		icon.src = "./images/noun_Sunglasses_2055147.svg"
		message.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`
		document.body.style.backgroundColor = "#F7E9B9"
		document.body.style.color = "#2A5510"
	} else if (data.weather[0].main === "Clouds") {
		icon.src = "./images/noun_Cloud_1188486.svg"
		message.innerHTML = `Light a fire and get cosy. ${city} is looking grey today.`
		document.body.style.backgroundColor = "#F4F7F8"
		document.body.style.color = "#F47775"
	} else if (data.weather[0].main === "Rain" || data.weather[0].main === "Drizzle") {
		icon.src = "./images/noun_Umbrella_2030530.svg"
		message.innerHTML = `Don't forget your umbrella. It is wet in ${city} today.`
		document.body.style.backgroundColor = "#A3DEF7"
		document.body.style.color = "#164A68"
	} else {
		message.innerHTML = `Stay inside. It is unpredictable weather out in ${city} today.`
		icon.src = "./images/weather.png"
		icon.style.width = "80px"
		submitBtn.style.border = "1px solid white"
		cityName.style.border = "1px solid white"
		submitBtn.style.color = "white"
		cityName.style.color = "white"
		document.body.style.backgroundColor = "#2c2c2c" 
		document.body.style.color = "#ffffff"
	} 

	fetchDataForecast(lat, lon);
}

const displayForecast = (data) => {
	for (index = 1; index < 8; index++) {
		const days = new Date(data.daily[index].dt * 1000);
		const dayOfWeek = days.getDay();
		let day = [
			"sun",
			"mon",
			"tue",
			"wed",
			"thu",
			"fri",
			"sat"
		]
	
		const displayWeek = day[dayOfWeek]
		const displayTemp = Math.round(data.daily[index].temp.day);
		forecastWrapper.innerHTML += `<div class="week-temp"><p>${displayWeek}</p>
	    <p>${displayTemp}°</p></div>
	    `
	}
}

const handleCitySearch = (event) => {
	event.preventDefault()
	fetchData(cityName.value)
	forecastWrapper.innerHTML = ''
}

const fetchData = (city) => {
	const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7908c37d2eaed12abeb790e5b0154ee9`
	fetch(API_URL)
		.then((res) => res.json())
		.then(displayData)
}

const fetchDataForecast = (lat, lon) => {
	const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=7908c37d2eaed12abeb790e5b0154ee9`
	fetch(API_URL)
		.then((res) => res.json())
		.then(displayForecast)
}

cityForm.addEventListener('submit', handleCitySearch)

fetchData('stockholm')
