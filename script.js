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
const displaySunrise = document.getElementById("sunrise-time");
const displaySunset = document.getElementById("sunset-time");

const printWeather = async () => {
  try {
    const weatherNow = await fetch(URL);
    const data = await weatherNow.json();
    const currentTemp = await data.main.temp;
    const currentLocation = await data.name;
    const currentCondition = await data.weather[0].main;
    const todaySunrise = (data.sys.sunrise + data.timezone) * 1000;
    const todaySunset = data.sys.sunset;

    displayTemp.innerHTML = currentTemp + `°C`;
    displayLocation.innerHTML = currentLocation;
    displayCondition.innerHTML = currentCondition;
    displaySunrise.innerHTML = todaySunrise;
    displaySunset.innerHTML = todaySunset;

    console.log("Data:", data); //NOT FORGET TO DELETE!!
  } catch (error) {
    console.error(error); //in case of an error
  }
};
printWeather();
