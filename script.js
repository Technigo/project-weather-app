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

function updateTime(cityTimeZone) {
  let today = new Date();
  today.setTime(today.getTime() + cityTimeZone * 1000); // Adjust the time according to the city's time zone
  let h = today.getHours();
  let m = today.getMinutes().toString().padStart(2, "0"); // Get minutes with leading zero
  document.getElementById("time").textContent = `Time: ${h}:${m}`;
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

    document.getElementById("temperature").textContent = `${temperature}°C`;
    document.getElementById(
      "feelsLike"
    ).textContent = `( Feels like: ${feelsLike} °C)`;
    document.getElementById("city-name").textContent = weatherData.name;

    // Handle weather description and icons for the current weather
    const weatherDescription = weatherData.weather[0].description;
    const capitalizedDescription =
      weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    const iconClass = weatherData.weather[0].icon; // Use the icon code provided by the API

    // Create a flex container to display description and icon side by side
    const descriptionContainer = document.getElementById("description");
    descriptionContainer.innerHTML = ""; // Clear existing content

    const desContainer = document.createElement("div");
    desContainer.className = "des-container";

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = capitalizedDescription;

    const iconElement = document.createElement("img");
    iconElement.src = `https://openweathermap.org/img/wn/${iconClass}.png`;
    iconElement.alt = capitalizedDescription;
    iconElement.className = "main-icon";

    desContainer.appendChild(descriptionElement);
    desContainer.appendChild(iconElement);

    descriptionContainer.appendChild(desContainer);

    // Handle forecast data
    const forecastSection = document.getElementById("forecast-section");
    forecastSection.innerHTML = "";

    // Create a new table for the forecast data
    const forecastTable = document.createElement("table");
    forecastSection.appendChild(forecastTable);

    // Handle the forecast data for the next four days
    let daysDisplayed = 0;
    const daysToDisplay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

        const weatherDescriptionCell = row.insertCell();
        const weatherDescription = forecastItem.weather[0].description;
        const iconClass = forecastItem.weather[0].icon; // Use the icon code provided by the API

        // Create an img element for the forecast weather icon
        const iconElement = document.createElement("img");
        iconElement.src = `https://openweathermap.org/img/wn/${iconClass}.png`;
        iconElement.alt = weatherDescription;
        iconElement.className = "weather-icon";

        weatherDescriptionCell.appendChild(iconElement);

        const temperatureCell = row.insertCell();
        const roundedTemperature = Math.round(forecastItem.main.temp);
        temperatureCell.textContent = `${roundedTemperature} °C`;

        const windCell = row.insertCell();
        const roundedWind = forecastItem.wind.speed.toFixed(2);
        windCell.textContent = `${roundedWind} m/s`;

        daysDisplayed++;
      }
    });
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    document.getElementById(
      "timezone"
    ).textContent = `Time: ${hours}:${minutes}`;

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