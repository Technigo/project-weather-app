
const API_KEY = "3cc790b1653416aade4ba256c95e0c67"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
let cityWeather = "Stockholm"

const URL = `${BASE_URL}?q=${cityWeather}&units=metric&APPID=${API_KEY}`
console.log(URL)

/* DOM selectors */
const weatherTitle = document.getElementById("title-weather")
const weatherIcon = document.getElementById("icon-weather")
const weatherType = document.getElementById("upper-info-weather-type")
const weatherTemp = document.getElementById("upper-info-weather-temp")
const timeSunrise = document.getElementById("upper-info-sunrise-time")
const timeSunset = document.getElementById("upper-info-sunset-time")

const showNewHTML = (data) => {

    const description = data.weather[0].description
    weatherType.innerText = description

    const temp = data.main.temp
    weatherTemp.innerText = temp
    

}

fetch(URL) 
    .then(response => response.json())
    .then(data => {
        console.log(data)

        showNewHTML(data)
        
        if (weatherType.includes("clear")) {
            weatherTitle.innerText = `Get your sunnies on. ${cityWeather} is looking rather great today.`;
            weatherIcon.src = "../assets/design-2/noun_Sunglasses_2055147.svg";  // Bild för soligt väder
            document.body.classList.add("weather-card-clear");
        } else if (weatherType.includes("rain")) {
            weatherTitle.innerText = `Don’t forget your umbrella. It’s wet in ${cityWeather} today.`;
            weatherIcon.src = "../assets/design-2/noun_Umbrella_2030530.svg";  // Bild för regnigt väder
            document.body.classList.add("weather-card-rain");
        } else if (weatherType.includes("cloud")) {
            weatherTitle.innerText = "Det är molnigt!";
            weatherIcon.src = "../assets/design-2/noun_Cloud_1188486.svg";  // Bild för molnigt väder
            document.body.classList.add("weather-card-cloudy");
        } 

        /* if(cityWeather === "Stockholm") {
            const displayLayoutClear = document.getElementById("weather-card").style.display = "block";
            const weatherResponsTitle = document.getElementById("title-weather").innerText = `Get your sunnies on. ${cityWeather} is looking rather great today.`;
            const allLayout = displayLayoutClear + weatherResponsTitle;
            return allLayout;
        } else if (cityWeather === "Berlin") {
            const displayLayoutRain = document.getElementById("weather-card-rain").style.display = "block";
            const weatherResponsTitle = document.getElementById("title-weather-rain").innerText = `Don’t forget your umbrella. It’s wet in ${cityWeather} today.`;
            const allLayout = displayLayoutRain + weatherResponsTitle;
            return allLayout;
        } else {
            const displayLayoutCloudy = document.getElementById("weather-card-cloudy").style.display = "block";
            const weatherResponsTitle = document.getElementById("title-weather-cloudy").innerText = `Light a fire and get cosy. ${cityWeather} is looking grey today.`;
            const allLayout = displayLayoutCloudy + weatherResponsTitle;
            return allLayout;
        } */
    })

