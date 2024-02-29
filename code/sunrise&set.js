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
			// variabel för data i sekunder från json
			const sunriseSeconds = data.sys.sunrise
			const sunsetSeconds = data.sys.sunset
			console.log('seconds', data.sys.sunrise)
			console.log('seconds', data.sys.sunset)
            
            const rise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
	            hour: '2-digit',
	            minute: '2-digit',
            })

            const set = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
	            hour: '2-digit',
	            minute: '2-digit',
            })

			sunrise.innerText = `${rise} `
			sunset.innerText = `${set}`
			 
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
console.log("time sunrise", formattedTimeSunrise)

const formatTimeSunset = () => {
	const minutes = Math.floor((secondsSunset / 60) % 60)
	const hours = Math.floor((secondsSunset / 60 / 60) % 24)

	return [
		hours.toString().padStart(2, '0'),
		minutes.toString().padStart(2, '0'),
	].join(':')

}
const formattedTimeSunset = formatTimeSunset(secondsSunset)
console.log("time sunset", formattedTimeSunset)



