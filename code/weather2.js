const theLocation = document.getElementById("location")
const theTemperature = document.getElementById("temperature")
const minMax = document.getElementById("todaysMinMax")
const wind = document.getElementById("todaysWind")
const theDescription = document.getElementById("description")
const sunriseTime = document.getElementById("sunrise")
const sunsetTime = document.getElementById("sunset")

let todaysDate = new Date()

fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7309e4a5829fafe809df835ad95f18ea")
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        theLocation.innerHTML = json.name


        //COLD OR WARM TEXT-SHADOW//
        let temperatureRounded = Math.round(json.main.temp * 10) / 10
        theTemperature.innerHTML = `${temperatureRounded} C°`
        if (Math.sign(temperatureRounded) === 0 || Math.sign(temperatureRounded) === -1) {
            theTemperature.style.textShadow = "4px 4px 6px teal"
        }

        //ICON FOR TODAYS WEATHER//
        if (json.weather[0].description === "scattered clouds") {
            theDescription.src = "./icons_white/scattered_cloud.png"
        } else if (json.weather[0].description === "overcast clouds") {
            theDescription.src = "./icons_white/overcast_cloud.png"
        }
        console.log(json.weather)

        //MIN-MAX TEMP OF TODAY//
        let minRounded = Math.round(json.main.temp_min * 10) / 10
        let maxRounded = Math.round(json.main.temp_max * 10) / 10

        minMax.innerHTML = `${maxRounded} C° / ${minRounded} C°`
        todaysWind.innerHTML = `${Math.round(json.wind.speed)} m/s`

        //SUNRISE SUNSET//
        let sunriseHoursMinutes = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let sunsetHoursMinutes = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        sunriseTime.innerHTML = `${sunriseHoursMinutes}`
        sunsetTime.innerHTML = `${sunsetHoursMinutes}`

        //WHICH BACKGROUND-IMG TO SHOW//
        let timeNow = todaysDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        if (timeNow >= sunriseHoursMinutes && timeNow <= sunsetHoursMinutes) {
            document.getElementById("today").style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(stockholm_day.jpeg)"

        }


    })


const dates = {} //to group the dates//
const forecastDates = document.getElementById("forecastDates")
const forecastDescription = document.getElementById("forecastDescription")
const forecastMinMax = document.getElementById("forecastMinMax")

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7309e4a5829fafe809df835ad95f18ea")
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        json.list.forEach((weather) => {
            const date = weather.dt_txt.split(' ')[0] //to split date from hours//
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

            //To not show today's date//
            if (index === 0) {
                return
            }
            console.log(date)
            forecastDates.innerHTML += `<li>${date}</li>`
            forecastDescription.innerHTML += `<li>symbol</li>`
            forecastMinMax.innerHTML += `<li>${Math.round(minTemp * 10) / 10} C° / ${Math.round(maxTemp * 10) / 10} C°</li>`
        })

    })

//const showKalmar = () => {
 //   document.getElementById("switchCity").onclick
//}