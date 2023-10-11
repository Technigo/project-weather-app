// Get API_KEY from separate file
import { API_KEY } from "./api_key.js";

// Declare variables
const backgroundColor = document.getElementById("backgroundColor");
const date = document.getElementById("date");
const temperature = document.getElementById("temperature");
const city = document.getElementById("location");
const weatherDescription = document.getElementById("weatherDescription");
const weatherImage = document.getElementById("weatherImage");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const locationInput = document.getElementById("searchField");

// Get current time and date
const currentDate = new Date().toLocaleDateString();
const currentTime = new Date().toLocaleTimeString("sv-SE", {
  hour: "2-digit",
  minute: "2-digit",
});

// Set current date and time
date.innerHTML = `${currentDate} ${currentTime}`;

// Set initial location
let currentLocation = "Örebro";

// Store API URL's
let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation},Sweden&units=metric&APPID=${API_KEY}`;
let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${currentLocation},Sweden&units=metric&APPID=${API_KEY}`;

// Updates the URL:s when searching for a new location
const changeLocation = () => {
  currentLocation = locationInput.value;
  weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation},Sweden&units=metric&APPID=${API_KEY}`;
  forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${currentLocation},Sweden&units=metric&APPID=${API_KEY}`;
  locationInput.value = "";
  fetchAPI();
};
locationInput.addEventListener("change", changeLocation);

const fetchAPI = () => {
  // Get todays weather
  fetch(weatherApiUrl)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      temperature.innerHTML = json.main.temp.toFixed();
      city.innerHTML = json.name;
      weatherDescription.innerHTML = json.weather[0].main;

      // Get weather icon name from API
      const weatherIcon = json.weather[0].icon;
      weatherImage.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      const sunriseValue = new Date(json.sys.sunrise * 1000).toLocaleTimeString(
        "sv-SE",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
      sunrise.innerHTML = "Sunrise " + sunriseValue;

      const sunsetValue = new Date(json.sys.sunset * 1000).toLocaleTimeString(
        "sv-SE",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
      sunset.innerHTML = "Sunset " + sunsetValue;

      // Toggle class for night mode if sun is down
      if (currentTime < sunriseValue || currentTime > sunsetValue) {
        backgroundColor.classList.add("night");
      } else {
        backgroundColor.classList.remove("night");
      }
    })
    .catch((err) => {
      console.log("Caught error:", err);
    });

  // Get forecast for the next five days
  fetch(forecastApiUrl)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const forecast = document.getElementById("fivedayForecast");
      const today = new Date(json.list[0].dt_txt).getDay();

      // Create a filtered list starting from tomorrow
      const fiveNextDays = json.list.filter(
        (element) => new Date(element.dt_txt).getDay() !== today
      );

      let maxTemp = -1000;
      let minTemp = 1000;
      let weatherIcon = "";

      // Create an array to store max and min temperature for every day
      const fiveDayArray = [];

      fiveNextDays.forEach((element) => {
        // Get current weekday
        const currentWeekDay = new Date(element.dt_txt).toLocaleDateString(
          "sv-SE",
          {
            weekday: "long",
          }
        );

        // If the array is empty (first iteration), add the first day in
        if (fiveDayArray.length === 0) fiveDayArray.push(currentWeekDay);

        // If current weekday is in list, compere min and max temp
        if (!fiveDayArray.includes(currentWeekDay)) {
          // If not in list, then it's a new day - add min and max temp to array, add the new day, reset min and max temp
          fiveDayArray.push(maxTemp);
          fiveDayArray.push(minTemp);
          fiveDayArray.push(weatherIcon);
          fiveDayArray.push(currentWeekDay);
          maxTemp = -1000;
          minTemp = 1000;
        }
        if (element.main.temp_max > maxTemp) {
          maxTemp = element.main.temp_max;
          weatherIcon = element.weather[0].icon;
        }
        if (element.main.temp_min < minTemp) minTemp = element.main.temp_min;
      });

      // Push temperature values for the last day
      fiveDayArray.push(maxTemp);
      fiveDayArray.push(minTemp);
      fiveDayArray.push(weatherIcon);

      // Send five day forecast as HTML
      for (let i = 0; i < 5; i++) {
        let currentDay = [];

        if (fiveDayArray.length > 4) currentDay = fiveDayArray.splice(0, 4);
        else currentDay = fiveDayArray;

        const weekDay =
          currentDay[0].charAt(0).toUpperCase() + currentDay[0].slice(1);
        const maxTemp = currentDay[1].toFixed();
        const minTemp = currentDay[2].toFixed();
        const icon = currentDay[3];

        forecast.innerHTML += `
        <div id="dayContainer" class="day-container">
          <p id="weekday">${weekDay}</p>
          <img
            id="forecastImage"
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="forecast image"
          />
          <div class="min-max-temp">
            <p id="maxTemp">${maxTemp}</p>
            <p>&deg;</p>
            <p id="minTemp">/ ${minTemp}</p>
            <p>&deg;C</p>
          </div>
        </div>
      `;
      }
    })
    .catch((err) => {
      console.log("Caught error:", err);
    });
};

fetchAPI();
