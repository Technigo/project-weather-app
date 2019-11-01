const theLocation = document.getElementById("location")
const theTemperature = document.getElementById("temperature")
const minMax = document.getElementById("todaysMinMax")
const wind = document.getElementById("todaysWind")
const theDescription = document.getElementById("description")
const sunriseTime = document.getElementById("sunrise")
const sunsetTime = document.getElementById("sunset")

let city = "Stockholm,Sweden"

const showKalmar = () => {
    city = "Kalmar,Sweden"
    fetchToday()
    fetchForecast()
}


let todaysDate = new Date()

const fetchToday = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=7309e4a5829fafe809df835ad95f18ea`)
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
                theTemperature.style.textShadow = "2px 2px 4px aqua"
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
            } else if (todaysWeatherMain === "Fog") {
                theDescription.src = "./icons_white/fog.png"
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


}
fetchToday()

//FORECAST///


const dates = {} //to group the dates//
const forecastDates = document.getElementById("forecastDates")
const forecastDescription = document.getElementById("forecastDescription")
const forecastMinMax = document.getElementById("forecastMinMax")

const fetchForecast = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=7309e4a5829fafe809df835ad95f18ea`)
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

                //ICON FOR FORECAST WEATHER//
                let forecastWeather = weatherValues[0].weather[0].description
                let forecastMain = weatherValues[0].weather[0].main


                if (forecastWeather === "scattered clouds"
                    || forecastWeather === "few clouds") {
                    forecastDescription1 = `<img src="./icons_white/scattered_cloud.png">`
                } else if (forecastWeather === "overcast clouds"
                    || forecastWeather === "broken clouds") {
                    forecastDescription1 = `<img src="./icons_white/overcast_cloud.png">`
                } else if (forecastWeather === "clear sky") {
                    forecastDescription1 = `<img src="./icons_white/clear_sky.png">`
                } else if (forecastMain === "Snow") {
                    forecastDescription1 = `<img src="./icons_white/snow.png">`
                } else if (forecastWeather === "light rain"
                    || forecastWeather === "moderate rain"
                    || forecastMain === "Drizzle") {
                    forecastDescription1 = `<img src="./icons_white/rain_light.png">`
                } else if (forecastWeather === "heavy intensity rain"
                    || forecastWeather === "very heavy rain"
                    || forecastWeather === "extreme rain"
                    || forecastWeather === "freezing rain"
                    || forecastWeather === "light intensity shower rain"
                    || forecastWeather === "shower rain"
                    || forecastWeather === "heavy intensity shower"
                    || forecastWeather === "ragged shower rain") {
                    forecastDescription1 = `<img src="./icons_white/rain_heavy.png">`
                } else if (forecastMain === "Thunderstorm") {
                    forecastDescription1 = `<img src="./icons_white/ligthning.png">`
                } else if (forecastMain === "Fog") {
                    forecastDescription1 = `<img src="./icons_white/fog.png">`
                } else {
                    forecastDescription1 = `<img src="./icons_white/window.png">`
                }

                const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                /*console.log(dayNames[todaysDate.getDay()])*/
                const wholeDate = new Date(date)
                const dayName = (dayNames[wholeDate.getDay()])

                console.log(weatherValues[0].weather[0].description)

                forecastDates.innerHTML += `<li>${dayName}</li>`
                forecastDescription.innerHTML += `<li>${weatherValues[0].weather[0].description}</li>`
                forecastMinMax.innerHTML += `<li>${maxTemp.toFixed()} C° / ${minTemp.toFixed()} C°</li>`
            })



            //forecastDescription1.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"`
            //forecastDescription2.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"`
            console.log(dates)
        })


}
fetchForecast()