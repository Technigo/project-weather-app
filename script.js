const weatherContainer = document.getElementById("weatherContainer");
const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const weatherDescription = document.getElementById("weatherDescription");
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";
const API_Weather_URL =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";

//v2 -Dynamic (based on user input value) fetch request

// movieSearchBar.addEventListener('change', (event)=>{

fetch(API_URL) //this is when we send something to BE
  .then((res) => res.json()) //this is when we receive the data from BE
  .then((data) => {
    console.log("data", data);

    weatherContainer.innerHTML = `<h1 class="temperature" id="temperature">${data.main.temp}</h1>
        <h2 class="city" id="city">${data.name}</h2>
        <p  class="weather-description" id="weatherDescription">${data.weather[0].description}</p> `;
  });

fetch(API_Weather_URL) //this is when we send something to BE
  .then((res) => res.json()) //this is when we receive the data from BE
  .then((data1) => {
    const filteredForecast = data1.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );
    console.log("filteredForecast", filteredForecast);
    weatherContainer.innerHTML += `<h1 class="weather" id="weather"> Date: ${filteredForecast[0].dt_txt}  Max Temperature:${filteredForecast[0].main.temp_max} <br> Min Temperature${filteredForecast[0].main.temp_min}</h1>
        <h1 class="weather" id="weather">  Date: ${filteredForecast[1].dt_txt}  Max Temperature: ${filteredForecast[1].main.temp_max} <br> Min Temperature: ${filteredForecast[1].main.temp_min}</h1>
        <h1 class="weather" id="weather"> Date: ${filteredForecast[2].dt_txt}   Max Temperature: ${filteredForecast[2].main.temp_max} <br> Min Temperature: ${filteredForecast[2].main.temp_min}</h1>
        <h1 class="weather" id="weather">Date: ${filteredForecast[3].dt_txt}  Max Temperature:   ${filteredForecast[3].main.temp_max} <br> Min Temperature: ${filteredForecast[3].main.temp_min}</h1>
        <h1 class="weather" id="weather"> Date: ${filteredForecast[4].dt_txt}Max Temperature:   ${filteredForecast[4].main.temp_max} <br> Min Temperature: ${filteredForecast[4].main.temp_min}</h1>`;
  });
