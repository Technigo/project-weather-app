// DOM selectors
const currentWeather = document.getElementById("weather-container");

// Current weather
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a1f68c4f65b632802ca0dd3405694457";
let place = "bern";
const URL = `${API_BASE_URL}/weather?q=${place}&units=metric&appid=${API_KEY}`;

const displayTemp = document.getElementById("temp");
const displayLocation = document.getElementById("location");
const displayCondition = document.getElementById("condition");

async function printWeather() {
  try {
    const weatherNow = await fetch(URL);
    const data = await weatherNow.json();
    const currentTemp = data.main.temp;
    const currentLocation = data.name;
    const currentCondition = data.weather[0].main;

    displayTemp.innerHTML = currentTemp + `°C`;
    displayLocation.innerHTML = currentLocation;
    displayCondition.innerHTML = currentCondition;

    console.log("Data:", data); //NOT FORGET TO DELETE!!
  } catch (error) {
    console.error(error); //in case of an error
  }
}
printWeather();
