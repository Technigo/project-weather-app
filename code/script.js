const BASE_URL = "/.netlify/functions/fetchWeather";
const BASE_URL_FORECAST = "/.netlify/functions/fetchForecast";

const weatherIcons = {
  clear: "./assets/design-2/noun_Sunglasses_2055147.svg",
  clouds: "./assets/design-2/noun_Cloud_1188486.svg",
  rain: "./assets/design-2/noun_Umbrella_2030530.svg",
  snow: "./assets/design-2/snowflake.png",
};

const weatherCategories = {
  "clear sky": "clear",
  "few clouds": "clouds",
  "scattered clouds": "clouds",
  "broken clouds": "clouds",
  "overcast clouds": "clouds",
  "light rain": "rain",
  "moderate rain": "rain",
  "heavy intensity rain": "rain",
  "shower rain": "rain",
  "rain": "rain",
  "thunderstorm": "rain",
  "light snow": "snow",
  "snow": "snow"
};

const weatherMessages = {
  clear: (city) => `Put your sunnies on – <strong>${city}</strong> is looking rather great today!`,
  clouds: (city) => `Clouds are just <strong>${city}</strong>’s blanket.`,
  rain: (city) => `Grab your umbrella if you're in <strong>${city}</strong> today!`,
  snow: (city) => `It’s a <strong>${city}</strong> winter wonderland out there!`
};

const description = document.getElementById("description");
const sunriseTime = document.getElementById("sunrise");
const sunsetTime = document.getElementById("sunset");
const fourDayForecast = document.getElementById("four-day-forecast");
const searchCityInput = document.getElementById("search-city");
const searchButton = document.getElementById("search-button");

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date().getDate();

const fetchTodaysWeatherAsync = async (city) => {
  const todayURL = `${BASE_URL}?city=${city}`;

  try {
    document.getElementById("weather-message").innerText = "Connecting the API to the weather gods...";
    // Fetch today's weather
    const response = await fetch(todayURL);
    if (!response.ok) throw new Error("Failed to fetch today's weather");

    const data = await response.json();
    const fetchedDescription = data.weather[0].description;
    const weatherDescription = weatherCategories[fetchedDescription] || "default";
    const capitalizedDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    description.innerHTML = `${capitalizedDescription} | ${Math.round(data.main.temp)} °C`;

    // Set the weather icon based on the weather description
    const weatherIconURL = weatherIcons[weatherDescription] || "./assets/design-2/noun_Cloud_1188486.svg";
    document.getElementById("weather-icon").src = weatherIconURL;

    // Sun rise and sunset times
    const localTimezone = data.timezone * 1000;
    const sunrise = new Date((data.sys.sunrise * 1000) + localTimezone).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date((data.sys.sunset * 1000) + localTimezone).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunriseTime.innerHTML = `Sunrise: ${sunrise}`;
    sunsetTime.innerHTML = `Sunset: ${sunset}`;

    // Set the weather message based on the weather description
    const getWeatherMessage = weatherMessages[weatherDescription];
    const personalizedMessage = getWeatherMessage
      ? getWeatherMessage(data.name)
      : `Enjoy the weather in <strong>${data.name}</strong>!`;
    document.getElementById("weather-message").innerHTML = personalizedMessage;

    const container = document.querySelector(".weather-container");

    // Determine if it's day or night
    // Get the current time and sunset time in milliseconds
    const now = new Date().getTime();
    const sunsetTimestamp = data.sys.sunset * 1000;

    // Themes for different weather conditions and night mode
    if (now > sunsetTimestamp) {
      container.classList.add("night-mode");
      document.body.classList.add("night-mode");

      document.body.classList.remove(
        "theme-clear",
        "theme-clouds",
        "theme-rain",
        "theme-snow",
        "theme-default"
      );

      document.getElementById("weather-message").innerHTML = `Have a good night in <strong>${data.name}</strong> 🌙`;
      document.getElementById("weather-icon").src = "./assets/design-2/moon.png";
      document.getElementById("weather-icon").alt = "Moon icon";
    } else {
      container.classList.remove("night-mode");
      document.body.classList.remove("night-mode");

      const themeClass = `theme-${weatherDescription}`;

      container.classList.remove(
        "theme-clear",
        "theme-clouds",
        "theme-rain",
        "theme-snow",
        "theme-default"
      );
      container.classList.add(themeClass);

      document.body.classList.remove(
        "theme-clear",
        "theme-clouds",
        "theme-rain",
        "theme-snow",
        "theme-default"
      );
      document.body.classList.add(themeClass);

      const getWeatherMessage = weatherMessages[weatherDescription];
      const personalizedMessage = getWeatherMessage(data.name);
      document.getElementById("weather-message").innerHTML = personalizedMessage;

      const weatherIconURL = weatherIcons[weatherDescription] || "./assets/design-2/noun_Cloud_1188486.svg";
      document.getElementById("weather-icon").src = weatherIconURL;
    }
    
    // Loading screen
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 300);
    }

  } catch (error) {
    console.error("Error fetching today's weather", error);
  }
};

// Fetch forecast weather
const fetchForecastWeatherAsync = async (city) => {
  const forecastURL = `${BASE_URL_FORECAST}?city=${city}`;

  try {

    const response = await fetch(forecastURL);
    if (!response.ok) throw new Error("Failed to fetch forecast");

    const data = await response.json();

    const filteredForecast = data.list.filter(forecast => {
      const forecastDate = new Date(forecast.dt_txt);
      return forecastDate.getHours() === 12 && forecastDate.getDate() !== today;
    });

    fourDayForecast.innerHTML = "";

    filteredForecast.forEach(forecast => {
      const date = new Date(forecast.dt_txt);
      const dayName = weekdays[date.getDay()];
      const tempMin = Math.round(forecast.main.temp_min);
      const tempMax = Math.round(forecast.main.temp_max);

      fourDayForecast.innerHTML += `
        <p>
          <span class="forecast-day">${dayName}</span>
          <span class="forecast-temp">${tempMin} / ${tempMax} °C</span>
        </p>`;
    });

  } catch (error) {
    console.error("Error fetching forecast", error);
  }
};

document.getElementById("loading-screen").style.display = "none";

// Event listeners for search button and input
searchButton.addEventListener("click", () => {
  const city = searchCityInput.value.trim();
  if (city) {
    fetchTodaysWeatherAsync(city);
    fetchForecastWeatherAsync(city);
  }
});

searchCityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const defaultCity = "Stockholm";
  fetchTodaysWeatherAsync(defaultCity);
  fetchForecastWeatherAsync(defaultCity);
});

