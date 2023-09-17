//select from data variable the values you want to inject into the DOM
const forecast = document.getElementById("forecast")

const MY_API_KEY = "b0f999409176c1b94b357122dd7da817"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID="
const URL = `${BASE_URL}${MY_API_KEY}`

const sunrise = ""
const sunset = ""
const arrayForecast = ""


const fetchWeather = () => {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            forecast.innerText = data.weather[0].description


        })
        .catch((error) => console.log("Error X", error))
}



fetchWeather()
