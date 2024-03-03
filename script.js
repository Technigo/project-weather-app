// API link and api-key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=44824c3e427da3f4fd991b8131d46347"
const KEY = "44824c3e427da3f4fd991b8131d46347"

//DOM-selectors
const weatherInfo = document.getElementById("weatherInfo")
const cityName = document.getElementById("cityName")
const weatherForecast = document.getElementById("weatherForecast")

//Function to get weather info through API-link
const fetchTodaysForecast = () => {
    fetch(BASE_URL)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const sunriseInfo = data.sys.sunrise
            const sunriseHour = new Date(sunriseInfo * 1000).getHours()
            const sunriseMin = new Date(sunriseInfo * 1000).getMinutes()
            const sunsetTime = (`${sunriseHour}:${sunriseMin}`)

            weatherInfo.innerHTML = `
    ${data.weather[0].description} | ${data.main.temp.toFixed(1)}° 
    <p>Sunrise ${sunriseInfo}</p><p>Sunset ${sunsetTime}</p>`
        })

}
fetchTodaysForecast()