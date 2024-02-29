//DOM elements
const weatherToday = document.getElementById("weather-today");
const weatherDescription = document.getElementById("weather-description");
const fourdayForecast = document.getElementById("fourday-forecast");

//function to convert time to 24-hour format
const convertTo24Hour = (time) => {
  const date = new Date(time * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// fetch basic weather data for defined cities
const weatherZurich = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Zurich,Switzerland&units=metric&APPID=bac28b010cea73460ead078a7d8aa965"
  )
    .then((response) => response.json())
    .then((data) => {
      // Convert sunrise and sunset times to 24-hour format
      const sunriseTime = convertTo24Hour(data.sys.sunrise);
      const sunsetTime = convertTo24Hour(data.sys.sunset);

      // Set the city name, description, temperature, sunrise, and sunset in HTML
      weatherToday.innerHTML = `<p>${
        data.weather[0].description
      } | ${data.main.temp.toFixed(
        1
      )}°C</p><p>sunrise ${sunriseTime}</p><p>sunset ${sunsetTime}</p>`;

      weatherDescription.innerHTML = `<img src="icons/Cloud.svg"><h1>${data.name}</h1>`;
    });
};
weatherZurich();

//fetch 4-day forecast weather for Zurich
const forecastZurich = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=Zurich,Switzerland&units=metric&APPID=bac28b010cea73460ead078a7d8aa965"
  )
    .then((response) => response.json())
    .then((data) => {
      const dailyForecasts = {};

      data.list.forEach((forecast) => {
        const date = new Date(forecast.dt_txt);

        //check if the forecast is for 12:00
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

      //HTML for temperature at 12:00 for each day
      for (const dayName in dailyForecasts) {
        fourdayForecast.innerHTML += `<div class="forecast-element"><div><p>${dayName}</p></div><div><p>${dailyForecasts[
          dayName
        ].temp.toFixed(1)}°C</p></div>`;
      }
    });
};

//Function to get abbreviated day name
function getDayName(date) {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[date.getDay()];
}

//Call the function to get forecast data
forecastZurich();

//get weather data for a specific city
