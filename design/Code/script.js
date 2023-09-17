//select from data variable the values you want to inject into the DOM
const weather = document.getElementById("weather")
const temperature = document.getElementById("temperature")
const city = document.getElementById("city")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const weeklyForecast = document.getElementById("weeklyForecast")
const textSnippet = document.getElementById("textContainer")

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
    temperature.innerHTML = `<h2> ${(data.main.temp).toFixed(0)}°</h2>`
    city.innerText = data.name


    sunrise.innerHTML = `<h2> Sunrise ${data.sys.sunrise} </h2>`
    sunset.innerHTML = `<h2> Sunset ${data.sys.sunset} </h2>`

    //invoke function for changing text snippet here
    //textSnippet(city, weather)
}

//create a function for displaying text snippet specific to the weather using if statement
//const textSnippet = (city, weather) => {
//    if (weather = "cloudy"){
textSnippet.
}
//}


fetchWeather()
