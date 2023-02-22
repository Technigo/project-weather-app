let weatherLink =
  "https://api.openweathermap.org/data/2.5/weather?q=Malm%C3%B6,Sweden&units=metric&APPID=";

let weatherDescriptionHtml = document.getElementById("weatherDescription");
let cityNameHtml = document.getElementById("cityName");
let currentTemperatureHtml = document.getElementById("currentTemperature");
let mediumTemperature;

const fetchWeather = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Malm%C3%B6,Sweden&units=metric&APPID=d73aa5f2cfee2a35632856b10b30a458"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      let weatherDescription = data.weather[0].description;
      let cityName = data.name;
      let currentTemperature = data.main.temp;
      weatherDescriptionHtml.innerHTML = `${weatherDescription}`;
      cityNameHtml.innerHTML = `${cityName}`;
      currentTemperatureHtml.innerHTML = `${currentTemperature}`;
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchWeather();
