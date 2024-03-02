//////////////// DOM SELECTORS //////////////////
const errorDiv = document.getElementById("error");
const currentWeather = document.getElementById("current-weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const icon = document.getElementById("icon");
const promptText = document.getElementById("prompt-text");

//////////////// GLOBAL VARIABLES ///////////////
const MY_API_KEY = "31320abec19306a046f96f4c46f01157";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const coordinates = {
  lat: 57.721595,
  lon: 12.0253,
};

const city = "Göteborg";

const URL = `${BASE_URL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${MY_API_KEY}`;

///////////// Function to fetch weather //////////////

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

///////////// Function to format time //////////////

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

///////// Function to update prompt section /////////

const updatePrompt = (data) => {
  switch (data.weather[0].main) {
    case "Clear":
      icon.setAttribute("src", "./icons/noun_Sunglasses_2055147.svg");
      icon.setAttribute("alt", "Sunglasses");
      promptText.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`;
      break;
    case "Clouds":
      icon.setAttribute("src", "./icons/noun_Cloud_1188486.svg");
      icon.setAttribute("alt", "Cloud");
      promptText.innerHTML = `Light a fire and get cosy. ${city} is looking grey today.`;
      break;
    case "Rain":
      icon.setAttribute("src", "./icons/noun_Umbrella_2030530.svg");
      icon.setAttribute("alt", "Umbrella");
      promptText.innerHTML = `Don't forget your umbrella. It's wet in ${city} today.`;
      break;
    default:
      icon.removeAttribute("src");
      icon.removeAttribute("alt");
      promptText.innerHTML = city;
  }
};

//////// Function to update current weather, sunrise and sunset ////////

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

///////////// Function to update HTML //////////////

const updateHTML = (data) => {
  updateCurrentWeather(data);
  updatePrompt(data);
  console.log(data);
};
