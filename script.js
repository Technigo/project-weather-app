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
  // TODO - Check if the weatherData passed is actually valid data.
  if (!weatherData || !weatherData.current) {
    console.error("Invalid weather data");
    return;
  }
  // We connect weatherContainer to the DomObject the weather container.
  const weatherContainer = document.getElementById("weather");
  const sunriseTime = convertTimestampToTime(weatherData.current.sys.sunrise);
  const sunsetTime = convertTimestampToTime(weatherData.current.sys.sunset);

  // Example data just to render something
  // TODO - sunrise and sunset are currently in unix timestamp format and needs to be formated
  weatherContainer.innerHTML = `
    <div class="overview"
      <p>Sunrise is at ${sunriseTime}</p>
      <p>Sunset is at ${sunsetTime}</p>
      <p>It is ${weatherData.weather} today!</p>
      <p> The temperature is ${weatherData.current.main.temp} °C</p>
    </div>
    <div class="header">
      <h1>Welcome to ${weatherData.city}. Here's what the weather will be like this week:</h1>
    </div>
    <div class="week">
    </div>
    <div class="search">
    </div>`;

}

// Our initialize function that will execute once the DOMContent has been loaded
document.addEventListener("DOMContentLoaded", function () {
  // TODO - Error handling
  // We try and fetch data for Stockholm, Sweden
  fetchWeatherData("Stockholm","Sweden")
    // TODO - Add a transform function that transforms the data to the format that we want
    // .then(unformattedData => transformData(unformattedData))
    // Once we have the data we display it
    .then((data) => {
      // We save the data into our weatherApp object so we can use it in console
      weatherApp.data = data
      // We trigger our display function for the code
      displayWeather(data)
    })
})

function convertTimestampToTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}.${minutes}`;
}
