/**
 * Geolocation-related functions
 */

import { generateWeatherHTML } from "./weather.js";

// Globals
const apiKey = "00cf2e54cabfd29c16426be71518c00a";
const suffix = `&units=metric&APPID=${apiKey}`;
const container = document.getElementsByClassName("container");

// Function to get data from open weather API by using city or coordinates
export const fetchWeatherDataByCity = async (cityOrCoords) => {
  let URL;

  // Building the URL depepending on city or coordinates
  if (typeof cityOrCoords === "string") {
    const city = cityOrCoords;
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";

    URL = `${apiURL}${city}${suffix}`;
  } else if (typeof cityOrCoords === "object") {
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?";
    const lat = cityOrCoords.coords.latitude;
    const lon = cityOrCoords.coords.longitude;

    URL = `${apiURL}lat=${lat}&lon=${lon}${suffix}`;
  } else {
    alert("Oops, city not fount! Check your spelling please!");
    return;
  }

  try {
    const response = await fetch(URL);
    const weatherData = await response.json();

    generateWeatherHTML(weatherData);
    return;
  } catch (error) {
    console.log("Fetch error: " + error);
    alert("Oops, city not fount! Check your spelling please!");
  }
};

// Check if geolocation is available in browser
const fetchUserLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeatherDataByCity(position);
    });
  } else {
    container.innerText = "Geolocation is not available";
  }
};
fetchUserLocation();

// Get forecast for the coming 4 days (Sebastian)
//Make a function that takes 2 arguments, latitude and longitude
export const getForecast = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}${suffix}`
    );
    const data = await response.json();
    let forecastContainer = document.querySelector(".forecast__container");

    // Clear existing forecast
    forecastContainer.innerHTML = "";

    // Get an array of the forecasts
    const forecastArray = [...data.list];

    // Filter out only forecasts for 9 ó clock
    const filteredArray = forecastArray.filter((day) => {
      return day.dt_txt.toLowerCase().endsWith("09:00:00");
    });

    // Loop over the filteredArray get the day of the week from dt and save it as a variable called "dayOfTheWeek"
    filteredArray.forEach((day, index) => {
      if (index <= 4) {
        let timestamp = day.dt;
        let date = new Date(timestamp * 1000);
        let dayOfTheWeek = date.toLocaleDateString("en-US", {
          weekday: "short",
        });

        // Render the needed data on the page
        forecastContainer.innerHTML += `
        <div class="forecast__single-day-flex">
          <span class="forecast__day">${dayOfTheWeek}</span>
          <span class="forecast__image"><img src="https://openweathermap.org/img/wn/${
            day.weather[0].icon
          }@2x.png" alt="" width="70" height="70" /></span>
          <span class="forecast__temp">${
            Math.round(day.main.temp * 10) / 10
          } °C</span>
          <span class="forecast__wind">${day.wind.speed}m/s</span>
        </div>      
        `;
      } else return;
    });
  } catch (error) {
    console.log("Could not contact the weather forecast API", error);
  }
};

// Function that radomly changes the weather depending on city
export const fetchRandomWeather = async () => {
  const URL = "https://countriesnow.space/api/v0.1/countries/flag/unicode";

  try {
    const response = await fetch(URL);
    const cityData = await response.json();

    const cityNames = [];

    cityData.data.forEach((city) => {
      cityNames.push(city.name);
    });

    let randomCity = cityNames[Math.floor(Math.random() * cityNames.length)];

    fetchWeatherDataByCity(randomCity);
    getCoordsForCities(randomCity);
  } catch (err) {
    container.innerText = "No cities available";
  }
};

// Function that gets the coordinates for given city
const getCoordsForCities = async (cityName) => {
  const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

  try {
    const response = await fetch(URL);
    const cityData = await response.json();

    getForecast(cityData[0].lat, cityData[0].lon);
  } catch (error) {
    console.log("Could not contact the weather forecast API", error);
  }
};

export const getAirPollution = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    );

    const data = await response.json();
    const pollutionContainer = document.querySelector(".pollution__container");
    let pm2_5_heading = "";
    let pm2_5_color = "";

    const pollutionArray = [...data.list];

    const pm2_5 = pollutionArray[0].components.pm2_5;
    // Clear existing history
    pollutionContainer.innerHTML = "";

    if (pm2_5 <= 15) {
      // Good air quality
      pm2_5_heading = "good air quality";
      pm2_5_color = "#ec6e4c";
    } else {
      // Bad air quality
      pm2_5_heading = "bad air quality";
      pm2_5_color = "black";
    }

    // // Render the needed data on the page
    pollutionContainer.innerHTML = `
        <h5>${pm2_5_heading}</h5>
        <p style=color:${pm2_5_color}>${pm2_5}</p>
        `;
  } catch (error) {
    console.log("Could not contact the weather forecast API", error);
  }
};
