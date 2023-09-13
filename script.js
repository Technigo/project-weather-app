const weatherContainer = document.getElementById('currentWeather')
const weatherApp = document.getElementById('weatherApp')
const sunRiseSet = document.getElementById('sunRiseSet')
const weatherForecast = document.getElementById('weatherForecast')

//create a search string
const appID = "d8d8bd8fc9a245def8c2bd16cb32ba83"
const units = "metric"
const baseURL = "https://api.openweathermap.org/data/2.5/"

const searchString = (searchTerm, searchCity) => {
    return (`${baseURL}${searchTerm}?q=${searchCity}&units=${units}&APPID=${appID}`)
}


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

        // weatherContainer.innerHTML = ""
        weatherContainer.innerHTML +=`   <div class="currentTemp">
        <div class="tempNumber"><p>${temperature}</p></div>
        <div class="units"><p>°C</p></div>
      </div>
      `
        weatherContainer.innerHTML +=`<h1>${cityName}</h1>`
        currentTime()
        weatherContainer.innerHTML +=`<p>${weatherDescription}</p>`

        sunRiseSet.innerHTML +=`<p>sunrise ${sunriseTime}</p>`
        sunRiseSet.innerHTML +=`<p>sunset ${sunsetTime}</p>`
    })

fetch(searchString("forecast", "Stockholm,Sweden"))
    .then((response) => (response.json()))
    .then((json) => {

        const noonWeather = json.list.filter((item) => item.dt_txt.includes("12:00:00"))

        const weekDays = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"]
        let today = new Date().toDateString()

        noonWeather.forEach((item) => {
            let day = new Date(item.dt_txt)
            let windSpeed = item.wind.speed

            if (day.toDateString() === today) {}
            else {
                let dayOfWeek = weekDays[day.getDay()]
                weatherForecast.innerHTML += `<p>${dayOfWeek}</p>`
                
                weatherIcon = createIcon(item.weather[0].icon)
                weatherForecast.innerHTML += `<img src="${weatherIcon}", alt="${item.weather.description}"></img>`

                let temperature = Math.round(item.main.temp *10)/10
                weatherForecast.innerHTML += `<p>${temperature}°C</p>`

                weatherForecast.innerHTML +=`<p>${windSpeed} m/s</p>`
            }
        })
})

const createIcon= (iconID) => {
    let base_URL = `https://openweathermap.org/img/wn/`
    let icon = iconID
    let end_URL = `@2x.png`

    return (base_URL+icon+end_URL)
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

        weatherContainer.innerHTML += `<p>Time: ${hours}:${minutes}</p>`
}

/*
const formatDay = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}
*/