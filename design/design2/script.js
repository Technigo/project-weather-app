// DOM selectors
const errorDiv = document.getElementById("error");
const currentWeather = document.getElementById("current-weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const MY_API_KEY = "31320abec19306a046f96f4c46f01157";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const coordinates = {
  lat: 57.721595,
  lon: 12.0253,
};

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const updateCurrentWeather = (data) => {
  // format current weather:
  const weatherDescription = data.weather[0].main.toLowerCase();
  const currentTemp = Math.round(data.main.temp * 10) / 10;
  currentWeather.innerHTML = `${weatherDescription} | ${currentTemp}°`;
  // format sunrise time
  const sunriseTime = formatTime(data.sys.sunrise);
  sunrise.innerHTML = `sunrise ${sunriseTime}`;
  // format sunset time
  const sunsetTime = formatTime(data.sys.sunset);
  sunset.innerHTML = `sunset ${sunsetTime}`;
};

const updateHTML = (data) => {
  updateCurrentWeather(data);
  console.log(data);
};

const URL = `${BASE_URL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${MY_API_KEY}`;

const fetchWeather = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => updateHTML(data))
    .catch((error) => {
      console.log(error);
      errorDiv.innerHTML = "Something went wrong";
    });
};
fetchWeather();
