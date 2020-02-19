const containerCurrentTemp = document.getElementById('currentTemp')
const containerCity = document.getElementById('city')
const containerCurrentWeather = document.getElementById('currentWeather')
const containerFeelsLike = document.getElementById('feelsLike')
const containerSunrise = document.getElementById('sunrise')
const containerSunriseTime = document.getElementById('sunriseTime')
const containerSunset = document.getElementById('sunset')
const containerSunsetTime = document.getElementById('sunsetTime')
const containerForecastDay = document.getElementById('forecastWeatherDay')
const containerForecastTemp = document.getElementById('forecastWeatherTemp')

const clearSky = {
    name: '01',
    image: 'assets/clearsky.png',
    color: '#FC8822',
    backgroundColor: '#ffbf87',
    animation: 'background-sun'
}

const fewClouds = {
    name: '02',
    image: 'assets/fewclouds.png',
    color: '#FC8822',
    backgroundColor: '#9ee0ff',
    animation: 'background-suncloud'
}

const scatteredClouds = {
    name: '03',
    image: 'assets/scatteredclouds.png',
    color: '#666666',
    backgroundColor: '#9ee0ff',
    animation: 'background-cloud'
}

const brokenClouds = {
    name: '04',
    image: 'assets/brokenclouds.png',
    color: '#666666',
    backgroundColor: '#cccaca',
    animation: 'background-cloud'
}

const showerRain = {
    name: '09',
    image: 'assets/showerrain.png',
    color: '#044485',
    backgroundColor: '#8faac4',
    animation: 'background-rain'
}

const rain = {
    name: '10',
    image: 'assets/rain.png',
    color: '#044485',
    backgroundColor: '#8faac4',
    animation: 'background-rain'
}

const thunderstorm = {
    name: '11',
    image: 'assets/thunderstorm.png',
    color: '#333333',
    backgroundColor: '#828282',
    animation: 'background-thunderstorm'
}

const snow = {
    name: '13',
    image: 'assets/snow.png',
    color: '#54bfff',
    backgroundColor: '#e0f3ff',
    animation: 'background-snow'
}

const mist = {
    name: '50',
    image: 'assets/mist.png',
    color: '#999999',
    backgroundColor: '#dfe8ed',
    animation: 'background-mist'
}

const weatherIcons = [
    clearSky,
    fewClouds,
    scatteredClouds,
    brokenClouds,
    showerRain,
    rain,
    thunderstorm,
    snow,
    mist
]


fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&APPID=d36e9003d656caeed3587a56f370edb7')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        containerCurrentTemp.innerHTML = `<h1>${json.main.temp.toFixed(1)}&deg;C</h1>`
        containerCity.innerHTML = `<h2>${json.name}</h2>`
        containerCurrentWeather.innerHTML = `<p>${json.weather[0].description}</p>`
        containerFeelsLike.innerHTML = `<p>feels like: ${json.main.feels_like}</p>`
        
        const unixTimestampSunrise = json.sys.sunrise
        const unixTimestampSunset = json.sys.sunset
        const sunrise = new Date(unixTimestampSunrise * 1000)
        const sunset = new Date(unixTimestampSunset * 1000)
        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })
        containerSunrise.innerHTML = `<p>sunrise</p>`
        containerSunriseTime.innerHTML = `<p>${sunriseTime}</p>`
        containerSunset.innerHTML = `<p>sunset</p>` 
        containerSunsetTime.innerHTML = `<p>${sunsetTime}</p>` 

        function toggleAnimation(animation) {
            document.getElementById(animation).style.visibility = 'visible'
        }

        const backgroundColor = weatherIcons.find(weatherIcon => json.weather[0].icon.includes(weatherIcon.name))
        if (backgroundColor) {
            const body = document.getElementById('body')
            body.style.background = backgroundColor.backgroundColor
            body.style.color = backgroundColor.color
            toggleAnimation(backgroundColor.animation)
        }

        
        
        /* if (backgroundColor === '04' && backgroundColor === '03' && backgroundColor === '02') {
            background-cloud = toggle 
        } else if {

        } else if {

        } */
        

    })


    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&APPID=d36e9003d656caeed3587a56f370edb7')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const filteredForecastMidnight = json.list.filter(item => item.dt_txt.includes('00:00:00'))
        filteredForecastMidnight.forEach(forecast => {
            let forecastElement = document.createElement('div')
            let day = new Date(forecast.dt * 1000).getDay()
            const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
            forecastElement.innerHTML = `
                <div class="forecastDays">${days[day]}</div>`
            forecastElement.classList.add(`forecast1`)
            containerForecastDay.appendChild(forecastElement)
        })

        const filteredForecastLunch = json.list.filter(item => item.dt_txt.includes('12:00:00'))
        filteredForecastLunch.forEach(forecast => {
            let forecastElement = document.createElement('div')
            const icon = weatherIcons.find(weatherIcon => forecast.weather[0].icon.includes(weatherIcon.name))
            forecastElement.innerHTML = `
                <img class="forecastIcon" src="${icon.image}" alt="${forecast.weather[0].icon}"></img>
                <div class="forecastTemp">${forecast.main.temp.toFixed(1)}&deg;C / feels like: ${forecast.main.feels_like.toFixed(1)}&deg;</div>`
            forecastElement.classList.add(`forecast2`)
            containerForecastTemp.appendChild(forecastElement)
        })
    })