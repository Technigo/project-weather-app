
const API_KEY = "3cc790b1653416aade4ba256c95e0c67"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
let cityWeather = "Stockholm"

const URL = `${BASE_URL}?q=${cityWeather}&units=metric&APPID=${API_KEY}`


/* DOM selectors */
const weatherResponsTitle = document.getElementById("title-weather")
/* const displayLayoutClear =document.getElementById("weather-card-clear").style.display = "block";
const displayLayoutRain=document.getElementById("weather-card-rain").style.display = "block";
const displayLayoutCloudy =document.getElementById("weather-card-cloudy").style.display = "block"; */

weatherResponsTitle.innerText = cityWeather

const showNewHTML = 

fetch(URL) 
    .then(response => response.json())
    .then(data => {
        /* console.log(data) */
        
        if(cityWeather === "Stockholm") {
            const displayLayoutClear =document.getElementById("weather-card-clear").style.display = "block";
            return displayLayoutClear;
        } else if (cityWeather === "Berlin") {
            const displayLayoutRain=document.getElementById("weather-card-rain").style.display = "block";
            return displayLayoutRain;
        } else {
            const displayLayoutCloudy =document.getElementById("weather-card-cloudy").style.display = "block";
            return displayLayoutCloudy;
        }
       
    
    })

   