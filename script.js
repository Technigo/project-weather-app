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
        city.innerHTML = `${json.name}`;

        let currentTempValue = `${json.main.temp}`
        currentTempValue = Number(currentTempValue).toFixed(1);
        currentTemp.innerHTML += `${currentTempValue}°c`

        weatherDescrValue.innerHTML = `${json.weather[0].description}`

        let feelsLikeTempValue = `${json.main.feels_like}`
        feelsLikeTempValue = Number(feelsLikeTempValue).toFixed(1);
        feelsLikeTemp.innerHTML += `${feelsLikeTempValue}°c`

        let sunriseValue = `${json.sys.sunrise}`
        let sunriseValueNumber = Number(sunriseValue)
        let time = new Date(sunriseValueNumber).getTime(sunriseValueNumber);
        console.log(time)
        let date = new Date(time)
        console.log(date)
        sunrise.innerHTML += date.toString()

        let iconValue = `${json.weather[0].icon}`
        console.log(iconValue)
        currentWeatherIcon.innerHTML = `<img id="currentWeatherIcon" src="http://openweathermap.org/img/wn/${iconValue}.png" />`
    })

fetch(apiUrlForecast)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json.cod)
        const weekdayOne = document.getElementById('dayOne')
        let iconValue2 = `${json.list[0].weather[0].icon}`
        console.log(iconValue2)
        weekdayOne.innerHTML = `
            <p>Mon</p>
            <img src="http://openweathermap.org/img/wn/${iconValue2}.png" />
            <p>Max ${json.list[0].main.temp_max}°/ Min ${json.list[0].main.temp_min} °C</p>
        `
    })