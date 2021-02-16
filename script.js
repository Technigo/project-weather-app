const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=800ddea444fa8b1532e3492f09d4432d'
const city = document.getElementById('city')
const currentTemp = document.getElementById('currentTemp')
const feelsLikeTemp = document.getElementById('feelsLikeTemp')
const weatherDescrValue = document.getElementById('weatherDescription')

fetch(apiUrl)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        city.innerHTML = `${json.name}`;

        let currentTempValue = `${json.main.temp}`
        currentTempValue = Number(currentTempValue).toFixed(1);
        currentTemp.innerHTML += `${currentTempValue}`

        weatherDescrValue.innerHTML = `${json.weather[0].description}`

        let feelsLikeTempValue = `${json.main.feels_like}`
        feelsLikeTempValue = Number(feelsLikeTempValue).toFixed(1);
        feelsLikeTemp.innerHTML += `${feelsLikeTempValue}`

    })