/****DOM Elements****/
const welcome = document.getElementById("welcome");
const container = document.getElementById("todaySummary");
const mainWeather = document.getElementById("mainWeather");
const weeklyWeather = document.getElementById("weeklyForecastWrapper");
const selectCity = document.getElementById("cities");

const CLOUDY_BACKGROUND = "#e6e6e6"; //constants
const CLOUDY_COLOR = "#5F6F94";
const RAIN_BACKGROUND = "#ebeefd";
const RAIN_COLOR = "#5F6F94";
const CLEAR_BACKGROUND = "#f7cece";
const CLEAR_COLOR = "#bd4882";
const NEUTRAL_BACKGROUND = "#E4DCCF";
const NEUTRAL_COLOR = "#507a79";

const setTextColor = (color) => {
  document.body.style.color = color;
};
const setBackgroundColor = (color) => {
  document.body.style.backgroundColor = color;
};

/*API one call*/
const url = {
  stockholm:
    "https://api.openweathermap.org/data/2.5/onecall?lat=59.33&lon=18.06&units=metric&exclude=minutely,hourly,alerts&appid=3285c239f8e96c158f7b6e8c65189ffd",
  sidney:
    "https://api.openweathermap.org/data/2.5/onecall?lat=-33.87&lon=151.21&units=metric&exclude=minutely,hourly,alerts&appid=ba035e9fa7344885b204d6ca5f08a903",
  bangkok:
    "https://api.openweathermap.org/data/2.5/onecall?lat=13.73&lon=100.31&units=metric&exclude=minutely,hourly,alerts&appid=03d0938fd2c8cbbbdf2019d3faac9153",
  london:
    "https://api.openweathermap.org/data/2.5/onecall?lat=51.51&lon=-0.12&units=metric&exclude=minutely,hourly,alerts&appid=204e05a6afd3596c993f849109aa03b8",
};

const fetchAPI = (url, callback) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log("error", error);
    });
};

/**** Display the weather at the top****/

const ShowCityWeather = (data) => {
const Weather = data?.current?.weather[0]?.main;

  /*Description*/
  mainWeather.innerHTML = `<p>${Weather} | ${Math.round(data?.current?.temp) + "° C"}</p>`;

  /*Sunrise*/
  const unixTimestampSunrise = data?.current?.sunrise;
  let sunrise = new Date(unixTimestampSunrise * 1000); //Declare new variable to show only hh:mm
  let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
  mainWeather.innerHTML += `<p>sunrise: ${sunriseTime}</p>`;

  /*Sunset*/
  const unixTimestampSunset = data?.current?.sunset;
  let sunset = new Date(unixTimestampSunset * 1000);
  let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });
  mainWeather.innerHTML += `<p>sunset: ${sunsetTime}</p>`;


  /*Change apperance depending on weather*/
  if (Weather === "Clouds") {
    setTextColor(CLOUDY_COLOR);
    setBackgroundColor(CLOUDY_BACKGROUND);
    container.innerHTML += `<i class="fa-solid fa-cloud"></i>
    <h1>It looks rather cloudy in ${selectCity.value} today.</h1>`;
    container.classList.add("cloudy");
  } else if (Weather === "Rain") {
    setTextColor(RAIN_COLOR);
    setBackgroundColor(RAIN_BACKGROUND);
    container.innerHTML += `<i class="fa-solid fa-cloud-rain"></i>
  <h1>Get your umbrella, it looks rather wet in ${selectCity.value} today.</h1>`;
    container.classList.add("rainy");
  } else if (Weather === "Clear") {
    setTextColor(CLEAR_COLOR);
    setBackgroundColor(CLEAR_BACKGROUND);
    container.innerHTML += `<i class="fa-solid fa-sun"></i>
  <h1>Get your sunnies on, ${selectCity.value} is looking rather great today.</h1>`;
    container.classList.add("sunny");
  } else {
    setTextColor(NEUTRAL_COLOR);
    setBackgroundColor(NEUTRAL_BACKGROUND);
    container.innerHTML += `<i class="fa-solid fa-cloud"></i>
  <h1>You can chillout, it is neutral weather in ${selectCity.value} today.</h1>`;
    container.classList.add("natural");
  }
};

/**** Display the 5 days forecast****/

const weeklyForecast = (data) => {
  let forecast = [];
  data.daily.forEach((day) => {
    let dailyForecast = {
      dayOfWeek: new Date(day.dt * 1000).toLocaleDateString("en-SE", {
        weekday: "long",
      }), // converts number to english name
      temp: Math.round(day.temp.day), // rounds to nearest integer
    };
    forecast.push(dailyForecast); // adds object for each day to the forecast array
  });
  return forecast;
};

const ShowCityForecast = (weeklyForecast) => {
  const filteredForecast = weeklyForecast.forEach((dailyforecast) => {
    let dayInWeek = `${dailyforecast.dayOfWeek}`;
    let temp = `${dailyforecast.temp}`;
    weeklyWeather.innerHTML += `
<div class="forecast-row">
<p> ${dayInWeek}:</p><p> ${temp}°C </p></div>`;
  });
};

/*** Display different information depending on selected city ****/

selectCity.addEventListener("change", () => {
  document.getElementById("welcome").style.display = "none";
  const selectedCity = selectCity.value.toLowerCase();
  weeklyWeather.innerHTML = "";
  mainWeather.innerHTML = "";
  container.innerHTML = "";

  fetchAPI(url[selectedCity], (data) => {
    ShowCityWeather(data);
    ShowCityForecast(weeklyForecast(data));
  });
});
