const city = document.getElementById('city')
const weather = document.getElementById('weather')
const temperature = document.getElementById('teperature')
const forecast = document.getElementById('') //skriva när html är klar
const sunrise = document.getElementById('')
const sunset =

const API_KEY = "b881032f7a405f3e6e05ebbfb98e3e49"


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