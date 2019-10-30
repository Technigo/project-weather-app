const container = document.getElementById('myWeather')
const theTemperature = document.getElementById('temperature')
const theCity = document.getElementById('city')
const weatherImage = document.getElementById('weatherImage')
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
        theTemperature.innerHTML += `${json.main.temp}°c | ${json.weather[0].main}`
        theCity.innerHTML += `${json.name}`
        sunUpSunDown.innerHTML += `Sunrise at ${sunriseTime} | Sunset at ${sunsetTime}`
    })

const upcomingWeather = document.getElementById('nextWeather')
fetch('http://api.openweathermap.org/data/2.5/forecast?q=Tokyo,Japan&units=metric&APPID=82792eb4459b56038cc8a4b53d2f5c3d')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        nextWeather.innerHTML += `${json.city.name}`
        currentTemp.innerHTML += `Current temperature is ${json.list[0].main.temp}°c`
        maxTemp.innerHTML += `Max temperature will be ${json.list[2].main.temp}°c`
        minTemp.innerHTML += `Min temperature will be ${json.list[1].main.temp}°c`
        fiveDaysPrognose.innerHTML += `${json.list[0, 1, 2, 3, 4].main.temp}`
        forecastDiv.innerHTML += `<li>${date}</li>`
    })