//DOM selectors
const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const currentTemp = document.getElementById("current-city");
const currentSky = document.getElementById("current-sky");
const weatherDetail = document.getElementById("weather-detail");
const weatherBackground = document.getElementById("card");

//API
const apiKey = "69822732ac1661b79f6670b175a16816";

//Fetch
fetch("")

//Event listeners
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  console.log("Fetching weather data...");
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    console.log("Weather data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data: " + error.message);
  }
}

function displayWeatherInfo(data) {
  console.log(data);
}

// function getCurrentSky ()

// function getWeatherEmoji(weatherId) {

// }

// function displayError(message) {
//   const errorDisplay = document.createElement("p");
//   errorDisplay.textContent = message;
//   errorDisplay;
// }
