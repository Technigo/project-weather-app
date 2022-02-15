const weather = document.getElementById("weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const icon = document.getElementById("icon");
const message = document.getElementById("message");
const forecastWrapper = document.getElementById("forecastWrapper");

const fetchData = () => {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=stockholm&units=metric&appid=7908c37d2eaed12abeb790e5b0154ee9"
    fetch(API_URL)
    .then((res) => res.json()) 
    .then(data => {
        weather.innerHTML = data.weather[0].description
    }) 
 }
 fetchData() 
 
