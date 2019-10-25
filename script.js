const apiKey = '79a5016dc063fba5a823f15d23b3fb1f'
let city = 'Stockholm, Sweden'

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
        Sunrise: ${("0" + sunrise.getHours()).slice(-2)}:${("0" + sunrise.getMinutes()).slice(-2)}<br>
        Sunset: ${("0" + sunset.getHours()).slice(-2)}:${("0" + sunset.getMinutes()).slice(-2)}`
    })
    .catch((err) => {
        console.log('caught error', err)
    })

fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&APPID=${apiKey}`)
    .then((response) => {
        return response.json()
    })
    .then((json => {
        console.log(json)

        json.list.forEach(weather => {
            let dt = new Date(0)
            dt.setUTCSeconds(weather.dt)
            document.getElementById("forecast").innerHTML += `${dt.getDate()}/${dt.getMonth()} ${("0" + dt.getHours()).slice(-2)}:${("0" + dt.getMinutes()).slice(-2)} ${weather.weather[0].description}<br>`
        })
    }))
    .catch((err) => {
        console.log('caught error', err)
    })