const theLocation = document.getElementById("location")
const theTemperature = document.getElementById("temperature")
const theDescription = document.getElementById("description")
const sunriseTime = document.getElementById("sunrise")
const sunsetTime = document.getElementById("sunset")


fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7309e4a5829fafe809df835ad95f18ea")
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        theLocation.innerHTML = json.name

        let temperatureRounded = Math.round(json.main.temp * 10) / 10
        theTemperature.innerHTML = `${temperatureRounded} C°`
        theDescription.innerHTML = `Today it's ${json.weather.description}`
        console.log(json.weather)


        let time = millisecToHours(json.sys.sunrise)
        console.log(time)

        sunriseTime.innerHTML = `Sun rises at ${json.sys.sunrise} `
        sunsetTime.innerHTML = `Sun sets at ${json.sys.sunset}`
    })


