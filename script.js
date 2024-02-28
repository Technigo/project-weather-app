// DOM selectors
const currentWeather = document.getElementById("weather-container");
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const displayTemp = document.getElementById("temp");
const displayLocation = document.getElementById("location");
const displayCondition = document.getElementById("condition");
const displaySunrise = document.getElementById("sunrise-time");
const displaySunset = document.getElementById("sunset-time");
const displayForecast = document.getElementById("weather-forecast");

//BUTTON
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherDataButton = await printWeather(city);
      printWeather(weatherDataButton);
    } catch (error) {
      console.error(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

const getWeatherData = async (city) => {};

const displayError = () => {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
};

// API
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a1f68c4f65b632802ca0dd3405694457";
// let place = "bern";
const URL = `${API_BASE_URL}/weather?q=${place}&units=metric&appid=${API_KEY}`;
const FORECAST = `${API_BASE_URL}/forecast?q=${place}&units=metric&appid=${API_KEY}`;

//UNIX TIMESTAMP CONVERTER
const convertDateTime = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

//WEEKDAY DISPLAY FUNCTION
const getWeekdays = (date) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[date.getDay()];
};

// TODAY'S WEATHER
const printWeather = async () => {
  try {
    const weatherNow = await fetch(URL);
    const data = await weatherNow.json();
    const currentTemp = await data.main.temp;
    const currentLocation = await data.name;
    const currentCondition = await data.weather[0].description;
    const todaySunrise = convertDateTime(data.sys.sunrise);
    const todaySunset = convertDateTime(data.sys.sunset);

    displayTemp.innerHTML = currentTemp + "&deg;C";
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

// 4-DAY WEATHER FORECAST
const printForecast = async () => {
  try {
    const fourDayWeather = await fetch(FORECAST);
    const json = await fourDayWeather.json();
    const forecastData = json.list.filter((item, index) => index % 8 === 0); // Filter for every 8th item, which represents once every day
    console.log("FORECAST JSON DATA", json);

    forecastData.forEach((forecast, index) => {
      const forecastDate = new Date(forecast.dt * 1000);
      const weekday = getWeekdays(forecastDate);
      const forecastTime = convertDateTime(forecast.dt);
      const forecastTemp = forecast.main.temp;

      const forecastElement = document.createElement("div");
      forecastElement.innerHTML = `
      <p>${weekday}, ${forecastDate.toLocaleDateString()}: ${forecastTime}</p>
      <p>Temperature: ${forecastTemp}&deg;C</p>`;
      displayForecast.appendChild(forecastElement);
    });
  } catch (error) {
    console.error(error);
  }
};
printForecast();
