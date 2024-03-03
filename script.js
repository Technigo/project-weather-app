// API link and api-key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=44824c3e427da3f4fd991b8131d46347"
const KEY = "44824c3e427da3f4fd991b8131d46347"
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=44824c3e427da3f4fd991b8131d46347"

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
            const sunriseTime = (`${sunriseHour}:${sunriseMin}`)

            const sunsetInfo = data.sys.sunset
            const sunsetHour = new Date(sunsetInfo * 1000).getHours()
            const sunsetMin = new Date(sunsetInfo * 1000).getMinutes()
            const sunsetTime = (`${sunsetHour}:${sunsetMin}`)

            weatherInfo.innerHTML = `
    ${data.weather[0].description} | ${data.main.temp.toFixed(1)}° 
    <p>Sunrise ${sunriseTime}</p><p>Sunset ${sunsetTime}</p>`
        })

}
fetchTodaysForecast()

//Function to get five days weater forecast

const fetchFiveDayForecast = () => {
    fetch(FORECAST_URL)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const longForecast = data.list.filter((day) =>
                day.dt_txt.includes("13:00")
            )
            longForecast.forEach((day) => {
                const weekdayName = new Date(day.dt * 1000)
                const weatherTemperature = day.main.temp.toFixed()

                weatherForecast.innerHTML += `
            <div class="days">${new Date(weekdayName).toLocaleDateString("en", {
                    weekday: "short",
                })}</div>
            <div class="temp">${weatherTemperature}°</div>`
            })
        })
}
fetchFiveDayForecast()