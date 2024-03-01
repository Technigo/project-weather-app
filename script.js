// DOM-selectors //
const weatherCondition = document.getElementById("weather-condition");
const temperature = document.getElementById("temperature");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const weatherMessageElement = document.getElementById("weather-message");
const weekdaysContainer = document.getElementById("weekdays");

// City to collect weather information //
let city = "Stockholm";
// URL for retrieving weather data from the OpenWeatherMap API //
const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f40f4543214ad55ead8d6ca12cb39ee0";
const weatherForecastURL =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=f40f4543214ad55ead8d6ca12cb39ee0";

// Function to display weather message based on weather condition //
const displayWeatherMessage = (weather) => {
  weather = weather.toLowerCase();
  switch (weather) {
    case "clear":
    case "sunny":
      weatherMessageElement.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`;
      break;
    case "clouds":
      weatherMessageElement.innerHTML = `Light a fire and get cosy. ${city} is looking grey today.`;
      break;
    case "rain":
    case "thunderstorm":
    case "drizzle":
    case "mist":
    case "snow":
      weatherMessageElement.innerHTML = `Don't forget your umbrella. It's wet in ${city} today.`;
      break;
    default:
      weatherMessageElement.innerHTML = `Enjoy your day in ${city}!`;
  }
};

// Function to fetch weather data asynchronously from the API //
const fetchWeather = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const weather = data.weather[0].main;
    const temp = data.main.temp.toFixed(1); 
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

    displayWeatherMessage(weather);
  } catch (error) {
    console.error(error); 
  }
};

fetchWeather();

// Function to fetch weather forecast data asynchronously //
const fetchWeatherForecastAPI = async () => {
  try {
    const response = await fetch(weatherForecastURL);
    const weatherForecastData = await response.json();

    // Collecting forecast data for each day of the week //
    const filteredWeatherData = weatherForecastData.list
      .filter((item) => item.dt_txt.includes("12:00:00")) // Filter on 12:00:00 entries only
      .map((item) => {
        const timestamp = item.dt * 1000; // Convert seconds to milliseconds
        const date = new Date(timestamp);
        const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" }); // Get day of the week
        const temperature = item.main.temp.toFixed(0); // Get temperature 
        return {
          dayOfWeek,
          temperature,
        };
      });

    // Display the forecast data in the app //
    weekdaysContainer.innerHTML = ""; 

    filteredWeatherData.forEach((forecast) => {
      const forecastHTML = `
            <div class="forecast-row">
              <h3>${forecast.dayOfWeek}</h3>
              <h3>${forecast.temperature}°</h3>
            </div>
          `;
      // Adds the forecast information to the weekdays div in the html file //
      weekdaysContainer.innerHTML += forecastHTML;
    });
  } catch (error) {
    console.error(error); 
  }
};

fetchWeatherForecastAPI();
