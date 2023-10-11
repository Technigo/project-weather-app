const weatherIcons = {
  "clear sky": "fas fa-sun",
  "few clouds": "fas fa-cloud-sun",
  "scattered clouds": "fas fa-cloud",
  "broken clouds": "fas fa-cloud fa-fade",
  "overcast clouds": "fas fa-cloud",
  "light rain": "fas fa-cloud-showers-heavy",
  "moderate rain": "fas fa-cloud-showers-heavy",
  "heavy rain": "fas fa-cloud-showers-heavy",
  "light snow": "fas fa-snowflake",
  "moderate snow": "fas fa-snowflake",
  "heavy snow": "fas fa-snowflake",
  thunderstorm: "fas fa-bolt",
  mist: "fas fa-smog",
  fog: "fas fa-smog",
  smoke: "fas fa-smog",
  haze: "fas fa-smog fa-fade",
  dust: "fas fa-smog",
  sand: "fas fa-smog",
  tornado: "fas fa-wind fa-beat",
  squalls: "fas fa-wind",
};

const api_base_URL = "https://api.openweathermap.org/data/2.5";
const api_key = "10f8230f6149903425e19587fdc548b8";

async function fetchWeatherAndForecast(cityName) {
  try {
    // Fetch current weather data
    const weatherResponse = await fetch(
      `${api_base_URL}/weather?q=${cityName}&units=metric&APPID=${api_key}`
    );
    const weatherData = await weatherResponse.json();

    // Fetch forecast data
    const forecastResponse = await fetch(
      `${api_base_URL}/forecast?q=${cityName}&units=metric&APPID=${api_key}`
    );
    const forecastData = await forecastResponse.json();

    return { weatherData, forecastData };
  } catch (error) {
    console.log("Fetch error:", error);
    throw error;
  }
}

async function updateDOM(cityName) {
  try {
    const { weatherData, forecastData } = await fetchWeatherAndForecast(
      cityName
    );

    // Handle current weather data
    const temperature = Math.round(weatherData.main.temp);
    const feelsLike = Math.round(weatherData.main.feels_like);

    if (temperature <= 11) {
      document.querySelector(".overlay").style.display = "block";
    }

    document.getElementById("temperature").textContent = `${temperature} °`;
    document.getElementById(
      "feelsLike"
    ).textContent = `( Feels like: ${feelsLike} ° )`;
    document.getElementById("city-name").textContent = weatherData.name;

    // Handle weather description and icons
    const weatherDescription = weatherData.weather[0].description;
    const capitalizedDescription =
      weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    const iconClass = weatherIcons[weatherDescription] || "fas fa-question";

    const iconElement = `<i class="weather-icon ${iconClass} fa-beat"></i>`;
    document.getElementById(
      "description"
    ).innerHTML = `<div class="des-container"><p>${capitalizedDescription}</p>${iconElement}</div>`;

    // Handle forecast data
    const forecastSection = document.getElementById("forecast-section");
    forecastSection.innerHTML = ""; // Clear any existing content in the forecast section

    // Create a new table for the forecast data
    const forecastTable = document.createElement("table");
    forecastSection.appendChild(forecastTable);

    // Handle the forecast data for the next four days
    let daysDisplayed = 0;
    const daysToDisplay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // Define the day names

    forecastData.list.forEach((forecastItem) => {
      const date = new Date(forecastItem.dt * 1000);
      const dayIndex = date.getDay();

      // Calculate the accurate day name for the next day
      const nextDayIndex = (dayIndex + daysDisplayed) % 7;
      const accurateDayIndex = nextDayIndex === 0 ? 6 : nextDayIndex - 1;

      if (daysDisplayed < 4) {
        const row = forecastTable.insertRow();

        const dayCell = row.insertCell();
        dayCell.textContent = daysToDisplay[accurateDayIndex];

        // Rest of the code remains the same
        const descriptionCell = row.insertCell();
        const weatherDescription = forecastItem.weather[0].description;
        const iconClass = weatherIcons[weatherDescription] || "fas fa-question";
        descriptionCell.innerHTML = `<i class="weather-icon ${iconClass}"></i>`;

        const temperatureCell = row.insertCell();
        const roundedTemperature = Math.round(forecastItem.main.temp);
        temperatureCell.textContent = `${roundedTemperature} °C`;

        const windCell = row.insertCell();
        const roundedWind = forecastItem.wind.speed.toFixed(2);
        windCell.textContent = `${roundedWind} m/s`;

        daysDisplayed++;
      }
    });

    console.log("Fetched weather data:", weatherData);
    console.log("Fetched forecast data:", forecastData);
  } catch (error) {
    console.log("Update DOM error:", error);
  }
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", async () => {
  try {
    const cityName = searchInput.value;
    if (cityName) {
      // Call the updateDOM function with the entered city name
      updateDOM(cityName);
    } else {
      console.log("Please enter a city name.");
    }
  } catch (error) {
    console.log("Fetch error:", error);
  }
});

// Call the initial updateDOM function with a default city
updateDOM("Stockholm");
