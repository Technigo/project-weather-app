const apiKey = '79a5016dc063fba5a823f15d23b3fb1f'
let city = 'Stockholm'
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        let sunrise = new Date(0)
        let sunset = new Date(0)
        sunrise.setUTCSeconds(json.sys.sunrise)
        sunset.setUTCSeconds(json.sys.sunset)

        document.getElementById("weather").innerHTML += `Wheater in ${json.name} now:<br>
        ${json.weather[0].description}<br>
        Temperature: ${json.main.temp.toFixed(1)}<br>
        Sunrise: ${sunrise.getHours()}:${sunrise.getMinutes()}<br>
        Sunset: ${sunset.getHours()}:${sunset.getMinutes()}`
    })