// This a helper function that takes an object of parameters and converts it into "q=Stockholm,Sweden&units=metric&APPID=XXXX"
const buildQueryString = (params) => {
  return new URLSearchParams(params).toString();
}

// We save our config settings in the weatherApp object
const weatherApp = {
  apiKey: "b519b073de061051721cf997e13c4842",
  apiUrl: "https://api.openweathermap.org/data/2.5/forecast",
  units: "metric"
}

// This function takes the parameters city and country and tries to fetch the weather data.
const fetchWeather = (city, country) => {
  // Here we set the parameters for our API request.
  const params = {
    // we are grabbing the apiKey from our weatherApp object
    APPID: weatherApp.apiKey,
    q: `${city},${country}`,
    units: weatherApp.units
  }
  // We convert our parameters into a string
  const queryString = buildQueryString(params)
  // We put together the apiurl and the queryString to form the complete fetch url
  const url = `${weatherApp.apiUrl}?${queryString}`;
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

const displayWeather = (weatherData) => {
  // TODO - Check if the weatherData passed is actually valid data.
  // We connect weatherContainer to the DomObject the weather container.
  const weatherContainer = document.getElementById("weather");

  // Example data just to render something
  weatherContainer.innerHTML = `
    <div class="overview"
      <p>Sunrise is at ${weatherData.city.sunrise}</p>
      <p>Sunset is at ${weatherData.city.sunset}</p>
    </div>
    <div class="header">
      <h1>Welcome to ${weatherData.city.name}. Here's what the weather will be like this week:</h1>
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
  fetchWeather('Stockholm','Sweden')
    // TODO - Add a transform function that transforms the data to the format that we want
    // .then(unformattedData => transformData(unformattedData))
    // Once we have the data we display it
    .then(data => displayWeather(data))
})
