const city = document.getElementById('city')
const apiKey = "c2889b12ee617ea787319a19a98a5906"
const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=Toronto,Canada&units=metric&APPID=c2889b12ee617ea787319a19a98a5906`
const weatherForecast = `http://api.openweathermap.org/data/2.5/forecast?q=Toronto,Canada&units=metric&APPID=c2889b12ee617ea787319a19a98a5906`
const temperature = document.getElementById('temperature')
const description = document.getElementById('description')
//Fetch with JSON
fetch("http://api.openweathermap.org/data/2.5/weather?q=Toronto,Canada&units=metric&APPID=c2889b12ee617ea787319a19a98a5906")
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        currentWeatherToday(json)
    })

const currentWeatherToday = (json) => {
    temperature.innerHTML = json.main.temp.toFixed(0.5)
    city.innerHTML = json.name
    description.innerHTML = json.weather[0].description
}
