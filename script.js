// City to collect weather information //
let city = "Stockholm";
// URL for retrieving weather data from the OpenWeatherMap API //
let url =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f40f4543214ad55ead8d6ca12cb39ee0";

// Get references to HTML elements where weather data/messages will be displayed //
const weatherCondition = document.getElementById("weather-condition");
const temperature = document.getElementById("temperature");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const weatherMessageElement = document.getElementById("weather-message");

// Function to display weather message based on weather condition //
const displayWeatherMessage = (weather) => {
  weather = weather.toLowerCase();
  switch (weather) {
    case "clear":
    case "sunny":
      weatherMessageElement.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`;
      weatherIcon = "";
      break;
    case "clouds":
      weatherMessageElement.innerHTML = `Light a fire and get cosy. ${city} is looking grey today.`;
      weatherIcon = "";
      break;
    case "rain":
    case "thunderstorm":
    case "drizzle":
    case "snow":
      weatherMessageElement.innerHTML = `Don't forget your umbrella. It's wet in ${city} today.`;
      weatherIcon = "";
      break;
    default:
      weatherMessageElement.innerHTML = `Enjoy your day in ${city}!`;
  }

  weatherMessageElement.innerHTML = `<img class="weather-icon" src="${weatherIcon}" />${weatherMessageElement.innerHTML}`;
};

// Function to fetch weather data asynchronously from the OpenWeatherMap API //
const fetchWeather = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const weather = data.weather[0].main.toLowerCase();
    const temp = data.main.temp;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Updates HTML elements with the fetched weather data //
    weatherCondition.textContent = weather;
    temperature.textContent = temp + "°";
    sunriseTime.textContent = sunrise;
    sunsetTime.textContent = sunset;

    // Call displayWeatherMessage with the fetched weather condition
    displayWeatherMessage(weather);
  } catch (error) {
    console.error(error); // Logs any errors that occur
  }
};

fetchWeather();

const renderForecast = (forecastData) => {
  const weekdays = document.getElementById("weekdays");

  // Clear any existing content
  weekdays.innerHTML = "";

  // Iterate through the forecast data and render each day
  forecastData.list.forEach((day) => {
    const date = new Date(day.dt * 1000);
    if (date.getHours() === 13) {
      // Create a new paragraph element for the day
      const dayElement = document.createElement("p");
      dayElement.textContent = date.toLocaleDateString("en", {
        weekday: "short",
      });

      // Create a new paragraph element for the temperature
      const tempElement = document.createElement("p");
      tempElement.textContent = `${Math.round(day.main.temp)}°`;

      // Append the day and temperature elements to the weekdays div
      weekdays.appendChild(dayElement);
      weekdays.appendChild(tempElement);
    }
  });
};
