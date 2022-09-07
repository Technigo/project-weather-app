// DOM selectors stored as short variables
const city = document.getElementById("city");
const currentWeather = document.getElementById("currentWeather");
const currentTemp = document.getElementById("currentTemp");

// Global variables
let URLforecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae";

// Fetch
fetch(URLforecast)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    city.innerHTML += `City: ${data.city.name}`;
    currentWeather.innerHTML += `Current weather: ${data.list[0].weather[0].description} `;
    currentTemp.innerHTML += `Temperature: ${data.list[0].main.temp.toFixed(
      1
    )}<sup>°C</sup>`; // toFixed(1) rounds temperature to one decimal
    // Stackoverflow re: <sup> solution: https://stackoverflow.com/c/technigo/questions/750
  });

// All the event listeners

// Stackoverflow asked question: https://stackoverflow.com/c/technigo/questions/4001
