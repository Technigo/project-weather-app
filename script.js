const place = "Lisbon,Portugal"
const APIkey = "ead60d2e1c3fff29cccec12bd6a43922"

// TODAY

const header = document.getElementById('weather')

fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=${APIkey}`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {

        // description

        /* json.weather.forEach((element) => {
            container.innerHTML = `<p> The overal weather: ${element.description}. </p>`
        }) */

        // temperature 

        /* const temp = Math.round(+json.main.temp)
        container.innerHTML += `<p> The temperature is ${temp} °C.</p>` */

        // description and temperature together

        const temp = Math.round(+json.main.temp)
        const despcription = json.weather.forEach((element) => {
            header.innerHTML = `<p> ${element.description} | ${temp} °C. </p>`
        })

        //time of sunrise/sunset in hours:minutes:seconds GMT

        const sunrise = new Date(json.sys.sunrise * 1000);
        const sunset = new Date(json.sys.sunset * 1000)

        //time as hh:mm

        const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        header.innerHTML += `<p> sunrise ${sunriseShort}</p>`
        header.innerHTML += `<p> sunset ${sunsetShort}</p>`

    })

.catch((err) => {
    console.log('caught errors', err)
})

const container = document.getElementById('greetings')

fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=${APIkey}`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {

        // city

        const city = json.name
        container.innerHTML = `<h1>Current weather in ${city}</h2>`

    })

.catch((err) => {
    console.log('caught errors', err)
})

// FORECAST

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

        // console.log(date, temps)

        const minTemp = Math.min(...temps)
        const maxTemp = Math.max(...temps)
        const avTemp = (minTemp + maxTemp) / 2

        // console.log(date, minTemp, maxTemp, avTemp)

        forecastDiv.innerHTML += `<li>${date} - ${avTemp.toFixed(0)} °C</li>`

    })
}

fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&APPID=${APIkey}`)
    .then((res) => res.json())
    .then(handle5DayForecast)