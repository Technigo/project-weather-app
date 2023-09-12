const weatherContainer = document.getElementById('currentWeather')
const weatherApp = document.getElementById('weatherApp')
const sunRiseSet = document.getElementById('sunRiseSet')
const weatherForecast = document.getElementById('weatherForecast')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d8d8bd8fc9a245def8c2bd16cb32ba83')
    .then((response) => {
        return response.json()})
    .then((json) => {
        let cityName = json.name
        let temperature = Math.round(json.main.temp*10)/10
        let weatherDescription = json.weather[0].description
        let windSpeed = Math.round(json.wind.speed*10)/10

        let sunrise = new Date (json.sys.sunrise * 1000)
        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        let sunset = new Date (json.sys.sunset * 1000)
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        weatherContainer.innerHTML = ""
        weatherContainer.innerHTML +=`<p>${temperature} °C</p>`
        weatherContainer.innerHTML +=`<h1>${cityName}</h1>`
        currentTime()
        weatherContainer.innerHTML +=`<p>${weatherDescription}</p>`

        sunRiseSet.innerHTML +=`<p>sunrise ${sunriseTime}</p>`
        sunRiseSet.innerHTML +=`<p>sunset ${sunsetTime}</p>`

        weatherForecast.innerHTML +=`<p>${windSpeed} m/s</p>`
        
    })

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=d8d8bd8fc9a245def8c2bd16cb32ba83')
    .then((response) => (response.json()))
    .then((json) => {

        const noonWeather = json.list.filter((item) => item.dt_txt.includes("12:00:00"))
        
        noonWeather.forEach((item) => {
            let temperature = Math.round(item.main.temp *10)/10
            weatherForecast.innerHTML += `<p>${temperature}°C</p>`
        })
})


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