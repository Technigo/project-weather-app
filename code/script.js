//DOM selectors ------------------
const background = document.getElementById("background");
const currentWeather = document.getElementById("currentWeather");
const currentTemp = document.getElementById("currentTemp");
const city = document.getElementById("city");
const localTimeDisplay = document.getElementById("localTimeDisplay");
const weather = document.getElementById("weather");
const weatherIcon = document.getElementById("weatherIcon");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherForecast = document.getElementById("weatherForecast");

const toggleOpen = document.getElementById("toggleOpen");
const toggleClose = document.getElementById("toggleClose");
const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("inputField");
const searchBtn = document.getElementById("searchBtn");

// Variables for API-fethcing ------------------
const urlCurrentWeather =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const API_KEY = "5660c7e2a75e2c204e4b057312e71c93"; // (Query param)
let cityName = "Stockholm"; // City on startpage (Path param)

const urlForecast =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

// Get the user's local timezone
//let userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Current weather data ------------------
const fetchCurrentWeather = (cityName) => {
  fetch(`${urlCurrentWeather}${cityName}&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      // Temperature
      const temp = json.main.temp;
      // toFixed(1); will round to one decimal place but we decided to not show the temperature with decimals.
      const roundedTemp = temp.toFixed(0);
      // City
      cityName = json.name;
      // Weather description
      const weatherDescription = json.weather[0].description;
      // Weather Icon
      let { icon } = json.weather[0];

      // Inside the HTML for current weather
      currentTemp.innerHTML = `${roundedTemp}`;
      city.innerHTML = `${cityName}`;
      weather.innerHTML = `${weatherDescription}`;
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;

      console.log(`${roundedTemp}°C`);
      console.log(json.name);
      console.log(weatherDescription);

      // LOCAL TIME with hour/minute and timezone ------------
      const localTimeData = new Date((json.dt + json.timezone) * 1000);
      const formattedLocalTime = localTimeData.toLocaleTimeString(["en-GB"], {
        timeStyle: "short",
        timeZone: "UTC",
      });

      // Inside the HTML
      localTimeDisplay.innerHTML = `Time: ${formattedLocalTime}`;
      console.log(`Time is ${formattedLocalTime}`);

      // ------------ SUNRISE AND SUNSET ------------
      // The date object is handling dates and times
      const sunriseData = new Date((json.sys.sunrise + json.timezone) * 1000);
      sunriseData.setMinutes(
        sunriseData.getMinutes() + sunriseData.getTimezoneOffset()
      );
      // This transform the time to hour and minute.
      const sunriseTime = sunriseData.toLocaleTimeString(["en-GB"], {
        timeStyle: "short",
      });

      const sunsetData = new Date((json.sys.sunset + json.timezone) * 1000);
      sunsetData.setMinutes(
        sunsetData.getMinutes() + sunsetData.getTimezoneOffset()
      );
      const sunsetTime = sunsetData.toLocaleTimeString(["en-GB"], {
        timeStyle: "short",
      });

      // Sunrise and sunset innerHTML
      sunrise.innerHTML += `${sunriseTime}`;
      sunset.innerHTML = `${sunsetTime}`;

      console.log(`Sunrise ${sunriseTime}`);
      console.log(`Sunset ${sunsetTime}`);

      // ------------
      const todaysWeather = json.weather[0].main;
      console.log(todaysWeather);

      // ------------ Image backgrounds feature ------------
      // Array for weather category "atmosphere".
      const atmosphere = [
        "Mist",
        "Smoke",
        "Haze",
        "Dust",
        "Fog",
        "Sand",
        "Dust",
        "Ash",
        "Squall",
        "Tornado",
      ];

      // Current local time in right timezone
      const getTime = new Date();
      getTime.setMinutes(getTime.getMinutes() + getTime.getTimezoneOffset());
      getTime.setSeconds(getTime.getSeconds() + json.timezone);
      console.log(`Local time and timezone ${getTime}`);

      // Checks what hour it is
      const currentHour = getTime.getHours();
      console.log(`Current hour is ${currentHour}`);

      // Checks if the current hour is between 06:00 and 22:00, which is considered daytime, or else night time
      if (currentHour >= 6 && currentHour <= 22) {
        // Daytime background images depending on weather.
        if (todaysWeather === "Thunderstorm") {
          background.style.backgroundImage = `url('./images/thunder.jpg')`;
        } else if (todaysWeather === "Drizzle" || todaysWeather === "Rain") {
          background.style.backgroundImage = `url('./images/rainy.jpg')`;
        } else if (todaysWeather === "Snow") {
          background.style.backgroundImage = `url('./images/snow.jpg')`;
        } else if (todaysWeather === "Clear") {
          background.style.backgroundImage = `url('./images/sunnyday.jpg')`;
        } else if (todaysWeather === "Clouds") {
          background.style.backgroundImage = `url('./images/cloudy.jpg')`;
        } else if (atmosphere.includes(todaysWeather)) {
          background.style.backgroundImage = `url('./images/mist.jpg')`;
        } else {
          background.style.backgroundImage = `url('./images/else.jpg')`;
        }
      } else {
        // Nighttime background images depending on weather.
        if (todaysWeather === "Clear") {
          background.style.backgroundImage = `url('./images/night.jpg')`;
        } else {
          background.style.backgroundImage = `url('./images/night-cloudy.jpg')`;
        }
      }
    })
    .catch((error) => console.log("Error ❌", error));
};

fetchCurrentWeather();

// ------------------------------------------------------------------------
// FIVE DAYS WEATHER FORECAST

// API for weather forecast of the next 5 days.
const fiveDayForecast = (cityName) => {
  fetch(`${urlForecast}${cityName}&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      // If user didn't search for a city
      if (json.cod !== "404") {
        // Check if the time is 12:00 (noon)
        const filteredData = json.list.filter((dayWeather) =>
          dayWeather.dt_txt.includes("12:00")
        );

        filteredData.forEach((day) => {
          const date = new Date(day.dt * 1000);
          let dayName = date.toLocaleDateString("en-US", { weekday: "short" });
          // Make a Date object for right now
          const today = new Date();
          // Compare the forecast's day with the day right now
          const isTodaysForecast = date.getDay() === today.getDay();

          const { main, wind, weather } = day;
          const { temp } = main;
          const icon = weather[0].icon;
          // Access wind speed from the wind object
          const { speed: wind_speed } = wind;
          // Use toFixed(0) to round the temperature to a whole number
          const roundedTemp = temp.toFixed(0);

          if (!isTodaysForecast) {
            // Weather forecast content for each 5 day
            weatherForecast.innerHTML += `
            <div class="forecast-container">
              <div class="forecast-weekday">${dayName}</div>
              <div class="forecast-icon">
                <img class="w-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png">
              </div>
              <div class="forecast-temp">${roundedTemp}&#176;C</div>
              <div class="forecast-wind">${wind_speed} m/s</div>
            </div>
       `;
          }
        });
      } else {
        // Alerts that the city wasn't found and runs Stockholm.
        alert("City not found. Check your spelling and try again.");
        fetchCurrentWeather("Stockholm");
        fiveDayForecast("Stockholm");
      }
    })
    .catch((error) => console.log("Error ❌", error));
};
fiveDayForecast();

// Function that controlls the toggling between opening and closing the search field.
const toggleSearchField = () => {
  searchContainer.classList.toggle("hidden");
  toggleClose.classList.toggle("hidden");
  toggleOpen.classList.toggle("hidden");
};

// Function that stores user input
const searchCity = () => {
  let searchedCity = searchInput.value;

  // When user searching for a city's weather data
  fetchCurrentWeather(searchedCity);
  fiveDayForecast(searchedCity);

  // Clears search field
  searchInput.value = "";

  // Hides search field again
  toggleSearchField();

  // Reset sunrise/sunset time and 5 days weather forecast when searching again
  sunrise.innerHTML = "";
  sunset.innerHTML = "";
  weatherForecast.innerHTML = "";
};

// Startpage (when loading page)
fetchCurrentWeather("Stockholm");
fiveDayForecast("Stockholm");

// Eventlisteners --------------------
toggleOpen.addEventListener("click", toggleSearchField);
toggleClose.addEventListener("click", toggleSearchField);
searchBtn.addEventListener("click", searchCity);
// Get it to work with Enter key
searchInput.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    searchCity();
  }
});
