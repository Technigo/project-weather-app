//DOM selectors
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')

//Fetching the API
const fetchWeather = () => {
	fetch(
		'https://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1'
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data)

			const showSunrise = data.sys.sunrise
			const showSunset = data.sys.sunset
			console.log(data.sys.sunrise)
			console.log(data.sys.sunset)

			sunrise.innerText = showSunrise
			sunset.innerText = showSunset

			/*
            const convertSunrise = new Date()
			convertSunrise.toLocaleDateString(1709185720)
			console.log(convertSunrise)
            */
		})
}
fetchWeather()

const secondsSunrise = 1709185720
const secondsSunset = 1709222075

const formatTimeSunrise = () => {
	const minutes = Math.floor((secondsSunrise / 60) % 60)
	const hours = Math.floor((secondsSunrise / 60 / 60) % 24)

	return [
		hours.toString().padStart(2, '0'),
		minutes.toString().padStart(2, '0'),
	].join(':')
}
const formattedTimeSunrise = formatTimeSunrise(secondsSunrise)
console.log(formattedTimeSunrise)

const formatTimeSunset = () => {
	const minutes = Math.floor((secondsSunset / 60) % 60)
	const hours = Math.floor((secondsSunset / 60 / 60) % 24)

	return [
		hours.toString().padStart(2, '0'),
		minutes.toString().padStart(2, '0'),
	].join(':')
}
const formattedTimeSunset = formatTimeSunset(secondsSunset)
console.log(formattedTimeSunset)
