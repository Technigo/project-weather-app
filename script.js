// This a helper function that takes an object of parameters and converts it into "q=Stockholm,Sweden&units=metric&APPID=XXXX"
const buildQueryString = (params) => {
  return new URLSearchParams(params).toString();
}

// We save our config settings in the weatherApp object
const weatherApp = {
  apiKey: "b519b073de061051721cf997e13c4842",
  apiUrl: "https://api.openweathermap.org/data/2.5/",
  units: "metric",
  // we use this to store our weatherData globally for testing
  data: {}
}
// We will use two different API calls ["weather", "forecast"].
// This function takes the parameters city and country and tries to fetch the weather data.
const fetchWeatherReport = (reportType, city, country) => {
  // Here we set the parameters for our API request.
  const params = {
    // we are grabbing the apiKey from our weatherApp object
    APPID: weatherApp.apiKey,
    q: `${city},${country}`,
    units: weatherApp.units
  }
  // We convert our parameters into a string
  const queryString = buildQueryString(params)

  let apiCollection = ""
  switch(reportType) {
    case "current":
      apiCollection = "weather"
      break;

    case "forecast":
      apiCollection = "forecast"
      break;

    default:
      // if we dont get a correct report type we return back just false
      console.log("error")
      return false
  }

  // We put together the apiUrl, the apiCollection and the queryString to form the complete fetch url
  const url = `${weatherApp.apiUrl}${apiCollection}?${queryString}`;
  console.log(url)
  // We return the fetch call. By doing this fetchWeather will first return a promise and later the data.
  // TODO - We need to add some error handling
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      return data
    })
}

const fetchWeatherData = async (city, country) => {
  // We run both fetch calls concurrently and wait for them to both complete
  const [weatherData, forecastData] = await Promise.all([
    fetchWeatherReport("current", city, country),
    fetchWeatherReport("forecast", city, country)  // Corrected to "forecast"
  ]);

  // once completed we return an object consisting of city, country, current, forecast
  return {
    city: city,
    country: country,
    current: weatherData,
    forecast: forecastData
  }
};

const displayWeather = (weatherData) => {
  // Check if the weatherData passed is actually valid data.
  if (!weatherData || !weatherData.current) {
    console.error("Invalid weather data");
    return;
  }
  // We connect weatherContainer to the DomObject the weather container.
  const weatherContainer = document.getElementById("weather");
  const sunriseTime = convertTimestampToTime(weatherData.current.sys.sunrise);
  const sunsetTime = convertTimestampToTime(weatherData.current.sys.sunset);
  const temperatureCelsius = Math.round(weatherData.current.main.temp);
  const weatherStatus = weatherData.current.weather[0].main.toLowerCase();

  // Example data just to render something
  // TODO - sunrise and sunset are currently in unix timestamp format and needs to be formated
  weatherContainer.innerHTML = `
    <div class="overview"
      <p>Sunrise is at ${sunriseTime}</p>
      <p>Sunset is at ${sunsetTime}</p>
      <p>It is ${weatherStatus} outside today!</p>
      <p> The temperature is ${temperatureCelsius} °C</p>
    </div>
    <div class="header">
      <h1>Welcome to ${weatherData.city}. Here's what the weather will be like this week:</h1>
    </div>
    <div class="week">
    </div>
    <div class="search">
    </div>`;
}

const convertTimestampToTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}.${minutes}`;
}

const displayforecast = (forecastData) => {
  // Check if the forecastData passed is actually valid data.
  if (!forecastData || !forecastData.list) {
    console.error("Invalid forecast data");
    return;
  }
  // We connect forecastContainer to the DomObject with the id "forecast".
  const forecastContainer = document.getElementById("forecast");

  // Clear any existing content in the forecast container.
  forecastContainer.innerHTML = "";

  // Iterate through the forecast data and display each forecast item.
  forecastData.list.forEach((forecast) => {
    const time = convertTimestampToTime(forecast.dt);
    const temperature = Math.round(forecast.main.temp);
    const forecastDescription = forecast.weather[0].description;

    const forecastItem = document.createElement("div");
    forecastItem.classList.add("forecast-item");
    forecastItem.innerHTML = `
      <p>Time: ${time}</p>
      <p>Temperature: ${temperature} °C</p>
      <p>Forecast: ${forecastDescription}</p>
    `;

    forecastContainer.appendChild(forecastItem);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchWeatherData("Stockholm", "Sweden")
    .then((data) => {
      weatherApp.data = data;
      displayWeather(data);
      displayforecast(data.forecast); // Display the forecast data
    });
});
