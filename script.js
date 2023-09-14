const city = document.getElementById('city')
const weather = document.getElementById('weather')
const temperature = document.getElementById('teperature')
const forecast = document.getElementById('forcast')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')

const API_KEY = "b881032f7a405f3e6e05ebbfb98e3e49"

let cityName
const url = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY"

const fetchWeather = () => {
    fetch(url)
        .then((respons) => respons.json())
        .then((data) => {
            console.log(data)
            city.innerHTML = `${data.name}`;
            weather.innerHTML = `${data.weather[0].description}`;
            temperature.innerHTML = `${data.main.temp}`;
        })
        .catch((error) => {
            console.log('Error', error)
        });

} 