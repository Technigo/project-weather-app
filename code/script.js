const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");

const getWeatherData = () => {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f60c361b4571fb70c85f29bbd856c13f`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);

      // current weather details
      document.getElementById("temperature").textContent = json.main.temp;
      document.getElementById("city").textContent = json.name;
      document.getElementById("weather-type").textContent =
        json.weather[0].description;
      document.getElementById("sunrise").textContent = json.sys.sunrise;
      document.getElementById("sunset").textContent = json.sys.sunset;
    });
};

getWeatherData();
