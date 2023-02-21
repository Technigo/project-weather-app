const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");

// current weather details
const getCurrentWeatherData = () => {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f60c361b4571fb70c85f29bbd856c13f`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("temperature").textContent = data.main.temp;
      document.getElementById("city").textContent = data.name;
      document.getElementById("weather-type").textContent =
        data.weather[0].description;
      document.getElementById("sunrise").textContent = data.sys.sunrise;
      document.getElementById("sunset").textContent = data.sys.sunset;
    });
};

getCurrentWeatherData();

//forecast
const getForecastWeatherData = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=f60c361b4571fb70c85f29bbd856c13f`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
};

getForecastWeatherData();
