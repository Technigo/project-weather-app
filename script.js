const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=800ddea444fa8b1532e3492f09d4432d'
const apiUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=800ddea444fa8b1532e3492f09d4432d'

fetch(apiUrl)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const city = document.getElementById('city')
        const currentTemp = document.getElementById('currentTemp')
        const feelsLikeTemp = document.getElementById('feelsLikeTemp')
        const weatherDescrValue = document.getElementById('weatherDescription')
        const sunrise = document.getElementById('sunrise')
        const sunset = document.getElementById('sunset')
        const currentWeatherIcon = document.getElementById('currentWeatherIcon')

        // All data content from API for the main section
        city.innerHTML = json.name

        const currentTempValue = (json.main.temp).toFixed(1)
        currentTemp.innerHTML += currentTempValue

        weatherDescrValue.innerHTML = json.weather[0].description

        const feelsLikeTempValue = (json.main.feels_like).toFixed(1)
        feelsLikeTemp.innerHTML += feelsLikeTempValue

        const sunriseValue = new Date((json.sys.sunrise) * 1000)
        sunrise.innerHTML += `0${sunriseValue.getHours()}:${sunriseValue.getMinutes()}`

        const sunsetValue = new Date((json.sys.sunset) * 1000)
        sunset.innerHTML += `${sunsetValue.getHours()}:${sunsetValue.getMinutes()}`

        // Changes the background image in main section to day or night, based on sunrise and sunset.
        const mainContainerChange = ((sunriseValue, sunsetValue) => {

            const mainContainer = document.getElementById('main')
            const currentTime = new Date()

            if (currentTime >= sunriseValue && currentTime < sunsetValue) {
                mainContainer.classList.add('main-day')
            } else {
                mainContainer.classList.add('main-night')
            }
        })

        mainContainerChange(sunriseValue, sunsetValue)

        const iconValue = json.weather[0].icon
        currentWeatherIcon.innerHTML += ` <img class="current-weather-icon" src="http://openweathermap.org/img/wn/${iconValue}.png"/> `
    })

fetch(apiUrlForecast)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const filteredForecast = json.list.filter(day => day.dt_txt.includes('12:00'))
        const weeklyForecastContainer = document.getElementById('weeklyForecast')

        // All data content from API for the forecast section
        filteredForecast.forEach((day, index) => {
            const iconValue2 = filteredForecast[index].weather[0].icon
            const weekDay = new Date((filteredForecast[index].dt) * 1000)
            const forecastTemp = (filteredForecast[index].main.temp).toFixed(1)
            const feelsLikeTempForecast = (filteredForecast[index].main.feels_like.toFixed(1))

            // Inserts the HTML structure and the values for the forecast section
            weeklyForecastContainer.innerHTML += `
            <div class="weekday-forecast-div">
                <div class="weekday">
                    <p>${weekDay.toLocaleDateString('en-US', {weekday: 'short'})}</p>
                </div>
                <div class="icons-and-temp">
                    <img class="forecast-icons" src="http://openweathermap.org/img/wn/${iconValue2}.png"/>
                    <p>${forecastTemp} °</p>
                    <p class="feels-like-temp-text">Feels like ${feelsLikeTempForecast} °C</p>
                </div>
            </div>
        `
        })
    })