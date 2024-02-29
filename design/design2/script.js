const MY_API_KEY = "31320abec19306a046f96f4c46f01157";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const currentWeather = document.getElementById("current-weather");

const coordinates = {
  lat: 57.721595,
  lon: 12.0253,
};

const updateHTML = (data) => {
  currentWeather.innerHTML = data.weather[0].main;
  console.log(data);
};

const URL = `${BASE_URL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${MY_API_KEY}`;

const fetchWeather = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => updateHTML(data))
    .catch((error) => {
      console.log(error);
      errorDiv.innerText = "Something went wrong";
    });
};
fetchWeather();
