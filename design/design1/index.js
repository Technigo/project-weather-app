// DOM selectors
const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const weatherBackground = document.getElementById("card");

// API
const apiKey = "69822732ac1661b79f6670b175a16816";

// Event listener for weather form submission
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;

  if (city) {
    try {
      // Fetch current weather and forecast data
      const { currentWeather, forecast } = await getWeather(city);

      displayWeatherInfo(currentWeather); // This line is correct
      displayWeatherForecast(forecast); // Check this line
    } catch (error) {
      console.error(error);
      displayError("Failed to fetch weather data. Please try again later.");
    }
  } else {
    displayError("Please enter a city");
  }
});

//Fetch data
async function getWeather(city) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  const currentWeatherResponse = await fetch(currentWeatherUrl);
  const forecastResponse = await fetch(forecastUrl);

  if (!currentWeatherResponse.ok || !forecastResponse.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const currentWeatherData = await currentWeatherResponse.json();
  const forecastData = await forecastResponse.json();

  return { currentWeather: currentWeatherData, forecast: forecastData };
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp },
    weather: [{ main: description }],
    sys: { sunrise, sunset },
  } = data;

  weatherBackground.innerHTML = ""; // Clear previous content

  const tempDisplay = document.createElement("h1");
  const cityDisplay = document.createElement("h2");
  const desDisplay = document.createElement("p");
  const sunDisplay = document.createElement("p");

  tempDisplay.textContent = `${(temp - 273.15).toFixed(0)}°C`;
  tempDisplay.classList.add("current-temp");

  cityDisplay.textContent = city;
  cityDisplay.classList.add("current-city");

  desDisplay.textContent = description;
  desDisplay.classList.add("current-sky");

  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);
  const options = { hour: "2-digit", minute: "2-digit" };
  const sunriseFormatted = sunriseTime.toLocaleTimeString(undefined, options);
  const sunsetFormatted = sunsetTime.toLocaleTimeString(undefined, options);

  sunDisplay.textContent = `Sunrise: ${sunriseFormatted} Sunset: ${sunsetFormatted}`;
  sunDisplay.classList.add("weather-detail");

  weatherBackground.appendChild(tempDisplay);
  weatherBackground.appendChild(cityDisplay);
  weatherBackground.appendChild(desDisplay);
  weatherBackground.appendChild(sunDisplay);
}

async function displayWeatherForecast(forecast) {
  try {
    const weekDaysContainer = document.getElementById("week-days");
    weekDaysContainer.innerHTML = "";

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Keep track of the days already displayed
    const displayedDays = new Set();

    // Iterate over each entry in the forecast list
    forecast.list.forEach((dayForecast) => {
      // Extract the date from the forecast data
      const date = new Date(dayForecast.dt * 1000);
      // Get the day index (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
      const dayIndex = date.getDay();

      // Check if the day index is within the valid range
      if (dayIndex >= 0 && dayIndex < weekDays.length) {
        // Check if this day has already been displayed
        if (!displayedDays.has(dayIndex)) {
          const tempMin = (dayForecast.main.temp_min - 273.15).toFixed(0);
          const tempMax = (dayForecast.main.temp_max - 273.15).toFixed(0);

          // Create elements for the day forecast
          const dayElement = document.createElement("div");
          dayElement.classList.add("week-day");

          const dayName = document.createElement("div");
          dayName.textContent = weekDays[dayIndex];
          const tempElement = document.createElement("div");
          tempElement.textContent = `${tempMin}°C / ${tempMax}°C`;

          // Append the day name and temperature elements to the day element
          dayElement.appendChild(dayName);
          dayElement.appendChild(tempElement);

          // Append the day element to the week-days container
          weekDaysContainer.appendChild(dayElement);

          // Add the day index to the set of displayed days
          displayedDays.add(dayIndex);
        }
      }
    });
  } catch (error) {
    console.error(error);
    displayError("Failed to fetch weather forecast. Please try again later.");
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("error");
  weatherBackground.appendChild(errorDisplay);
}
