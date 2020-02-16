const containerCity = document.getElementById('city')
const containerCurrentWeather = document.getElementById('currentWeather')
const containerCurrentTemp = document.getElementById('currentTemp')
const containerSunrise = document.getElementById('sunrise')
const containerSunriseTime = document.getElementById('sunriseTime')
const containerSunset = document.getElementById('sunset')
const containerSunsetTime = document.getElementById('sunsetTime')
const containerForecast = document.getElementById('forecastWeather')

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// const containerDay1 = document.getElementById('day1')
// const containerDay1Icon = document.getElementById('day1Icon')
// const containerDay1Temp = document.getElementById('day1Temp')
// const containerDay2 = document.getElementById('day2')
// const containerDay2Icon = document.getElementById('day2Icon')
// const containerDay2Temp = document.getElementById('day2Temp')
// const containerDay3 = document.getElementById('day3')
// const containerDay3Icon = document.getElementById('day3Icon')
// const containerDay3Temp = document.getElementById('day3Temp')
// const containerDay4 = document.getElementById('day4')
// const containerDay4Icon = document.getElementById('day4Icon')
// const containerDay4Temp = document.getElementById('day4Temp')
// const containerDay5 = document.getElementById('day5')
// const containerDay5Icon = document.getElementById('day5Icon')
// const containerDay5Temp = document.getElementById('day5Temp')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d36e9003d656caeed3587a56f370edb7')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        containerCity.innerHTML = `<h1>${json.name}</h1>`

        containerCurrentWeather.innerHTML = `<p>${StringUtils.capitalize(json.weather[0].description)}</p>`
        containerCurrentTemp.innerHTML = `<p>${json.main.temp.toFixed(1)}&deg;C</p>`

        const unixTimestampSunrise = json.sys.sunrise
        const unixTimestampSunset = json.sys.sunset
        const sunrise = new Date(unixTimestampSunrise * 1000)
        const sunset = new Date(unixTimestampSunset * 1000)
        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })
        containerSunrise.innerHTML = `<p>Sunrise</p>`
        containerSunriseTime.innerHTML = `<p>${sunriseTime}</p>`
        containerSunset.innerHTML = `<p>Sunset</p>` 
        containerSunsetTime.innerHTML = `<p>${sunsetTime}</p>` 
    })

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=d36e9003d656caeed3587a56f370edb7')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00:00'))

        filteredForecast.forEach(forecast => {
            let forecastElement = document.createElement('div')
            let day = new Date(forecast.dt * 1000).getDay()
            forecastElement.innerHTML = `
                <div id="forecastDays">${days[day]}</div>
                <div id="forecastIcon">${forecast.weather.icon}</div>
                <div id="forecastTemp">${forecast.main.temp_max.toFixed(1)}&deg; / ${forecast.main.temp_min.toFixed(1)}&deg;C</div>`
            forecastElement.classList.add(`forecast`)
            containerForecast.appendChild(forecastElement)
        })
    })
