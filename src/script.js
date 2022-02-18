const weather = document.getElementById("weather");
const sunriseSunsetWrapper = document.getElementById("sunriseSunsetWrapper")
const icon = document.getElementById("icon");
const message = document.getElementById("message");
const forecastWrapper = document.getElementById("forecastWrapper");
const cityForm = document.getElementById('cityForm')
const cityName = document.getElementById('cityName')
const submitBtn = document.getElementById("submitBtn")

const displayData = (data) => {
	const temperature = Math.round(data.main.temp);
	const detailedWeatherDescription = data.weather[0].description;
	const weatherDescription = data.weather[0].main; 
	let sunriseOrSunset;
	const city = data.name;
	const lat = data.coord.lat;
	const lon = data.coord.lon;

	const sunriseSunset = [
		new Date((data.sys.sunrise + data.timezone + new Date().getTimezoneOffset() * 60) * 1000),
		new Date((data.sys.sunset + data.timezone + new Date().getTimezoneOffset() * 60) * 1000)
	]

	sunriseSunset.forEach((time, index) => {
		let timeHours = time.getHours();
		timeHours < 10 ? timeHours = `0${timeHours}` : timeHours = timeHours;

		let timeMinutes = time.getMinutes()
		timeMinutes < 10 ? timeMinutes = `0${timeMinutes}` : timeMinutes = timeMinutes;

		index === 0 ? sunriseOrSunset = "sunrise:" : sunriseOrSunset = "sunset:"

		weather.innerHTML = `${detailedWeatherDescription} | ${temperature}°`
		sunriseSunsetWrapper.innerHTML += `<p>${sunriseOrSunset} ${timeHours}.${timeMinutes}</p>`
	})

	switch (weatherDescription) {
		case "Clear":
		icon.src = "./images/noun_Sunglasses_2055147.svg"
		message.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`
		document.body.style.backgroundColor = "#F7E9B9"
		document.body.style.color = "#2A5510"
		break;
		case "Clouds":
		icon.src = "./images/noun_Cloud_1188486.svg"
		message.innerHTML = `Light a fire and get cosy. ${city} is looking grey today.`
		document.body.style.backgroundColor = "#F4F7F8"
		document.body.style.color = "#F47775"
		break;
		case "Rain":
		case "Drizzle":
		icon.src = "./images/noun_Umbrella_2030530.svg"
		message.innerHTML = `Don't forget your umbrella. It is wet in ${city} today.`
		document.body.style.backgroundColor = "#A3DEF7"
		document.body.style.color = "#164A68"
		default:
		message.innerHTML = `Stay inside. It is unpredictable weather out in ${city} today.`
		icon.src = "./images/weather.png"
		icon.style.width = "80px"
		cityName.classList.add("white-border");
		submitBtn.classList.add("white-border")
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
	cityName.classList.remove("white-border");
	submitBtn.classList.remove("white-border")
	forecastWrapper.innerHTML = "";
	sunriseSunsetWrapper.innerHTML = "";
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
