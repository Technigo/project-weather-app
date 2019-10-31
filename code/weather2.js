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
        let todaysWeather = json.weather[0].description
        let todaysWeatherMain = json.weather[0].main

        if (todaysWeather === "scattered clouds"
            || todaysWeather === "few clouds") {
            theDescription.src = "./icons_white/scattered_cloud.png"
        } else if (todaysWeather === "overcast clouds"
            || todaysWeather === "broken clouds") {
            theDescription.src = "./icons_white/overcast_cloud.png"
        } else if (todaysWeather === "clear sky") {
            theDescription.src = "./icons_white/clear_sky.png"
        } else if (todaysWeatherMain === "Snow") {
            theDescription.src = "./icons_white/snow.png"
        } else if (todaysWeather === "light rain"
            || todaysWeather === "moderate rain"
            || todaysWeatherMain === "Drizzle") {
            theDescription.src = "./icons_white/rain_light.png"
        } else if (todaysWeather === "heavy intensity rain"
            || todaysWeather === "very heavy rain"
            || todaysWeather === "extreme rain"
            || todaysWeather === "freezing rain"
            || todaysWeather === "light intensity shower rain"
            || todaysWeather === "shower rain"
            || todaysWeather === "heavy intensity shower"
            || todaysWeather === "ragged shower rain") {
            theDescription.src = "./icons_white/rain_heavy.png"
        } else if (todaysWeatherMain === "Thunderstorm") {
            theDescription.src = "./icons_white/ligthning.png"
        } else {
            theDescription.src = "./icons_white/window.png"
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

            //ICON FOR TODAYS WEATHER//
            let getForecast = json.list
            let forecastMain = json.list

            /*if (todaysWeather === "scattered clouds"
                || todaysWeather === "few clouds") {
                theDescription.src = "./icons/scattered_cloud.png"
            } else if (todaysWeather === "overcast clouds"
                || todaysWeather === "broken clouds") {
                theDescription.src = "./icons/overcast_cloud.png"
            } else if (todaysWeather === "clear sky") {
                theDescription.src = "./icons/clear_sky.png"
            } else if (todaysWeatherMain === "Snow") {
                theDescription.src = "./icons/snow.png"
            } else if (todaysWeather === "light rain"
                || todaysWeather === "moderate rain"
                || todaysWeatherMain === "Drizzle") {
                theDescription.src = "./icons/rain_light.png"
            } else if (todaysWeather === "heavy intensity rain"
                || todaysWeather === "very heavy rain"
                || todaysWeather === "extreme rain"
                || todaysWeather === "freezing rain"
                || todaysWeather === "light intensity shower rain"
                || todaysWeather === "shower rain"
                || todaysWeather === "heavy intensity shower"
                || todaysWeather === "ragged shower rain") {
                theDescription.src = "./icons/rain_heavy.png"
            } else if (todaysWeatherMain === "Thunderstorm") {
                theDescription.src = "./icons/ligthning.png"
            } else {
                theDescription.src = "./icons/window.png"
            }*/
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            console.log(dayNames[todaysDate.getDay()])
            const wholeDate = new Date(date)
            const dayName = (dayNames[wholeDate.getDay()])

            forecastDates.innerHTML += `<li>${dayName}</li>`
            forecastDescription.innerHTML += `<li>symbol</li>`
            forecastMinMax.innerHTML += `<li>${Math.round(minTemp * 10) / 10} C° / ${Math.round(maxTemp * 10) / 10} C°</li>`
        })

    })

//const showKalmar = () => {
 //   document.getElementById("switchCity").onclick
//}