const weather = document.getElementById("weather");
const descriptionToday = document.getElementById("description-today");
const tempToday = document.getElementById("temp-today");
const sunUp = document.getElementById("sunrise");
const sunDown = document.getElementById("sunset");
const windGust = document.getElementById("wind");
const feelsLike = document.getElementById("feelslike");
const iconFileName = document.getElementById("weather-icon");
const search = document.querySelector(".search-box button");

// Define weatherIcons object
const weatherIcons = {
  default: "./images/undefined.png",
  "clear sky": "./images/sun.png",
  "few clouds": "./images/partly-cloudy.png",
  "scattered clouds": "./images/partly-cloudy.png",
  "overcast clouds": "./images/cloud.png",
  "shower rain": "./images/heavy-rain.png",
  rain: "./images/heavy-rain.png",
  thunderstorm: "./images/storm.png",
  snow: "./images/snow.png",
  mist: "./images/haze.png",
  "light rain": "./images/light-rain.png",
  "broken clouds": "./images/partly-cloudy.png",
  "light intensity drizzle": "./images/light-rain.png",
};

// Search box function
search.addEventListener("click", () => {
  const APIkey = "7916e2ff30e82c8f4b79258c3235d9c2";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  // Fetching weather data from city of choice
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${APIkey}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // Update weather in city from API
      weather.innerHTML = `<h1>Today's weather in ${json.name}</h1>`;

      // Describe weather
      descriptionToday.innerHTML = `<h2>${json.weather[0].description}</h2>`;

      // Change weatherIcon based on weather description
      if (json.weather[0].description) {
        const iconFileName = weatherIcons[json.weather[0].description.toLowerCase()] || weatherIcons.default;
        descriptionToday.innerHTML += `<img src="${iconFileName}" alt="Weather icon">`;
      }

      // Temperature and "feels like..."
      tempToday.innerHTML = `<h3>${Math.round(json.main.temp * 10) / 10}°C</h3>`;
      feelsLike.innerHTML = `<h3 class="temp">Feels like ${Math.round(json.main.feels_like * 10) / 10}°C</h3>`;

      //Sunrise and sunset
      const sunrise = json.sys.sunrise;
      const sunriseTimepoint = new Date(sunrise * 1000);
      const sunriseOffset = sunriseTimepoint.getTimezoneOffset() * 60 * 1000;
      const sunriseLocalTime = new Date(sunrise * 1000 - sunriseOffset);
      const sunriseHrMin = sunriseTimepoint.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      sunUp.innerHTML = `<h4>The sun rises at ${sunriseHrMin}</h4>`;
      console.log(json.sys.sunrise);

      const sunset = json.sys.sunset;
      const sunsetTimepoint = new Date(sunset * 1000);
      const sunsetOffset = sunsetTimepoint.getTimezoneOffset() * 60 * 1000;
      const sunsetLocalTime = new Date(sunset * 1000 - sunsetOffset);
      const sunsetHrMin = sunsetTimepoint.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      sunDown.innerHTML = `<h4>and sets at ${sunsetHrMin}</h4>`;
      console.log(json.sys.sunset);

      // Wind and humidity
      const humidity = json.main.humidity;
      const wind = json.wind.gust ? json.wind.gust : json.wind.speed;
      windGust.innerHTML = `<h5>Winds blow up to ${wind} m/s and humidity is at ${humidity}%</h5>`;
    });

  // Five day weather forecast
  const fiveDayApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=7916e2ff30e82c8f4b79258c3235d9c2`;
  const weatherFiveDays = document.getElementById("weather-five-days");

  const fiveDayForecast = () => {
    fetch(fiveDayApiUrl)
      .then((response) => {
        return response.json();
      })

      .then((fiveDayArray) => {
        const filteredForecast = fiveDayArray.list.filter((item) => item.dt_txt.includes("12:00"));

        weatherFiveDays.innerHTML = "";
        filteredForecast.forEach((eachDay) => {
          weatherFiveDays.innerHTML += generateHTMLForForecast(eachDay);
        });
      });
  };

  fiveDayForecast();

  // A function that retrieve and convert data from the API in a readable format.
  function generateHTMLForForecast(day) {
    const weekdayUnix = day.dt;
    const weekdayLong = new Date(weekdayUnix * 1000);
    const weekdayName = weekdayLong.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
    const dayTemp = `${Math.round(day.main.temp * 10) / 10}`;

    // And creates HTML code that is returned
    let fiveDayForecastHTML = "";
    fiveDayForecastHTML += `<div class="weather-five-days">`;
    fiveDayForecastHTML += `<p class="weekday-name">${weekdayName}</p>`;
    fiveDayForecastHTML += `<p class="day-temp">${dayTemp}°C</p>`;
    fiveDayForecastHTML += `</div>`;
    return fiveDayForecastHTML;
  }
});
