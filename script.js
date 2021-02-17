const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=800ddea444fa8b1532e3492f09d4432d'
const apiUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=800ddea444fa8b1532e3492f09d4432d'
const city = document.getElementById('city')
const currentTemp = document.getElementById('currentTemp')
const feelsLikeTemp = document.getElementById('feelsLikeTemp')
const weatherDescrValue = document.getElementById('weatherDescription')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const currentWeatherIcon = document.getElementById('currentWeatherIcon')


fetch(apiUrl)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        city.innerHTML = json.name

        let currentTempValue = json.main.temp
        currentTempValue = currentTempValue.toFixed(1)
        currentTemp.innerHTML += `${currentTempValue}°c`

        weatherDescrValue.innerHTML = json.weather[0].description

        let feelsLikeTempValue = json.main.feels_like
        feelsLikeTempValue = feelsLikeTempValue.toFixed(1)
        feelsLikeTemp.innerHTML += `${feelsLikeTempValue}°c`

        let sunriseValue = new Date((json.sys.sunrise) * 1000)
        sunrise.innerHTML += `0${sunriseValue.getHours()}:${sunriseValue.getMinutes()}`

        let sunsetValue = new Date((json.sys.sunset) * 1000)
        sunset.innerHTML += `${sunsetValue.getHours()}:${sunsetValue.getMinutes()}`

        let iconValue = json.weather[0].icon
        console.log(iconValue)
        currentWeatherIcon.innerHTML = ` <img id = "currentWeatherIcon"
            src = "http://openweathermap.org/img/wn/${iconValue}.png"/> `
    })

fetch(apiUrlForecast)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const filteredForecast = json.list.filter(day => day.dt_txt.includes('12:00'))
        console.log(filteredForecast)

        const weeklyForecastContainer = document.getElementById('weeklyForecast')

        filteredForecast.forEach((day, index) => {
            let iconValue2 = filteredForecast[index].weather[0].icon
            let weekDay = new Date((filteredForecast[index].dt) * 1000)
            const forecastTemp = (filteredForecast[index].main.temp).toFixed(1)
            const feelsLikeTempForecast = (filteredForecast[index].main.feels_like.toFixed(1))

            console.log('hej', index)

            weeklyForecastContainer.innerHTML += `
            <div class="weekday">
                <p>${weekDay.toLocaleDateString('en-US', {weekday: 'short'})}</p>
                <img src = "http://openweathermap.org/img/wn/${iconValue2}.png"/>
                <p>${forecastTemp} °C</p>
                <p>Feels like ${feelsLikeTempForecast} °C</p>
            </div>
        `
        })
    })