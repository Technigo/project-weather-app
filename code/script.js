// DOM elements
const weatherToday = document.getElementById("weather-today");
const weatherDescription = document.getElementById("weather-description");
const fourdayForecast = document.getElementById("fourday-forecast");
const citySelector = document.getElementById("city");

//get weather data based on selected city
const getWeather = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=bac28b010cea73460ead078a7d8aa965`
  )
    .then((response) => response.json())
    .then((data) => {
      const sunriseTime = convertTo24Hour(data.sys.sunrise);
      const sunsetTime = convertTo24Hour(data.sys.sunset);

      weatherToday.innerHTML = `<p>${
        data.weather[0].description
      } | ${data.main.temp.toFixed(
        1
      )}°C</p><p>sunrise ${sunriseTime}</p><p>sunset ${sunsetTime}</p>`;
      weatherDescription.innerHTML = `<img src="icons/Cloud.svg"><h1>${data.name}</h1>`;
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

        if (date.getHours() === 12) {
          const dayName = getDayName(date);

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
const convertTo24Hour = (time) => {
  const date = new Date(time * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Function to get abbreviated day name
const getDayName = (date) => {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[date.getDay()];
};

// Initial fetch for Zurich (or any default city)
getWeather("Zurich");
getForecast("Zurich");
