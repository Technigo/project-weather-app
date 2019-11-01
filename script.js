const place = "Lisbon,Portugal"
const APIkey = "ead60d2e1c3fff29cccec12bd6a43922"

// TODAY

const header = document.getElementById('weather')

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=${APIkey}`)
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
        const description = json.weather.forEach((element) => {
            header.innerHTML = `<p> ${element.description} | ${temp} °C </p>`
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

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=${APIkey}`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {

        // city

        const city = json.name
        const weatherImage = document.getElementById("weatherImage")

        /* container.innerHTML = `<h1>Get your sunnies ready! ${city} is looking for great weather today!</h2>` */

        /*  if (json.weather === "clouds") {
             container.innerHTML = `<h1>The weather in ${city} is looking cloudy today!`;
         } else {
             container.innerHTML = `<h1>Get your sunnies ready! ${city} is looking for great weather today!</h2>`
         } */


        //IF STATEMENT BASED ON WEATHER ID = json.weather[0].id

        const id = json.weather[0].id

        // BACKGROUD

        if (id >= 200 && id <= 232) {
            document.body.style.backgroundColor = "#003366"
            document.body.style.color = "#c2e2e2"
        } else if (id >= 300 && id <= 531) {
            document.body.style.backgroundColor = "#7EB0DA"
        } else if (id >= 600 && id <= 622) {
            document.body.style.backgroundColor = "#D8DBE2"
        } else if (id >= 701 && id <= 781) {
            document.body.style.backgroundColor = "#DFE9EB"
        } else if (id === 800) {
            document.body.style.backgroundColor = "#FFE900"
        } else if (id >= 801 && id <= 804) {
            document.body.style.backgroundColor = "#68A9E2"
        }

        // GREETING

        if (id >= 200 && id <= 232) {
            container.innerHTML = `<h1>Afraid of a little lightning? ${city} is looking for a few thunders today!</h2>`
        } else if (id >= 300 && id <= 531) {
            container.innerHTML = `<h1>Get your umbrella ready! ${city} is looking for a rain today!</h2>`
        } else if (id >= 600 && id <= 622) {
            container.innerHTML = `<h1>Get your beanie ready! ${city} is looking for snow today!</h2>`
        } else if (id >= 701 && id <= 781) {
            container.innerHTML = `<h1>Missing London? ${city} is looking a foggy weather today!</h2>`
        } else if (id === 800) {
            /*  if (nightTime) { */
            /* container.innerHTML = `<h1>When was the last time you watch the stars? ${city} is good place to find some tonight!</h2>`
            } else { */
            container.innerHTML = `<h1>Get your sunnies ready! ${city} is looking for a lot of sun today!</h2>`
        } else if (id >= 801 && id <= 804) {
            container.innerHTML = `<h1>Don't forget your favourite hoodie today! Could be a little cloudy in ${city} today!</h2>`
        }

        // PICTURES


        if (id >= 200 && id <= 232) {
            weatherImage.src = "thor.png"
        } else if (id >= 300 && id <= 531) {
            weatherImage.src = "umbrella.png"
        } else if (id >= 600 && id <= 622) {
            weatherImage.src = "snow.png"
        } else if (id >= 701 && id <= 781) {
            weatherImage.src = "fog.png"
        } else if (id === 800) {
            /* if (nightTime) {
                weatherImage.src = "moon.png"
            } else { */
            weatherImage.src = "glasses.png"
        } else if (id >= 801 && id <= 804) {
            weatherImage.src = "cloud.png"
        }

        /* .catch((err) => {
                console.log('caught errors', err)
            }
        } */
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

        /*  const days = [
             'Sunday',
             'Monday',
             'Tuesday',
             'Wednesday',
             'Thursday',
             'Friday',
             'Saturday'
         ] */

        // console.log(date, minTemp, maxTemp, avTemp)

        forecastDiv.innerHTML += `<li>${date} ${avTemp.toFixed(0)}°C</li>`

    })
}

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&APPID=${APIkey}`)
    .then((res) => res.json())
    .then(handle5DayForecast)