// DOM elements
const weatherToday = document.getElementById("weather-today");
const weatherDescription = document.getElementById("weather-description");
const fourdayForecast = document.getElementById("fourday-forecast");
const citySelector = document.getElementById("city");

//get weather data based on cities
const getWeather = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=bac28b010cea73460ead078a7d8aa965`
  )
    .then((response) => response.json())
    .then((data) => {
      const sunriseTime = convertTo24Hour(data.sys.sunrise, data.timezone); //Unix timestamp (in seconds)
      const sunsetTime = convertTo24Hour(data.sys.sunset, data.timezone); //Unix timestamp (in seconds)

      weatherToday.innerHTML = `<p>${
        data.weather[0].description
      } | ${data.main.temp.toFixed(
        1
      )}°C</p><p>sunrise ${sunriseTime}</p><p>sunset ${sunsetTime}</p>`;

      //style based on temperature
      if (data.main.temp <= 10) {
        document.getElementsByTagName("body")[0].classList = ["cold"];
      } else {
        document.getElementsByTagName("body")[0].classList = ["warm"];
      }

      //conditional based on weather main category
      let weatherIcon = "default.png";
      const weatherCondition = data.weather[0].main;

      if (weatherCondition === "Clouds") {
        weatherIcon = "clouds.png";
      } else if (weatherCondition === "Clear") {
        weatherIcon = "sun.png";
      } else if (weatherCondition === "Snow") {
        weatherIcon = "snow.png";
      } else if (
        weatherCondition === "Rain" ||
        weatherCondition === "Drizzle"
      ) {
        weatherIcon = "rain.png";
      } else if (weatherCondition === "Thunderstorm") {
        weatherIcon = "thunder.png";
      } else {
        weatherIcon = "default.png";
      }

      weatherDescription.innerHTML = `<img src="icons/${weatherIcon}"><h1>${data.name}</h1>`;
    });
};

//get forecast data based on selected city
const getForecast = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=bac28b010cea73460ead078a7d8aa965`
  )
    .then((response) => response.json())
    .then((data) => {
      const dailyForecasts = {};

      data.list.forEach((forecast) => {
        const date = new Date(forecast.dt_txt);
        //filtering for 12:00 forecast
        if (date.getHours() === 12) {
          const dayName = getDayName(date);
          //If the day name doesn't already exist in the dailyForecasts object and the number of keys (representing the number of days) is less than 4, it stores the temperature for that day in the dailyForecasts object. This ensures that only forecasts for the next four days are stored.
          if (
            !dailyForecasts[dayName] &&
            Object.keys(dailyForecasts).length < 4
          ) {
            dailyForecasts[dayName] = {
              temp: forecast.main.temp,
            };
          }
        }
      });

      //iterates over dailyForecast and generates HTML to display forecast
      for (const dayName in dailyForecasts) {
        fourdayForecast.innerHTML += `<div class="forecast-element"><div><p>${dayName}</p></div><div><p>${dailyForecasts[
          dayName
        ].temp.toFixed(1)}°C</p></div>`;
      }
    });
};

// Event listener for city selector change
citySelector.addEventListener("change", () => {
  const selectedCity = citySelector.value;

  // Clear previous data
  weatherToday.innerHTML = "";
  weatherDescription.innerHTML = "";
  fourdayForecast.innerHTML = "";

  // Fetch weather and forecast data for the selected city
  getWeather(selectedCity);
  getForecast(selectedCity);
});

// Function to convert time to 24-hour format
// added timezone to make sunsets/sunrise work
const convertTo24Hour = (time, timezone) => {
  //creates new Date object using the time parameter multiplied by 1000. Date expects the input to be in milliseconds, while Unix timestamps are in seconds.
  const date = new Date((time + timezone) * 1000);
  //extracting hours and minutes and converting to strings using UTCHHours tow make timezones work
  //padStart adds leading zeros to ensure that hours/minutes always have two digits

  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

//function to get abbreviated day name
const getDayName = (date) => {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[date.getDay()];
};

//initial fetch for Zurich (default)
getWeather("Zurich");
getForecast("Zurich");
