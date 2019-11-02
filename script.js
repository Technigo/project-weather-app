const currentCity = document.getElementById("current-city")
const currentTemp = document.getElementById("current-temp")
const currentType = document.getElementById("current-type")
const currentIcon = document.getElementById("current-icon")
const currentSunRise = document.getElementById("current-sunrise")
const currentSunSet = document.getElementById("current-sunset")


fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=42da1ed967bb60f77a80f7975f8783b9')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        //Declare variable for the time of sunrise/sunset
        const unixTimestampSunrise = json.sys.sunrise
        const unixTimestampSunset = json.sys.sunset

        //To get sunrise/sunset time in hours:minutes:seconds
        const sunrise = new Date(unixTimestampSunrise * 1000)
        const sunset = new Date(unixTimestampSunset * 1000)

        //Declare new variable to show only hh:mm
        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        currentCity.innerHTML = `<h1>Todays weather in ${json.name}</h1>`
        currentTemp.innerHTML += `<h3>Temp ${json.main.temp.toFixed(0)} &#8451;<h3>`

        currentSunRise.innerHTML += `<p>Sunrise: ${sunriseTime}</p>`
        currentSunSet.innerHTML += `<p>Sunset: ${sunsetTime}<p>`

        json.weather.forEach((currenttype) => {
            currentType.innerHTML += `<h3>${currenttype.description}</h3>`
            currentIcon.innerHTML += `<img src="http://openweathermap.org/img/wn/${currenttype.icon}@2x.png"/>`

        })

    })

/* const apiKey = '84a3e2c91df6843f5cc1f61e17add9d0'
const location = 'Stockholm,SE'

const handle5DayForecast = (json) => {
const forecastDiv = document.getElementById('forecast')
const dates = {}

json.list.forEach((weather) => {
    const date = weather.dt_txt.split(' ')[0]
    if (dates[date]) {
        dates[date].push(weather)
    } else {
        dates[date] = [weather]
    }
})

Object.entries(dates).forEach((item, index) => {
    if (index === 0) {
        return
    }

    const date = item[0]
    const weatherValues = item[1]

    const temps = weatherValues.map((value) => value.main.temp)
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)

    forecastDiv.innerHTML += `<li>${date} - min: ${minTemp.toFixed(1)}, max: ${maxTemp.toFixed(
        1
    )}</li>`
})
}

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`)
.then((res) => res.json())
.then(handle5DayForecast) */
