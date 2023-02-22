let currentCity = "Malmö";

let currentWeatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity},Sweden&units=metric&APPID=d73aa5f2cfee2a35632856b10b30a458`;

let weeklyWeatherLink = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity},Sweden&units=metric&APPID=d73aa5f2cfee2a35632856b10b30a458`;

let weatherDescriptionDiv = document.getElementById("weatherDescription");
let cityNameDiv = document.getElementById("cityName");
let currentTemperatureDiv = document.getElementById("currentTemperature");
let sunriseDiv = document.getElementById("sunrise");
let sunsetDiv = document.getElementById("sunset");
let weeklyWeatherDiv = document.getElementById("weeklyWeather");

const fetchCurrentWeather = () => {
  fetch(currentWeatherLink)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderCurrentWeather(data);
      renderSunriseSunset(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchWeeklyWeather = () => {
  fetch(weeklyWeatherLink)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderForecast(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const renderCurrentWeather = (data) => {
  let weatherDescription = data.weather[0].description;
  let cityName = data.name;
  let currentTemperature = data.main.temp.toFixed();

  weatherDescriptionDiv.innerHTML = `${weatherDescription}`;
  cityNameDiv.innerHTML = `${cityName}`;
  currentTemperatureDiv.innerHTML = `${currentTemperature}°C`;
};

const renderSunriseSunset = (data) => {
  let fetchedSunrise = data.sys.sunrise;
  let sunriseTime = new Date(fetchedSunrise * 1000);
  let sunriseHours = sunriseTime.getHours();
  let sunriseMinutes = sunriseTime.getMinutes();
  let renderedSunrise =
    (sunriseHours < 10 ? "0" + sunriseHours : sunriseHours) +
    "." +
    (sunriseMinutes < 10 ? "0" + sunriseMinutes : sunriseMinutes);

  let fetchedSunset = data.sys.sunset;
  let sunsetTime = new Date(fetchedSunset * 1000);
  let sunsetHours = sunsetTime.getHours();
  let sunsetMinutes = sunsetTime.getMinutes();
  let renderedSunset =
    (sunsetHours < 10 ? "0" + sunsetHours : sunsetHours) +
    "." +
    (sunsetMinutes < 10 ? "0" + sunsetMinutes : sunsetMinutes);

  sunriseDiv.innerHTML = `${renderedSunrise}`;
  sunsetDiv.innerHTML = `${renderedSunset}`;
};

const renderForecast = (data) => {
  //code from https://stackoverflowteams.com/c/technigo/questions/786

  const filteredForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00")
  );

  filteredForecast.forEach((day) => {
    const date = new Date(day.dt * 1000);

    // Make a Date object for right now
    const now = new Date();

    // Compare the forecast's day with the day right now
    const isTodaysForecast = date.getDay() === now.getDay();

    let dayName = date.toLocaleDateString("en-US", { weekday: "short" });

    // We don't want to include this forecast if it is for today
    if (!isTodaysForecast) {
      weeklyWeatherDiv.innerHTML += `<p>${dayName} <img src="http://openweathermap.org/img/wn/${
        day.weather[0].icon
      }.png" alt="${
        day.weather[0].description
      }">  ${day.main.temp.toFixed()}°C</p>`;
    }
  });
};

fetchCurrentWeather();
fetchWeeklyWeather();
