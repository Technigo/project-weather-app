
/* JSON file - Weather API */
const API_KEY = "3cc790b1653416aade4ba256c95e0c67"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
let cityWeather = "Berlin";

const URL = `${BASE_URL}?q=${cityWeather}&units=metric&APPID=${API_KEY}`
console.log(URL)

/* DOM selectors */
const weatherTitle = document.getElementById("title-weather")
const weatherIcon = document.getElementById("icon-weather")
const weatherType = document.getElementById("upper-info-weather-type")
const weatherTemp = document.getElementById("upper-info-weather-temp")
const timeSunrise = document.getElementById("upper-info-sunrise-time")
const timeSunset = document.getElementById("upper-info-sunset-time")/* 
const cityWeather = document.getElementById("city-input").value */


// Function to fetch weather data based on the city name




/* Sparad data från JSON-fil */
const showNewHTML = (data) => {

    /* onst cityName = data.name;
    cityWeather.innerText = cityName */

    const description = data.weather[0].description
    weatherType.innerText = description

    const temp = data.main.temp
    const roundedTemp = temp.toFixed(1);
    weatherTemp.innerText = roundedTemp

    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    // Convert UNIX time to a readable format
    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);
    // Format the time (HH:MM:SS)
    const sunriseFormatted = sunriseDate.toLocaleTimeString();
    const sunsetFormatted = sunsetDate.toLocaleTimeString();

    timeSunrise.innerText = sunriseFormatted
    timeSunset.innerText = sunsetFormatted
    
    if (description.includes("clear")) {
        document.body.classList.remove("weather-card-clear", "weather-card-rain", "weather-card-cloudy");  // Rensa tidigare klasser
        weatherTitle.innerText = `Get your sunnies on. ${cityWeather} is looking rather great today.`;
        weatherIcon.src = "../assets/design-2/noun_Sunglasses_2055147.svg";  // Bild för soligt väder
        document.body.classList.add("weather-card-clear");
    } else if (description.includes("rain")) {
        document.body.classList.remove("weather-card-clear", "weather-card-rain", "weather-card-cloudy");  // Rensa tidigare klasser
        weatherTitle.innerText = `Don’t forget your umbrella. It’s wet in ${cityWeather} today.`;
        weatherIcon.src = "../assets/design-2/noun_Umbrella_2030530.svg";  // Bild för regnigt väder
        document.body.classList.add("weather-card-rain");
    } else if (description.includes("cloud")) {
        document.body.classList.remove("weather-card-clear", "weather-card-rain", "weather-card-cloudy");  // Rensa tidigare klasser
        weatherTitle.innerText = `Light a fire and get cosy. ${cityWeather} is looking grey today. `;
        weatherIcon.src = "../assets/design-2/noun_Cloud_1188486.svg";  // Bild för molnigt väder
        document.body.classList.add("weather-card-cloudy");
    } else {
        document.body.classList.remove("weather-card-clear", "weather-card-rain", "weather-card-cloudy");  // Rensa tidigare klasser
        weatherTitle.innerText = `${cityWeather} is offering a weather today thats not in my vocabulary.`;
        weatherIcon.src = "../assets/design-2/noun_Cloud_1188486.svg";  // Bild för molnigt väder
        document.body.classList.add("weather-card-cloudy");
    }
}

/* Hämta data/väderlek från JSON-fil */
    fetch(URL) 
        .then(response => response.json())
        .then(data => {
            console.log(data)

            showNewHTML(data)
        
        
        })
