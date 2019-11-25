const container = document.getElementById('weatherApp')

const currentDay = document.getElementById('presentation')
const currentCity = document.getElementById('city')
const currentTemp = document.getElementById('temperature')
const currentCondition = document.getElementById('weather-description')
const currentIcon = document.getElementById('weather-icon')

const currentSunrise = document.getElementById('sunrise')
const currentSunset = document.getElementById('sunset')

const forecastDiv = document.getElementById('forecast')

// This is fetching todays weather together with my API-Key

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4836efb5df99b8aff3e5800f795a77c0')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        //Declare variable for the time of sunrise/sunset
        const timeStampSunrise = json.sys.sunrise
        const timeStampSunset = json.sys.sunset

        //To get sunrise/sunset time in hours:minutes:seconds
        const sunrise = new Date(timeStampSunrise * 1000)
        const sunset = new Date(timeStampSunset * 1000)

        //Declare new variable to show only hh:mm
        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        currentDay.innerHTML += `<h3>Todays Weather in:</h3>`
        currentCity.innerHTML += `<h1>${json.name}</h1>`
        currentTemp.innerHTML += `<h1>${json.main.temp.toFixed(1)} &#8451</h1>`
        currentIcon.innerHTML += `<img id="weatherIcon" src="http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"/>`

        /*const showConditionIcon = () => {
            currentWeather.innerHTML = 
            json.list.forEach(element => {
                const currentWeather = element.weather[0].description
                if (currentWeather === "clear sky") {
                    currentIcon.innerHTML = `<img src"sun.png" alt="Sunny"/>`
                } else if (currentWeather === "few clouds" && currentWeather === "scattered clouds" && currentWeather === "broken clouds") {
                    currentIcon.innerHTML = `<img src"cloud.png" alt="Cloudy"/>`
                } else if (currentWeather === "shower rain" && currentWeather === "rain") {
                    currentIcon.innerHTML = `<img src"rain.png" alt="Rainy"/>`
                } else if (currentWeather === "thunderstorm") {
                    currentIcon.innerHTML = `<img src"thunder.png" alt="Thunder"/>`
                } else if (currentWeather === "	snow") {
                    currentIcon.innerHTML = `<img src"snow.png" alt="Snowing"/>`
                } else {
                    currentIcon.innerHTML = `<img src"mist.png" alt="Mist"/>`
                }
            })
            showConditionIcon()*/


        currentCondition.innerHTML += `<h3>${json.weather[0].description}</h3>`
        currentSunrise.innerHTML += `<img src="sunrise.png" alt="Sunrise">`
        currentSunrise.innerHTML += `<h3> Sunrise: ${sunriseTime}</h3>`
        currentSunset.innerHTML += `<img src="sunset.png" alt="Sunset">`
        currentSunset.innerHTML += `<h3> Sunset: ${sunsetTime}</h3>`



        // This function handles the eventual response from the API (at the bottom)
        const handle5DayForecast = (json) => {
            const dates = {}

            // Iterate over each of these ungrouped weather objects.
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
                const minTemp = Math.min(...temps)
                const maxTemp = Math.max(...temps)

                forecastDiv.innerHTML += `<li> ${date} - min: ${Math.round(minTemp)}, max: ${Math.round(maxTemp)}</li>`
            })
        }

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4836efb5df99b8aff3e5800f795a77c0`)
            .then((res) => res.json())
            .then(handle5DayForecast)
    })

// I am trying to build a function that fetches the diffrent logos depending on what the diffrent icon says, 
//how is it possible to do it, see below??

/*const showConditionIcon = () => {
    const currentWeather = json.weather[0].description

    if (currentWeather === "clear sky") {
        currentIcon.innerHTML = `<img src"sun.png" alt="Sunny"/>`
    } else if (currentWeather === "few clouds" && currentWeather === "scattered clouds" && currentWeather === "broken clouds") {
        currentIcon.innerHTML = `<img src"cloud.png" alt="Cloudy"/>`
    } else if (currentWeather === "shower rain" && currentWeather === "rain") {
        currentIcon.innerHTML = `<img src"rain.png" alt="Rainy"/>`
    } else if (currentWeather === "thunderstorm") {
        currentIcon.innerHTML = `<img src"thunder.png" alt="Thunder"/>`
    } else if (currentWeather === "	snow") {
        currentIcon.innerHTML = `<img src"snow.png" alt="Snowing"/>`
    } else {
        currentIcon.innerHTML = `<img src"mist.png" alt="Mist"/>`
    }
}
showConditionIcon()*/

// This was another try I made, and put it under the .then but it also do not work


/*currentIcon.innerHTML += `(${json.weather[0].description})`

        if (json.weather[0].description === "clear sky") {
            currentIcon.innerHTML = `<img src"sun.png" alt="Sunny"/>`
        } else if (json.weather[0].description === "few clouds" && json.weather[0].description === "scattered clouds" && json.weather[0].description === "broken clouds") {
            currentIcon.innerHTML = `<img src"cloud.png" alt="Cloudy"/>`
        } else if (currentWeather === "shower rain" && currentWeather === "rain") {
            currentIcon.innerHTML = `<img src"rain.png" alt="Rainy"/>`
        } else if (currentWeather === "thunderstorm") {
            currentIcon.innerHTML = `<img src"thunder.png" alt="Thunder"/>`
        } else if (currentWeather === "	snow") {
            currentIcon.innerHTML = `<img src"snow.png" alt="Snowing"/>`
        } else {
            currentIcon.innerHTML = `<img src"mist.png" alt="Mist"/>`
        }*/
