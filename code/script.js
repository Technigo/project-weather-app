const weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723';
const currentWeatherContainer = document.getElementById("current-weather-container");
const weatherForecastContainer = document.getElementById("weather-forecast-container");

const forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2163e0bcc8eaa7f0951284d8a650a723';

const currentWeather = () => {
fetch(weatherAPI)
.then((respons) => {
    return respons.json();
}) 
.then ((weather) => {
    const weatherTemp = weather.main.temp.toFixed(0)
    const sunrise = new Date(weather.sys.sunrise * 1000)
    const sunriseString = sunrise.toLocaleTimeString('se-SE', {hour: '2-digit', minute:'2-digit'})
    const sunset = new Date(weather.sys.sunset * 1000)
    const sunsetString = sunset.toLocaleTimeString('se-SE', {hour: '2-digit', minute:'2-digit'})
    currentWeatherContainer.innerHTML = `<h1>${weatherTemp} &deg</h1><h2>${weather.name}</h2><p>${weather.weather[0].description}</p><div class="sun"><p>Sunrise: ${sunriseString} </p> <p>Sunset: ${sunsetString} </p></div>`
})

}

const weatherForecast = () => {
    fetch(forecastAPI)
    .then ((response) => {
        return response.json();
    })
    .then ((forecast) => {
        const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'));
        console.log(filteredForecast)
        filteredForecast.forEach((item => {
        const forecastTemp = item.main.temp.toFixed(0)
        const forecastDay = new Date(item.dt * 1000).toLocaleDateString('se-SE', {weekday: 'short'})
        const forecastDescription = item.weather[0].description
        weatherForecastContainer.innerHTML += `<div class="forecast-day"><p>${forecastDay}</p><p>${forecastDescription} - ${forecastTemp} &deg </p></div>`
        }))
        
    })
}


currentWeather();
weatherForecast();