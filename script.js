const city = document.getElementById("city");
const weather = document.getElementById("typeOfWeather");
const temperature = document.getElementById("temperature");

const API_KEY = "64856650e6321cbb411769554b46b8ad";
// Reserve API KEY = "421db630ea3e3aeb0cb64db6a500c27b"

const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID";

const API_CALL = `${url}=${API_KEY}`;

fetch(`${API_CALL}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    city.innerHTML = `${data.name}`;
    weather.innerHTML = `${data.weather[0].description}`;
    temperature.innerHTML = `${data.main.temp}`;
  });
// .throw((error) => console.log(error));
//.toFixed(1)
