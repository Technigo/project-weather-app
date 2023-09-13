//You will need to use the fetch() function in JavaScript to load the weather data into your page, and then select the values you want to inject into the DOM from the JSON which comes from the API.//


//GLOBAL VARIABLES//
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const stadenMin = "Stockholm,Sweden"
const API_KEY = "964a15302a76eed8fe2ddd899c2fb441"

const URL = '${BASE_URL}?q=${stadenMin}&units=metric&APPID=${API_KEY}' // erlik 3 første const?
//FULL URL FRA OPENWEATHERMAP (API) "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=964a15302a76eed8fe2ddd899c2fb441"

console.log(URL)


//FUNCTIONS//
//this function fetches the weather
const fetchWeather = () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=964a15302a76eed8fe2ddd899c2fb441")
        .then((answer) => answer.json())
        .then(weather => {
            // Process the API response data
            console.log(weather)
        })
}

fetchWeather();

