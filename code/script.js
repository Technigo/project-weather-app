//API - but I dont have time to break it down now
/*
const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&APPID=";
const API_KEY = "1e48fdf267ccc8ee33c1c78150dcbab1";
const city = "Umea, Sweden";
*/

//DOM selectors
const handleTemp = document.getElementById("temperature");
const handleName = document.getElementById("city-name");
const weatherDescription = document.getElementById("weather-description");

//Fetching the API
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1"
).then(response => response.json())
    .then(data => )
