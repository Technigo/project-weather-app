const container = document.getElementById('myWeather')
const theTemperature = document.getElementById('temperature')
const theCity = document.getElementById('city')
const theImage = document.getElementById('weatherImage')
const sunriseAndSunset = document.getElementById('sunUpSunDown')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=82792eb4459b56038cc8a4b53d2f5c3d')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const unixTimestampSunrise = json.sys.sunrise
        const unixTimestampSunset = json.sys.sunset
        const sunrise = new Date(unixTimestampSunrise * 1000)
        const sunset = new Date(unixTimestampSunset * 1000)
        const sunriseTime = sunrise.toLocaleTimeString([], {
            timeStyle: 'short'
        })
        const sunsetTime = sunset.toLocaleTimeString([], {
            timeStyle: 'short'
        })
        theTemperature.innerHTML += `${json.main.temp}° | ${json.weather[0].main}`
        theCity.innerHTML += `${json.name}`
        container.innerHTML += `Sunrise at ${sunriseTime} | Sunset at ${sunsetTime}`
    })