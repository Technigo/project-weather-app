//OpenWeatherMap API
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "86cc8fe4b24936e5560b67f7b96b6c03";
const urlCity = "Stockholm";
const URL = `${BASE_URL}${urlCity}&units=metric&APPID=${API_KEY}`;

// Forecast API
const FORECAST_BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?";
let lat = "59.3326";
let lon = "18.0649";
const FORECAST_URL = `${FORECAST_BASE_URL}lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
//const FORECAST_URL =
("http://api.openweathermap.org/data/2.5/forecast?lat=18&lon=10&appid=86cc8fe4b24936e5560b67f7b96b6c03");

// DOM selectors
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const buttonContainer = document.getElementById("button-container");
const forecastButton = document.getElementById("forecast-button");
const forecast = document.getElementById("forecast");
const skyContainer = document.getElementById("sky-container");

skyContainer.classList.remove("animation-active");

const fetchWeather = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      city.innerHTML = `<h2>${data.name}</h2>`;
      temp.innerHTML = `<h1>${Math.round(data.main.temp)}°&#x1D9C;</h1>`;
      description.innerHTML = `<h3>${data.weather[0].main}</h3>`;
      let sunriseHoursMinutes = hoursMinutes(data.sys.sunrise);
      let sunsetHoursMinutes = hoursMinutes(data.sys.sunset);

      sunrise.innerHTML = `<h3>${sunriseHoursMinutes}</h3>`;
      sunset.innerHTML = `<h3>${sunsetHoursMinutes}</h3>`;
    })
    .catch((error) => console.log("Caught error:", error));
};
fetchWeather();
/*
const fetchForecast = () => {
  fetch(FORECAST_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      
      // Filter out the noon values.
      const array = data.list.filter((array) =>
        array.dt_txt.includes("12:00:00")
      );
      console.log(array);

      array.reverse((array) => array.dt_txt);
      console.log(array);

      array.forEach((element) => {
        forecast.innerHTML += `<div class="forecastDay">
        <p class="forecastDayWeekday">${displayDay(element.dt)}</p>
        <img src="assets/partially.png" alt="">
        <p class="forecastDayTemp">${Math.round(
          element.main.temp_max
        )}° / ${Math.round(element.main.temp_min)}°&#x1D9C</p></div>`;
      });
    })
    .catch((error) => console.log("Caught error:", error));
};*/

const fetchForecast = () => {
  fetch(FORECAST_URL)
    .then((response) => response.json())
    .then((data) => {
      // Grouping data within their dates.
      const groupedData = data.list.reduce((days, row) => {
        const date = row.dt_txt.split(" ")[0];
        days[date] = [...(days[date] ? days[date] : []), row];
        return days;
      }, {});

      for (let date of Object.keys(groupedData)) {
        console.log("Date:", date);
        // current date -> date
        // original items array for this date -> groupedData[date]
        console.log("MaxTemp:", getMax(groupedData[date], "temp_max"));
        console.log("MinTemp:", getMin(groupedData[date], "temp_min"));

        console.log("\n\n");

        forecast.innerHTML += `<div class="forecastDay">
        <p class="forecastDayWeekday">${displayDay(groupedData[date][0].dt)}</p>
        <img src="assets/partially.png" alt="">
        <p class="forecastDayTemp">${Math.round(
          getMax(groupedData[date], "temp_max")
        )}° / ${Math.round(
          getMin(groupedData[date], "temp_min")
        )}°&#x1D9C</p></div>`;
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
fetchForecast();

// Clean up the date to the 24h numbers with just hours and minutes.
const hoursMinutes = (time) => {
  let date = new Date(parseInt(time * 1000));
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
// Clean up the date to only display the weekday in short format in the language of the user.
const displayDay = (time) => {
  let date = new Date(parseInt(time * 1000));
  return date.toLocaleString(navigator.language, {
    weekday: "short",
  });
};

//Choose Image based on weather description.
const chooseImage = (weather) => {};

// Check to see if current time is after sunset and before sunrise. Display moon.
const checkMoon = (sunrise, sunset) => {};

// Toggle forecast
const toggleForecast = () => {
  if (skyContainer.classList.contains("animation-active")) {
    skyContainer.classList.remove("animation-active");
    buttonContainer.classList.remove("transition-active");
    forecast.classList.remove("hidden");
  } else {
    skyContainer.classList.add("animation-active");
    buttonContainer.classList.add("transition-active");
    forecast.classList.add("hidden");
  }
  console.log("toggleForecast");
};

// Eventlisteners
forecastButton.addEventListener("click", (e) => {
  toggleForecast();
});
