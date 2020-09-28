////////////////////////////////////////////////////////////////////////////

// *** VARIABLES

let currentLocation = "stockholm";

const key = "5c01b021abe8da367bcecadd67235fb3";

// *** current
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const sunRise = document.getElementById("sunRise");
const sunSet = document.getElementById("sunSet");
const icon = document.getElementById("mainWeather");

// *** forecast
const forecast = document.getElementById("forecast");

// *** weather arrays
const fog = [
  "Mist",
  "Smoke",
  "Haze",
  "Dust",
  "Fog",
  "Sand",
  "Ash",
  "Squall",
  "Tornado",
];

const rain = [
  "light rain",
  "moderate rain",
  "heavy intensity rain",
  "very heavy rain",
  "extreme rain",
];

const heavyRain = [
  "light intensity shower rain",
  "shower rain",
  "heavy intensity shower rain",
  "ragged shower rain",
];

////////////////////////////////////////////////////////////////////////////

// *** FUNCTIONS

// round number to one decimal
const round = (number) => {
  return Math.round(number * 10) / 10;
};

// from unix time to milliseconds
const time = (number) => {
  return new Date(number * 1000);
};

////////////////////////////////////////////////////////////////////////////

// *** CURRENT WEATHER

const weatherToDay = () => {
  const apiURLcurrent = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&units=metric&APPID=${key}`;

  fetch(apiURLcurrent)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // *** city
      city.innerHTML = data.name;

      // *** temperature
      temp.innerHTML = round(data.main.temp);

      // *** weather description
      weatherToday.innerHTML = data.weather[0].description;

      // *** main weather
      mainWeather.innerHTML = data.weather[0].main;

      // getting local time used for sunrise/sunset
      const localTime = data.dt; // time city
      const timeZone = data.timezone; // local time (city) difference from UTC
      const offset = new Date().getTimezoneOffset() * 60; // time difference (stockholm) from UTC in sec

      // *** sunrise
      sunrise = time(data.sys.sunrise + timeZone + offset);
      // "short" makes time show 4 numbers e.g. "06:30"
      sunRise.innerHTML = `${sunrise.toLocaleTimeString([], {
        timeStyle: "short",
      })}`;

      // *** sunset
      sunset = time(data.sys.sunset + timeZone + offset);
      // "short" makes time show 4 numbers e.g. "18:30"
      sunSet.innerHTML = `${sunset.toLocaleTimeString([], {
        timeStyle: "short",
      })}`;

      // day-time
      const isDay = () => {
        if (localTime > data.sys.sunrise && localTime < data.sys.sunset) {
          return true;
        } else {
          return false;
        }
      };

      // day or night colour

      if (!isDay()) {
        night.classList.add("night-container");
      } else {
        night.classList.remove("night-container");
      }

      // *** conditional weather ***

      // clear
      if (data.weather[0].main === "Clear") {
        city.innerHTML = `${data.name} is looking nice!`;
        icon.src = `images/${isDay() ? "sun" : "moon"}.svg`;
        // background colour
        document.body.className = "clear";

        // less than 50% clouds
      } else if (
        data.weather[0].description === "few clouds" ||
        data.weather[0].description === "scattered clouds"
      ) {
        city.innerHTML = `${data.name} is looking alright`;
        icon.src = `images/${isDay() ? "clouds-sun" : "cloudy-night"}.svg`;
        // background colour
        document.body.className = "clouds";

        // more than 50% clouds
      } else if (
        data.weather[0].description === "broken clouds" ||
        data.weather[0].description === "overcast clouds"
      ) {
        city.innerHTML = `${data.name} is looking a bit grey`;
        icon.src = "images/cloudy.svg";
        // background colour
        document.body.className = "more-clouds";

        // drizzle rain
      } else if (data.weather[0].main === "Drizzle") {
        city.innerHTML = `${data.name} is drizzling`;
        icon.src = "images/drizzle.svg";
        // background colour
        document.body.className = "drizzle";

        // rain
      } else if (rain.includes(data.weather[0].description)) {
        city.innerHTML = `${data.name} is looking rainy`;
        icon.src = `images/${isDay() ? "rain" : "rain-moon"}.svg`;
        // background colour
        document.body.className = "rain";

        // heavy rain
      } else if (heavyRain.includes(data.weather[0].description)) {
        city.innerHTML = `${data.name} is having some heavy rain. Don't forget your umbrella!`;
        icon.src = "images/heavy-rain.svg";
        // background colour
        document.body.className = "heavy-rain";

        // snow
      } else if (data.weather[0].main === "Snow") {
        city.innerHTML = `${data.name} is cold. Watch out for snow!`;
        icon.src = "images/snow.svg";
        // background colour
        document.body.className = "snow";

        // fog
      } else if (fog.includes(data.weather[0].main)) {
        city.innerHTML = `${data.name} is foggy. Watch your step!`;
        icon.src = "images/wind.svg";
        // background colour
        document.body.className = "fog";

        // thunder
      } else if (data.weather[0].main === "Thunderstorm") {
        city.innerHTML = `${data.name} is looking scary a bit scary. Watch out for thunderstorm!`;
        icon.src = "images/thunderstorm.svg";
        // background colour
        document.body.className = "thunder";
      }
    });
};

