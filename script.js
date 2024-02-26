// DOM selectors
const currentWeather = document.getElementById("weather-container");

// Current weather
const apiBaseURL = "https://api.openweathermap.org/data/2.5";
const apiKey = "a1f68c4f65b632802ca0dd3405694457";
let city = "Bern";

fetch(`${apiBaseURL}/weather?q=${city}&units=metric&appid=${apiKey}`)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
  });

// Weather forecast
fetch(`${apiBaseURL}/forecast?q=${city}&appid=${apiKey}`)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
  });
