//select from data variable the values you want to inject into the DOM
const weather = document.getElementById("weather")
const temperature = document.getElementById("temperature")
const city = document.getElementById("city")

const MY_API_KEY = "b0f999409176c1b94b357122dd7da817"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID="
const URL = `${BASE_URL}${MY_API_KEY}`




const fetchWeather = () => {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            updateHTML(data)
        })
        .catch((error) => console.log("Error X", error))
}

const updateHTML = (data) => {

    weather.innerText = data.weather[0].description
    temperature.innerText = data.main.temp
    city.innerText = data.name
}

fetchWeather()
