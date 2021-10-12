//DOMs
const changeCity = document.getElementById("changeCity");
const weatherContainer = document.getElementById("weather-container");
const todaysWeather = document.getElementById("today");
const dayContainer = document.getElementsByClassName("day-container");
const cityBtn = document.getElementById("cityBtn");
const backgroundImg = document.getElementById("backgroundImg");
const cityInput = document.getElementById("cityInput");

// GLOBAL VARIABLES
const timezoneOffset = new Date().getTimezoneOffset() * 60;

//Translates seconds into a date string.
const getTimeOf = (time, timezone) => {
  return new Date((time + timezone + timezoneOffset) * 1000).toLocaleTimeString(
    "sv-GB",
    { hour: "2-digit", minute: "2-digit" }
  );
};

// The function creates an image for Javascript injection later into the HTML.
const createWeatherImg = (url, alt) => {
  let weather = document.createElement("img");
  weather.src = url;
  weather.alt = alt;
  return weather;
};

// Creating images for different weather types.
const cloudyIcon = createWeatherImg("./assets/cloud-icon.png", "clouds");
const rainIcon = createWeatherImg("./assets/rain-icon.png", "rain");
const sunIcon = createWeatherImg("./assets/sun-icon.png", "sun");
const windIcon = createWeatherImg("./assets/wind-icon.png", "wind");
const stormIcon = createWeatherImg("./assets/storm-icon.png", "storm");
const snowIcon = createWeatherImg("./assets/snow-icon.png", "snow");
const partlycloudyIcon = createWeatherImg(
  "./assets/partly-cloudy-icon.png",
  "partly cloudy"
);
const atmosphereIcon = createWeatherImg(
  "./assets/atmosphere-icon.png",
  "atmosphere"
);
const fogIcon = createWeatherImg("./assets/fog-icon.png");

//Creating images for sunrise and sunset.
const sunriseIcon = createWeatherImg("./assets/sunrise-icon.png", "sunrise");
const sunsetIcon = createWeatherImg("./assets/sunset-icon.png", "sunset");

//Creates a weather icon based on the forecasted weather.
const chooseWeatherIcon = (day) => {
  let main = day.weather[0].main;
  if (
    day.weather[0].description === "broken clouds" ||
    day.weather[0].description === "scattered clouds" ||
    day.weather[0].description === "few clouds"
  ) {
    return partlycloudyIcon;
  } else if (main === "Clouds") {
    return cloudyIcon;
  } else if (main === "Rain") {
    return rainIcon;
  } else if (main === "Thunderstorm") {
    return stormIcon;
  } else if (main === "Drizzle") {
    return rainIcon;
  } else if (main === "Fog" || main === "Mist") {
    return fogIcon;
  } else if (main === "Snow") {
    return snowIcon;
  } else if (main === "Clear") {
    return sunIcon;
  } else {
    return atmosphereIcon;
  }
};

//Creates forecast for each day.
const createFiveDayForecast = (filteredForecast) => {
  filteredForecast.forEach((day) => {
    weatherIcon = chooseWeatherIcon(day);
    const days = new Date(day.dt * 1000).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const forecastTemp = Math.round(day.main.temp * 10) / 10;
    const forecastWind = Math.round(day.wind.speed * 10) / 10;
    createFiveDaysInnerHTML(days, forecastTemp, forecastWind, weatherIcon);
  });
};

//Creates innerHTML for each day in the forecast.
const createFiveDaysInnerHTML = (
  days,
  forecastTemp,
  forecastWind,
  weatherIcon
) => {
  weatherContainer.innerHTML += `
        <section class="day"> 
        <span class="forecast-day">${days}</span> 
        <span class="forecast-temp">${forecastTemp} °C </span> 
        <span class="forecast-wind"><img src=${windIcon.src} alt=${windIcon.alt} class= "wind-icon"/> ${forecastWind}m/s</span>
        <span class="forcast-weather"><img src=${weatherIcon.src} alt=${weatherIcon.alt} class="forecast-weather"/></span>
        </section>
      `;
};

