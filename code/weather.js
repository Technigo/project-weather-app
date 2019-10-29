const theLocation = document.getElementById("location")
const theTemperature = document.getElementById("temperature")
const minMax = document.getElementById("todaysMinMax")
const theDescription = document.getElementById("description")
const sunriseTime = document.getElementById("sunrise")
const sunsetTime = document.getElementById("sunset")


fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7309e4a5829fafe809df835ad95f18ea")
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        theLocation.innerHTML = json.name

        let temperatureRounded = Math.round(json.main.temp * 10) / 10
        theTemperature.innerHTML = `${temperatureRounded} C°`
        theDescription.innerHTML = `Today it's ${json.weather[0].description}`
        console.log(json.weather)
        let minRounded = Math.round(json.main.temp_min * 10) / 10
        let maxRounded = Math.round(json.main.temp_max * 10) / 10

        minMax.innerHTML = `${minRounded} C° / ${maxRounded} C°`

        let sunriseHoursMinutes = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let sunsetHoursMinutes = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        sunriseTime.innerHTML = `Sun rises at ${sunriseHoursMinutes}`
        sunsetTime.innerHTML = `Sun sets at ${sunsetHoursMinutes}`
    })

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7309e4a5829fafe809df835ad95f18ea")


