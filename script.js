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
            changeBackground(data)
        })

}
fetchTodaysForecast()

//Function to get five days weather forecast

const fetchFiveDayForecast = () => {
    fetch(FORECAST_URL)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const longForecast = data.list.filter((day) =>
                day.dt_txt.includes("12:00")
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

function changeBackground(data) {

    if (data.weather[0].main === "Cloud") {
        cityName.innerHTML += `
<img src="./design/design2/icons/noun_cloud_1188486.svg">
<h1>Light a fire and get cosy. ${data.name} is looking grey today.</h1>`;
        document.body.style.backgroundColor = "#F4F7F8";
        document.body.style.color = "#F47775";
    } else if (data.weather[0].main === "Rain") {
        cityName.innerHTML += `
<img src="./design/design2/icons/noun_Umbrella_2030530.svg" alt="Umbrella">
<h1>Don't forget your umbrella. It's wet in ${data.name} today.</h1>`;
        document.body.style.backgroundColor = "#BDE8FA";
        document.body.style.color = "#164A68";
    } else if (data.weather[0].main === "Clear") {
        cityName.innerHTML += `
<img src="./design/design2/icons/noun_Sunglasses_2055147.svg" alt="Sunglasses">
<h1>Get your sunnies on. ${data.name} is looking rather great today.</h1>`;
        document.body.style.backgroundColor = "#F7E9B9";
        document.body.style.color = "#2A5510";
    } else {
        cityName.innerHTML += ` 
<img src="./design/design2/icons/noun_Umbrella_white.svg" alt="Umbrella">
<h1>Get your warm coat on. It's cold in ${data.name} today.</h1>`;
        document.body.style.backgroundColor = "#58537B";
        document.body.style.color = "#FFFFFF";
    }
}
