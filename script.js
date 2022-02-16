const weatherContainer = document.getElementById("weatherContainer");
const today = document.getElementById("today");
const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const weatherDescription = document.getElementById("weatherDescription");
const weatherForecast = document.getElementById("weatherForecast");
const sunContainer = document.getElementById("sunContainer");
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";
const API_Weather_URL =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";
const timeInHr = new Date().getHours();

//>>>>>>> sherin
fetch(API_URL) //this is when we send something to BE
  .then((res) => res.json()) //this is when we receive the data from BE
  .then((data) => {
    console.log("data", data);
    weatherContainer.innerHTML = ` <h1 class="today" id="today">Today</h1> 
    <h1 class="temperature" id="temperature">${data.main.temp}°C</h1>
        <h2 class="city" id="city">${data.name} </h2>
        <h3  class="weather-description" id="weatherDescription">${data.weather[0].description}</h3>`;

    /* sunrise & sunset */
    const sunriseSec = data.sys.sunrise;
    const sunsetSec = data.sys.sunset;
    const sunrise = convertUTCToSunTime(sunriseSec);
    const sunset = convertUTCToSunTime(sunsetSec);
    sunContainer.innerHTML = `
     
    <h3 class="sunrise" id="sunRise" > <img class="sun-icon" src="./images/sunrise.png">  ${sunrise} </h3> 
   
    <h3 class="sunset" id="sunSet">  <img class="sun-icon" src="./images/sunset.png">${sunset}</h3>
 `;
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
      weatherForecast.innerHTML += `<h2 class="weather" id="weather">${day}  ${temp}°C</h2>`;
    });
  });
// setting bg Image based on day/night
if (timeInHr >= 6 && timeInHr <= 18) {
  weatherContainer.style.backgroundImage = `url(./images/day.jpg)`;
  weatherContainer.style.backgroundSize = "cover";
} else if (timeInHr < 6 && timeInHr > 18) {
  weatherContainer.style.backgroundImage = `url(./images/night.jpg)`;
  weatherContainer.style.backgroundSize = "cover";
}
