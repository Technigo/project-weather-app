const overcastContainer = document.getElementById("overcast");
const sunriseSunsetContainer = document.getElementById("sunrise-sunset");
const sunriseContainer = document.getElementById("sunrise");
const sunsetContainer = document.getElementById("sunset");
const buttonContainer = document.getElementById("button");
const forecastContainer = document.getElementById("forecast-container");
const hiddingButtonContainer = document.getElementById("hidding-button");
const searchFormContainer = document.getElementById("searchForm");
const searchInputContainer = document.getElementById("searchInput");
const descriptionContainer = document.getElementById("description");

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "07b1e3ac4ed3c5e09fa788587b7c0a21";
const DEFAULT_CITY = "Stockholm";

//const URL = `${BASE_URL}?q=${DEFAULT_CITY}&units=metric&APPID=${API_KEY}`;
//const predictURL = `${forecastURL}?q=${DEFAULT_CITY}&appid=${API_KEY}&units=metric`;
//console.log(predictURL);
//console.log(URL);

//Current weather
const currentWeather = (city) => {
  fetch(`${BASE_URL}?q=${city ?? DEFAULT_CITY}&units=metric&APPID=${API_KEY}`)
    .then((response) => response.json())
    .then((response) => {
      console.log("current weather:", response);
      showOvercast(
        response.name,
        response.main.temp,
        response.weather[0].description
      );
      showSunriseAndSunset(response.sys.sunrise, response.sys.sunset);

      descriptionContainer.innerHTML = "";
      descriptionContainer.innerHTML += `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`;
    });
};

// Forecast days ahead
const showForecast = (city) => {
  fetch(
    `${forecastURL}?q=${city ?? DEFAULT_CITY}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((response) => {
      //console.log(response);
      forecastContainer.innerHTML = "";
      const filteredForecast = response.list.filter((forecast) =>
        forecast.dt_txt.includes("12:00:00")
      );
      filteredForecast.forEach((forecast) => {
        forecastContainer.innerHTML += `
          <li>
            <span>${getWeekDay(forecast.dt)}</span>
            <img src="https://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" />
            <span>${forecast.main.temp_max.toFixed(
              1
            )}° / ${forecast.main.temp_min.toFixed(1)}°C</span>
          </li>
        `;
      });
    });
};

// Overcast function
const showOvercast = (city, temperature, description) => {
  overcastContainer.innerHTML = `<h1 class="roboto-light">${temperature.toFixed(
    1
  )} °C</h1>`;
  overcastContainer.innerHTML += `<h2 class="roboto-light">${city}</h2>`;
  overcastContainer.innerHTML += `<p class="roboto-light">${description}</p>`;
};

// Sunrise/sunset function
const showSunriseAndSunset = (sunrise, sunset) => {
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);
  sunriseContainer.innerHTML = `<span class="roboto-light"> Sunrise: ${sunriseDate.getHours()}:${sunriseDate.getMinutes()}</span>`;
  sunsetContainer.innerHTML = `<span class="roboto-light"> Sunset: ${sunsetDate.getHours()}:${sunsetDate.getMinutes()}</span>`;
};

// Button function
const toggleForecast = () => {
  if (forecastContainer.innerHTML != "") {
    forecastContainer.innerHTML = "";
  } else {
    showForecast();
  }
};

const citySearch = (event) => {
  event.preventDefault();
  if (searchInputContainer.value === "") {
    currentWeather();
    showForecast();
  } else {
    currentWeather(searchInputContainer.value);
    showForecast(searchInputContainer.value);
  }
};

//Event listeners
hiddingButtonContainer.addEventListener("click", toggleForecast);
searchFormContainer.addEventListener("submit", citySearch);

//Function unixtime to weekday
const getWeekDay = (unixtime) => {
  const dateObject = new Date(unixtime * 1000);

  const numberOfWeekDay = dateObject.getDay();
  switch (numberOfWeekDay) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
  }
};

currentWeather();
showForecast();