//Creates innerHTML to display current weather and temperatures in the header.
const changeHeaderInnerHTML = (
  data,
  timeOfSunrise,
  timeOfSunset,
  weatherIcon
) => {
  today.innerHTML = `
        <h1>${data.name}</h1>
        <h2>${Math.round(data.main.temp * 10) / 10} °C</h2>
        <h5>Feels like: ${Math.round(data.main.feels_like * 10) / 10} °C</h5>
        <img src=${weatherIcon.src} alt=${
    weatherIcon.alt
  } class= "today-weather"/>
        <h3>${data.weather.map((item) => item.description)}</h3>
        <h5 class="windpar">Windspeed: ${
          Math.round(data.wind.speed * 10) / 10
        } m/s</h5>
        <p class="sunrisepar"><img src=${sunriseIcon.src} alt=${
    sunriseIcon.alt
  } class= "sunrise"/> ${timeOfSunrise}</p>
        <p class="sunsetpar"><img src=${sunsetIcon.src} alt=${
    sunsetIcon.alt
  } class= "sunset"/> ${timeOfSunset}</p>
    `;
};

//Changes background image in header depending on todays weather prognosis.
const setBackgroundWeather = (data) => {
  let main = data.weather.map((item) => item.main);
  if (
    data.weather[0].description === "broken clouds" ||
    data.weather[0].description === "scattered clouds" ||
    data.weather[0].description === "few clouds"
  ) {
    return "partly-cloudy";
  } else if (main.includes("Clouds")) {
    return "clouds";
  } else if (main.includes("Rain")) {
    return "rain";
  } else if (main.includes("Drizzle")) {
    return "rain";
  } else if (main.includes("Thunderstorm")) {
    return "rain";
  } else if (main.includes("Snow")) {
    return "snow";
  } else if (main.includes("Fog") || main.includes("Mist")) {
    return "fog";
  } else if (main.includes("Clear")) {
    return "clear";
  } else {
    return "atmosphere";
  }
};

// Takes a city name and returns two URLs for 5 day and current weather fetches.
const getURLsByCityName = (city) => {
  let WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5000cd66a9090b2b62f53ce8a59ebd9e`;

  let FIVE_DAYS = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=5000cd66a9090b2b62f53ce8a59ebd9e`;
  return { WEATHER_API, FIVE_DAYS };
};

// Fetches from five day and current weather api, creates variables from the data and runs functions to inject HTML.
const doFetch = (URLs) => {
  WEATHER_API = URLs.WEATHER_API;
  FIVE_DAYS = URLs.FIVE_DAYS;

  fetch(WEATHER_API)
    .then((res) => res.json())
    .then((data) => {
      weatherIcon = chooseWeatherIcon(data);
      backgroundImg.classList = setBackgroundWeather(data);
      let timezone = data.timezone;
      const timeOfSunrise = getTimeOf(data.sys.sunrise, timezone);
      const timeOfSunset = getTimeOf(data.sys.sunset, timezone);
      changeHeaderInnerHTML(data, timeOfSunrise, timeOfSunset, weatherIcon);
    })
    .catch(() => {
      today.innerHTML = `
            <h1>Sorry, we couldn't find that location!</h1>
            <h3>Please try again!</h3>
            `;
    });

  fetch(FIVE_DAYS)
    .then((res) => res.json())
    .then((data) => {
      const filteredForecast = data.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );
      createFiveDayForecast(filteredForecast);
    })
    .catch(() => {
      weatherContainer.innerHTML = ``;
    });
};

//EVENTLISTENERS

// User input in choose a location.
cityBtn.addEventListener("click", () => {
  today.innerHTML = "";
  weatherContainer.innerHTML = "";
  let city = cityInput.value;
  doFetch(getURLsByCityName(city));

  //Renews cards' animation on city search.
  weatherContainer.classList.remove("weather-container");
  void weatherContainer.offsetWidth;
  weatherContainer.classList.add("weather-container");
});

//Get user geolocation on page load.
window.addEventListener("load", () => {
  let options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0,
  };

  const success = (pos) => {
    let crd = pos.coords;
    longLatURLs = {
      WEATHER_API: `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&appid=5000cd66a9090b2b62f53ce8a59ebd9e`,
      FIVE_DAYS: `https://api.openweathermap.org/data/2.5/forecast?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&appid=5000cd66a9090b2b62f53ce8a59ebd9e`,
    };
    doFetch(longLatURLs);
    weatherContainer.classList.remove("weather-container");
    void weatherContainer.offsetWidth;
    weatherContainer.classList.add("weather-container");
  };
  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  navigator.geolocation.getCurrentPosition(success, error, options);
});

//Allows 'enter-button' press.
cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    e.preventDefault();
    cityBtn.click();
  }
});
