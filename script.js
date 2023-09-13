//Containers for the DOM elements
const weatherContainer = document.getElementById('currentWeather')
const weatherApp = document.getElementById('weatherApp')
const sunRiseSet = document.getElementById('sunRiseSet')
const weatherForecast = document.getElementById('weatherForecast')

//Create a search string
const appID = "d8d8bd8fc9a245def8c2bd16cb32ba83"
const units = "metric"
const baseURL = "https://api.openweathermap.org/data/2.5/"
const searchString = (searchTerm, searchCity) => {
    return (`${baseURL}${searchTerm}?q=${searchCity}&units=${units}&APPID=${appID}`)
}

//Fetch the API from Open Weather construct the current weather
fetch(searchString("weather", "Stockholm,Sweden"))
    .then((response) => {
        return response.json()})
    .then((json) => {
        let cityName = json.name
        let temperature = Math.round(json.main.temp*10)/10
        let weatherDescription = json.weather[0].description

        let sunrise = new Date (json.sys.sunrise * 1000)
        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        let sunset = new Date (json.sys.sunset * 1000)
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        weatherContainer.innerHTML = ""
        weatherContainer.innerHTML +=`<p>${temperature} °C</p>`
        weatherContainer.innerHTML +=`<h1>${cityName}</h1>`
        weatherContainer.innerHTML += `<p>${currentTime()}</p>`
        weatherContainer.innerHTML +=`<p>${weatherDescription}</p>`

        sunRiseSet.innerHTML +=`<p>sunrise ${sunriseTime}</p>`
        sunRiseSet.innerHTML +=`<p>sunset ${sunsetTime}</p>`
    })

//Fetch the API from Open Weather and construct a forecast for the coming 4-5 days
fetch(searchString("forecast", "Stockholm,Sweden"))
    .then((response) => (response.json()))
    .then((json) => {
        const noonWeather = json.list.filter((item) => item.dt_txt.includes("12:00:00"))

        let today = new Date().toDateString()
        let iterationNum = 1

        noonWeather.forEach((item) => {
            let day = new Date(item.dt_txt)
            let windSpeed = item.wind.speed

            let weatherIcon = createIcon(item.weather[0].icon)
            let weatherDescription = item.weather.description

            let temperature = Math.round(item.main.temp *10)/10

            if (day.toDateString() === today) {}
            else {
                addForecastRows(iterationNum, day, weatherIcon, weatherDescription, temperature, windSpeed)
                iterationNum ++
            }
        })
})

//Adding data from the fetched forcast to a div in the HTML
const addForecastRows = 
(iter, date, weatherIcon, weatherDescription, temperature, windSpeed) => {
    const forecastRow = document.getElementById(`forecastRow${iter}`)

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let dayOfWeek = weekDays[date.getDay()]
    forecastRow.innerHTML += `<p>${dayOfWeek}</p>`
    
    forecastRow.innerHTML += `<img src = "${weatherIcon}", alt = "${weatherDescription}", width = "60px"></img>`

    forecastRow.innerHTML += `<p>${temperature}°C</p>`

    forecastRow.innerHTML +=`<p>${windSpeed} m/s</p>`
}

//Function for current time
const currentTime = () => {
    let date = new Date()
    let hours = date.getHours()
        if (hours < 10) {
            hours = `0${hours}`
        }
    let minutes = date.getMinutes()
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
    return `Time: ${hours}:${minutes}`
}

//Creating the icon's cource URL
const createIcon= (iconID) => {
    let base_URL = `https://openweathermap.org/img/wn/`
    let icon = iconID
    let end_URL = `@2x.png`

    return base_URL+icon+end_URL
}
