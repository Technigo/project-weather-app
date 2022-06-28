// Global DOM Selectors
const body = document.querySelector("body");
const topSection = document.getElementById("topSection");
const middleSection = document.getElementById("middleSection");
const bottomSection = document.getElementById("bottomSection");
const horizontalRule = document.getElementsByClassName("horizontal-rule");
const title = document.querySelector("title");

//Global Variable
let weatherDescriptionObj = {};
const WEATHER_API_KEY = "1d70a07080ab5151e3f54886ea0d8389";
const IP_API_KEY = "e3c872d0-8fd1-11ec-b62f-1506f8441a2e";
const SUN_API_KEY = "cf20150b8ced4a14b02711e51f46b972";

//Weather App with Geolocation
const weatherApp = async () => {
  // This API gets longitude, latitude, IP, city, and country
  // When we were testing, the IP address wasn't super accurate ;)
  // But we didn't want to ask the users for permission to access their location data, so this is our workaround.
  const IP_API = `https://api.ipbase.com/v2/info?apikey=${IP_API_KEY}`;
  const userLocationWait = await fetch(IP_API);
  const userLocation = await userLocationWait.json();
  console.log(userLocation);
  lat = userLocation.data.location.latitude;
  lon = userLocation.data.location.longitude;
  city = userLocation.city;
  country = userLocation.country_name;
  ip = userLocation.ip;

  // This API takes the city and country and returns sunrise and sunset in local datetime
  const SUN_API = `https://api.ipgeolocation.io/astronomy?apiKey=${SUN_API_KEY}&location=${city},${country}`;
  const sunWait = await fetch(SUN_API);
  const sunJson = await sunWait.json();
  sunrise = sunJson.sunrise.replace(":", "."); // Replacing : with . to match design specs
  sunset = sunJson.sunset.replace(":", "."); // Replacing : with . to match design specs

  // OpenWeatherApp Variables
  const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
  const API_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${WEATHER_API_KEY}`;

  // API Today"s Weather (OpenWeatherApp)
  fetch(API_WEATHER)
    .then((res) => res.json())
    .then((data) => {
      title.innerHTML = `${data.name} Weather`;
      const weatherDescription = data.weather[0].description;
      weatherDescriptionObj["desc"] = data.weather[0].main;

      // Top Section displaying weather, sunrise, and sunset
      topSection.innerHTML = `
        <p>${weatherDescriptionObj["desc"].toLowerCase()} | ${Math.round(
        data.main.temp
      )}°</p>
        <p>sunrise ${sunrise}</p>
        <p>sunset ${sunset}</p>
        `;
      // Conditionals for middle section that includes icon & weather quip
      // Conditional also adds class to body for weather styling
      if (data.weather[0].main.includes("Clear")) {
        body.className = "sunny";
        middleSection.innerHTML = `
          <img id="weatherIcon" class="weather-icon" src="Designs/Design-2/icons/noun_Sunglasses_2055147.svg" />
          <h1 id="weatherQuip" class="weather-quip">Get your sunnies on. ${data.name} is looking rather great today.</h1>
          `;
      } else if (data.weather[0].main.includes("Clouds")) {
        body.className = "cloudy";
        middleSection.innerHTML = `
          <img id="weatherIcon" class="weather-icon" src="Designs/Design-2/icons/noun_Cloud_1188486.svg" />
          <h1 id="weatherQuip" class="weather-quip">Light a fire and get cosy. ${data.name} is looking grey today.</h1>
          `;
      } else {
        // if the value includes "Rain", "Thunderstorm", "Drizzle", etc.
        body.className = "rainy";
        middleSection.innerHTML = `
          <img id="weatherIcon" class="weather-icon" src="Designs/Design-2/icons/noun_Umbrella_2030530.svg" />
          <h1 id="weatherQuip" class="weather-quip">Don't forget your umbrella. It's wet in ${data.name} today.</h1>
          `;
      }
    });

  // API 5-day Forecast (OpenWeatherApp)
  fetch(API_FORECAST)
    .then((res) => res.json())
    .then((data) => {
      const filteredForecast = data.list.filter((item) =>
        item.dt_txt.includes("12:00")
      ); // Array with the next five days" forecast

      filteredForecast.forEach((dayObj) => {
        const d = new Date(dayObj.dt * 1000)
          .toLocaleDateString("en", {
            weekday: "short",
          })
          .toLowerCase();

        const temp_ = Math.round(dayObj.main.temp); // We chose round for aesthetic reasons and to match the design specs
        bottomSection.innerHTML += `
            <div id="forecastContainer" class="forecast-container">
              <p class="weekday">${d}</p>
              <div class="forecast-container__right">
                <p class="weekdayTemp">${temp_}°</p>
              </div>
            </div>
            <hr class="horizontal-rule">
            `;
      });

      // Conditional to style the horizontal rule depending on the weather.
      if (weatherDescriptionObj["desc"] === "Clear") {
        document
          .querySelectorAll(".horizontal-rule")
          .forEach((item) => (item.className = "horizontal-rule hr--sunny"));
      } else if (weatherDescriptionObj["desc"] === "Clouds") {
        document
          .querySelectorAll(".horizontal-rule")
          .forEach((item) => (item.className = "horizontal-rule hr--cloudy"));
      } else {
        document
          .querySelectorAll(".horizontal-rule")
          .forEach((item) => (item.className = "horizontal-rule hr--rainy"));
      }
    });
};

// Calls the weatherApp here on load:
weatherApp();
