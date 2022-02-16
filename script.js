const weatherContainer = document.getElementById("weatherContainer");
const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const weatherDescription = document.getElementById("weatherDescription");
const weatherForecast = document.getElementById("weatherForecast");
//<<<<<<< HEAD
const sunContainer = document.getElementById("sunContainer");

//=======
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";
const API_Weather_URL =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";

//>>>>>>> sherin
//v2 -Dynamic (based on user input value) fetch request
// movieSearchBar.addEventListener('change', (event)=>{
//<<<<<<< HEAD
//=======

//>>>>>>> sherin
fetch(API_URL) //this is when we send something to BE
  .then((res) => res.json()) //this is when we receive the data from BE
  .then((data) => {
    console.log("data", data);
    weatherContainer.innerHTML = `<h1 class="temperature" id="temperature">${
      data.main.temp
    }</h1>
        <h2 class="city" id="city">${data.name}</h2>
        <p> ${new Date().toLocaleDateString("en-GB", { weekday: "long" })} </p>
        <p  class="weather-description" id="weatherDescription">${
          data.weather[0].description
        }</p>`;

    /* sunrise & sunset */
    const sunriseSec = data.sys.sunrise;
    const sunsetSec = data.sys.sunset;
    const sunrise = convertUTCToSunTime(sunriseSec);
    const sunset = convertUTCToSunTime(sunsetSec);
    sunContainer.innerHTML = `<h1 class="sunrise" id="sunRise">${sunrise}</h1>
    <h1 class="sunset" id="sunSet"></h1>${sunset}</h1>`;
  });

function convertUTCToSunTime(UTCsec) {
  const UTCstring = new Date(UTCsec * 1000).toString();
  const timeWithSec = UTCstring.split(" ")[4];
  const timeWithoutSec = timeWithSec.slice(0, -3);
  return timeWithoutSec; //07:38
}

//1. display Mon/Tue/Wed/Thurs [Jin]
//2. update style.css []
//3. jS: icon related weather []

fetch(API_Weather_URL) //this is when we send something to BE
  .then((res) => res.json()) //this is when we receive the data from BE
  .then((data1) => {
    const filteredForecast = data1.list.filter((item) =>
      item.dt_txt.includes("12:00", "03:00")
    );
    console.log("filteredForecast", filteredForecast);
    filteredForecast.forEach((object) => {
      const temp = object.main.temp.toFixed(0);
      const date = new Date(object.dt * 1000);
      const day = date.toLocaleDateString("en-GB", { weekday: "short" });
      weatherForecast.innerHTML += `<h1 class="weather" id="weather">${day}  ${temp}°C</h1>
      `;
    });
  });
