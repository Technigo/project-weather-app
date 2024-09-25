//Stockholm current weather API
//URL current weather Stockholm + city + API key
// https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=959cb256f265cbbe5b4051e4a40be3af

// True constants
const API_KEY = "959cb256f265cbbe5b4051e4a40be3af";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

let city = "Stockholm";

const URL = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`;
console.log(URL)

// DOM selectors
// const place = document.getElementById("temperature");

fetch(URL)
  .then(response => response.json())
  .then(data => {

    cityName = data.name;
    //Log to console - remove later
    console.log(cityName)

    const temp = data.main.temp.toFixed(1);
    //Log to console - remove later
    console.log(temp)

    const typeOfWeather = data.weather[0].description;
    //Log to console - remove later
    console.log(typeOfWeather)

    const sunriseTime = data.sys.sunrise;
    //Log to console - remove later
    console.log(sunriseTime)

    const sunsetTime = data.sys.sunset;
    //Log to console - remove later
    console.log(sunsetTime)

    document.getElementById("location").innerText = `${cityName}`;
    document.getElementById("temperature").innerText = `${temp}°C`;
    document.getElementById("weather").innerText = `${typeOfWeather}`;
  })

// - The app should have: city name, current temperature, weather description,
//  sunrise/sunset time, 4-day forecast



