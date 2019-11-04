const theLocation = document.getElementById("location")
const theTemperature = document.getElementById("temperature")
const minMax = document.getElementById("todaysMinMax")
const wind = document.getElementById("todaysWind")
const theDescription = document.getElementById("description")
const sunriseTime = document.getElementById("sunrise")
const sunsetTime = document.getElementById("sunset")
const city = "Stockholm,Sweden"

let todaysDate = new Date()

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=7309e4a5829fafe809df835ad95f18ea`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        theLocation.innerHTML = json.name

        //TODAY'S TEMP//
        let temperatureRounded = json.main.temp.toFixed(1)
        theTemperature.innerHTML = `${temperatureRounded} C°`

        //COLD OR WARM TEXT-SHADOW ON °//
        if (Math.sign(temperatureRounded) === 0 || Math.sign(temperatureRounded) === -1) {
            theTemperature.innerHTML = `${temperatureRounded} C<span style="text-shadow:2px 2px 4px aqua">°</span>`
        } else {
            theTemperature.innerHTML = `${temperatureRounded} C<span style="text-shadow:2px 2px 4px tomato">°</span>`
        }

        //TODAYS WEATHER ICON//
        theDescription.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="weathericon"/>`

        //MIN-MAX TEMP OF TODAY//
        let minRounded = Math.round(json.main.temp_min * 10) / 10
        let maxRounded = Math.round(json.main.temp_max * 10) / 10

        minMax.innerHTML = `${maxRounded} C° / <span style="color:rgb(179, 179, 179)">${minRounded} C°</span>`
        todaysWind.innerHTML = `${Math.round(json.wind.speed)} m/s`

        //SUNRISE SUNSET//
        let sunriseHoursMinutes = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let sunsetHoursMinutes = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        sunriseTime.innerHTML = `${sunriseHoursMinutes}`
        sunsetTime.innerHTML = `${sunsetHoursMinutes}`

        //WHICH BACKGROUND TO SHOW//
        let timeNow = todaysDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        if (timeNow >= sunriseHoursMinutes && timeNow <= sunsetHoursMinutes) {
            document.getElementById("body").style.background = "#5c94bd"
        }
    })


//FORECAST///

const dates = {}
const forecastDates = document.getElementById("forecastDates")
const forecastDescription = document.getElementById("forecastDescription")
const forecastMinMax = document.getElementById("forecastMinMax")

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=7309e4a5829fafe809df835ad95f18ea`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        json.list.forEach((weather) => {
            const date = weather.dt_txt.split(' ')[0]
            if (dates[date]) {
                dates[date].push(weather)
            }
            else {
                dates[date] = [weather]
            }
        })

        Object.entries(dates).forEach((item, index) => {
            const date = item[0]
            const weatherValues = item[1]
            const temps = weatherValues.map((value) => value.main.temp)
            const minTemp = Math.min(...temps)
            const maxTemp = Math.max(...temps)

            if (index === 0) {
                return
            }

            //DATES TO DAYS//
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            const wholeDate = new Date(date)
            const dayName = (dayNames[wholeDate.getDay()])

            //FORECAST DAYS, ICONS, MAX-MIN-TEMP//
            console.log(typeof weatherValues)
            try {
                forecastDescription.innerHTML += `<li id="weatherIcons">
            <img src="https://openweathermap.org/img/wn/${weatherValues[3].weather[0].icon}@2x.png" alt="weathericons"/></li>`
                forecastDates.innerHTML += `<li>${dayName}</li>`
                forecastMinMax.innerHTML += `<li>${maxTemp.toFixed()} C° / <span style="color:rgb(179, 179, 179)">${minTemp.toFixed()} C°</span></li>`
            } catch (error) {
                console.log(`Next day of forecast will come soon`)
            }

        })

    })