////////////////////////////////////////////////////////////////////////////

// *** FORECAST WEATHER

const weatherForcast = () => {
  const apiURLforcast = `https://api.openweathermap.org/data/2.5/forecast?q=${currentLocation}&units=metric&APPID=${key}`;

  fetch(apiURLforcast)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // filter days weather at 12.00
      const filteredForecast = data.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );

      // clearing the forcast when changing city
      forecast.innerHTML = "";

      // for each day:
      filteredForecast.forEach((item) => {
        // making time to weekdays
        const day = time(item.dt).toLocaleDateString(["en-GB"], {
          weekday: "long",
        });

        // weather description
        const weather = item.weather[0].description;

        // getting the temperature and rounds it
        const temp = Math.round(item.main.temp);

        // *** conditional ***
        // Don't know about this solution below, trying to not repeat myself  ¯\_(ツ)_/¯

        let iconForecast = `<div class="icon-container"><img class="forecast-icon" `;

        // clear
        if (item.weather[0].main === "Clear") {
          iconForecast += `src="images/sun.svg"></div>`;

          // less than 50% clouds
        } else if (
          item.weather[0].description === "few clouds" ||
          item.weather[0].description === "scattered clouds"
        ) {
          iconForecast += `src="images/clouds-sun.svg"></div>`;

          // more than 50% clouds
        } else if (
          item.weather[0].description === "broken clouds" ||
          item.weather[0].description === "overcast clouds"
        ) {
          iconForecast += `src="images/cloudy.svg"></div>`;

          // drizzle rain
        } else if (item.weather[0].main === "Drizzle") {
          iconForecast += `src="images/drizzle.svg"></div>`;

          // rain
        } else if (rain.includes(item.weather[0].description)) {
          iconForecast += `src="images/rain.svg"></div>`;

          // heavy rain
        } else if (heavyRain.includes(item.weather[0].description)) {
          iconForecast += `src="images/heavy-rain.svg"></div>`;

          // snow
        } else if (item.weather[0].main === "Snow") {
          iconForecast += `src="images/snow.svg"></div>`;

          // fog
        } else if (fog.includes(item.weather[0].main)) {
          iconForecast += `src="images/wind.svg"></div>`;

          // thunder
        } else if (item.weather[0].main === "Thunderstorm") {
          iconForecast += `src="images/thunderstorm.svg"></div>`;
        }

        // adding "a" or "[nothing]"
        const pre =
          weather.includes("few") ||
          weather.includes("clear") ||
          weather.includes("thunderstorm")
            ? "a"
            : "";

        // writing to html

        forecast.innerHTML += `<div class="forecast-card"><div class="text-container"><p class="forecast-info">A ${day} with ${pre} ${weather} and a temperature of ${temp}°C<p></div>${iconForecast}</div>`;
      });
    });
};

weatherToDay();
weatherForcast();

////////////////////////////////////////////////////////////////////////////

// *** DROP DOWN MENY

// toggle meny
const selectCityMeny = () => {
  newCity.classList.toggle("open");
  // scroll to bottom
  window.scrollTo(0, document.body.scrollHeight);
};

newCity.onclick = selectCityMeny;

// scroll to top
const toTop = () => {
  window.scroll(0, 0);
};

// avoke
const changeCity = (city) => {
  currentLocation = city;
  weatherToDay();
  weatherForcast();
  selectCityMeny();
  toTop();
};

////////////////////////////////////////////////////////////////////////////

// *** GET LOCATION

// geo-location
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(usePosition);
    document.getElementById(
      "loading"
    ).innerHTML = `Finding your area, please wait...`;
  } else {
    weatherToDay();
    weatherForcast();
  }
};

const usePosition = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  currentLocation = `&lat=${latitude}&lon=${longitude}`;
  weatherToDay();
  weatherForcast();
  document.getElementById("loading").innerHTML = "";
};

getLocation();
