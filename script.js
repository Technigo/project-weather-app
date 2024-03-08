//OpenWeatherMap API
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "86cc8fe4b24936e5560b67f7b96b6c03";
let urlCity = "Stockholm";
const URL = `${BASE_URL}${urlCity}&units=metric&APPID=${API_KEY}`;

// Forecast API
const FORECAST_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?";
let lat = "59.3326";
let lon = "18.0649";
const FORECAST_URL = `${FORECAST_BASE_URL}lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

// DOM selectors
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherImage = document.getElementById("weather-image");
const buttonContainer = document.getElementById("button-container");
const forecastButton = document.getElementById("forecast-button");
const forecastDay = document.getElementsByClassName("forecast-day");
const forecast = document.getElementById("forecast");
const skyContainer = document.getElementById("sky-container");
const inner = document.getElementById("inner");
const search = document.getElementById("search");
const searchField = document.getElementById("search-field");

skyContainer.classList.remove("animation-active");

const fetchWeather = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerHTML = `<h2>${data.name}</h2>`;
      temp.innerHTML = `<h1>${
        Math.round(data.main.temp * 10) / 10
      }°&#x1D9C;</h1>`;
      description.innerHTML = `<h3>${data.weather[0].description}</h3>`;
      console.log(data);

      const sunriseData = new Date((data.sys.sunrise + data.timezone) * 1000);
      sunriseData.setMinutes(
        sunriseData.getMinutes() + sunriseData.getTimezoneOffset()
      );

      const sunriseTime = sunriseData.toLocaleTimeString(["sv-SE"], {
        timeStyle: "short",
      });

      const sunsetData = new Date((data.sys.sunset + data.timezone) * 1000);
      sunsetData.setMinutes(
        sunsetData.getMinutes() + sunsetData.getTimezoneOffset()
      );

      const sunsetTime = sunsetData.toLocaleTimeString(["sv-SE"], {
        timeStyle: "short",
      });

      weatherImage.src = chooseImage(data.weather[0].main);
      lat = data.coord.lat;
      lon = data.coord.lon;
      console.log("Description:", description.innerHTML);

      sunrise.innerHTML = `<h3>${sunriseTime}</h3>`;
      sunset.innerHTML = `<h3>${sunsetTime}</h3>`;

      fetchForecast(lat, lon);
    })
    .catch((error) => console.log("Caught error:", error));
};
fetchWeather(URL);

const fetchForecast = (lat, lon) => {
  fetch(
    `${FORECAST_BASE_URL}lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      forecast.innerHTML = ``;
      // Grouping data within their dates.
      const groupedData = data.list.reduce((days, row) => {
        const date = row.dt_txt.split(" ")[0];
        days[date] = [...(days[date] ? days[date] : []), row];
        return days;
      }, {});

      let i = 0;
      for (let date of Object.keys(groupedData)) {
        // Only show data from the objects with an array lenght of 8. This removes the current day and any partial final day.
        if (groupedData[date].length === 8) {
          i++;
          if (i > 4) {
            break;
          }
          forecast.innerHTML += `<div class="forecastDay">
          <p class="forecastDayWeekday">${displayDay(
            groupedData[date][i].dt
          )}</p>
          <img src=${chooseImage(groupedData[date][i].weather[0].main)} alt="">
          <p class="forecastDayTemp">${
            Math.round(getMax(groupedData[date], "temp_max") * 10) / 10
          }° / ${
            Math.round(getMin(groupedData[date], "temp_min") * 10) / 10
          }°&#x1D9C</p></div>`;
        }
      }
    });

  function getMax(arr, attr) {
    return Math.max.apply(
      Math,
      arr.map((item) => item.main[attr])
    );
  }

  function getMin(arr, attr) {
    return Math.min.apply(
      Math,
      arr.map((item) => item.main[attr])
    );
  }
};

// Clean up the date to only display the weekday in short format in the language of the user.
const displayDay = (time) => {
  let date = new Date(parseInt(time * 1000));
  return date.toLocaleString(navigator.language, {
    weekday: "short",
  });
};

//Choose Image based on weather description.
const chooseImage = (weather) => {
  if (
    weather === "Mist" ||
    weather === "Smoke" ||
    weather === "Haze" ||
    weather === "Dust" ||
    weather === "Fog" ||
    weather === "Sand" ||
    weather === "Ash" ||
    weather === "Squall" ||
    weather === "Tornado"
  ) {
    return "assets/mist.png";
  } else if (weather === "Thunderstorm") {
    return "assets/thunder.png";
  } else if (weather === "Drizzle") {
    return "assets/drizzle.png";
  } else if (weather === "Rain") {
    return "assets/rain.png";
  } else if (weather === "Snow") {
    return "assets/snow.png";
  } else if (weather === "Clear") {
    return "assets/sunny.png";
  } else if (weather === "Clouds") {
    return "assets/cloudy.png";
  } else {
    return "assets/partially.png";
  }
};

// Toggle forecast
const toggleForecast = () => {
  if (skyContainer.classList.contains("top-container")) {
    skyContainer.classList.remove("top-container");
    skyContainer.classList.add("bottom-container");

    inner.classList.add("bottom-inner");
    inner.classList.remove("top-inner");

    forecastButton.classList.remove("forecast-button-top");
    forecastButton.classList.add("forecast-button-bottom");
    forecast.classList.add("hidden");
    searchField.classList.remove("hidden");
  } else {
    skyContainer.classList.remove("bottom-container");
    skyContainer.classList.add("top-container");

    inner.classList.remove("bottom-inner");
    inner.classList.add("top-inner");

    forecastButton.classList.remove("forecast-button-bottom");
    forecastButton.classList.add("forecast-button-top");
    forecast.classList.remove("hidden");
    searchField.classList.add("hidden");
  }
};

// Eventlisteners
forecastButton.addEventListener("click", (e) => {
  toggleForecast();
});

search.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = searchField.value.trim();
  const cityName = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
  if (cityName) {
    //Fetch weather data and forecast for new city
    fetchWeather(`${BASE_URL}${cityName}&units=metric&APPID=${API_KEY}`);
    //Clear the input after user presses enter
    searchField.value = "";
  } else {
    searchField.placeholder = "Try another city";
  }
});
