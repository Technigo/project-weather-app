// True constants
const API_KEY = "959cb256f265cbbe5b4051e4a40be3af";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

const city = "Stockholm";

// Create URL for current weather
const URL = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`;
console.log(URL)

const errorDiv = document.getElementById("error");

//Fetch current weather data
fetch(URL)
  .then(response => response.json())
  .then(data => {

    const cityName = data.name;
    const temp = data.main.temp.toFixed(1);
    const typeOfWeather = data.weather[0].description;
    //Convert first letter of weather description to uppercase
    const capitalizedWeather = typeOfWeather.charAt(0).toUpperCase() + typeOfWeather.slice(1);

    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Display weather data on page
    document.getElementById("location").innerText = `${cityName}`;
    document.getElementById("temperature").innerText = `${temp}°`;
    document.getElementById("weather").innerText = `${capitalizedWeather}`; // Use capitalized description
    document.getElementById("sunrise").innerText = `${sunriseTime}`;
    document.getElementById("sunset").innerText = `${sunsetTime}`;
  })

  // Error message
  .catch(error => {
    errorDiv.innerText = "Something went wrong.";
  });

// Fetch 4-day forecast data
const forecastURL = `${FORECAST_BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`;

fetch(forecastURL)
  .then(response => response.json())
  .then(data => {
    const forecastList = document.getElementById("forecast-list");

    //Group forecast date by days and calculate average temperature
    const dailyTemps = {};

    data.list.forEach(forecast => {
      const dateObj = new Date(forecast.dt_txt);  // Create Date object
      const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' }); // Get long, full name of the day
      const temp = forecast.main.temp;

      if (!dailyTemps[dayOfWeek]) {
        dailyTemps[dayOfWeek] = {
          totalTemp: temp,
          count: 1
        };
      } else {
        dailyTemps[dayOfWeek].totalTemp += temp;
        dailyTemps[dayOfWeek].count += 1;
      }
    });

    // Clear any existing forecast data
    forecastList.innerText = "";

    // Display 4-day forecast
    Object.keys(dailyTemps).slice(1, 5).forEach(dayOfWeek => {
      const averageTemp = (dailyTemps[dayOfWeek].totalTemp / dailyTemps[dayOfWeek].count).toFixed(1);

      const forecastItem = document.createElement("p");
      forecastItem.innerHTML = `${dayOfWeek} ${averageTemp}°`;

      forecastList.appendChild(forecastItem);
    });
  })

  // Error message
  .catch(error => {
    errorDiv.innerText = "Something went wrong."
  });