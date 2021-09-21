const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22'
const API_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22'

const weatherContainer = document.getElementById("weather-container");


const fetchWeather = () => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const temperature = Math.round(data.main.temp * 10) / 10
            weatherContainer.innerHTML = `<h1>${data.name}</h1>`
            weatherContainer.innerHTML += `<h3>${temperature}</h3>`
            weatherContainer.innerHTML += `<h3>${data.weather[0].description}</h3>`
        });
}

fetchWeather();

const fetchWeatherForecast = () => {
    fetch(API_URL_FORECAST)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const tempForecast = data.list.filter((item) => item.dt_txt.includes('12:00')) // array

            const tempForecastFiveDays = tempForecast.map(listItem => {
                console.log(listItem.main.temp)
                const dateVariable = new Date(listItem.dt * 1000).getDay() // gives us 2 as today is tuesday
                const arrayOfWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                const weekdayName = arrayOfWeekdays[dateVariable] //arrayofWeekdays[2]
                console.log(weekdayName)
                console.log(dateVariable)
                return weatherContainer.innerHTML += `<h1> ${weekdayName}: ${listItem.main.temp}</h1>`

            })
        })
}
fetchWeatherForecast()