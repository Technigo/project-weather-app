// Here we put all the code that executes all the different functiontions and views

// We save our config settings in the weatherApp object
const weatherApp = {
  apiKey: "b519b073de061051721cf997e13c4842",
  apiUrl: "https://api.openweathermap.org/data/2.5/",
  units: "metric",
  // we use this to store our weatherData globally for testing
  data: {}
}

document.addEventListener("DOMContentLoaded", function () {
  fetchWeatherData("Miami", "USA")
    .then((data) => {
      weatherApp.data = data;
      displayWeather(data);
      displayforecast(data.forecast); // Display the forecast data
    });
});
