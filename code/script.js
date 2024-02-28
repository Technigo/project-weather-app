//DOM elements
const weatherToday = document.getElementById("weather-today");
const weatherDescription = document.getElementById("weather-description");
const fourdayForecast = document.getElementById("fourday-forecast");

//function to convert time to 24-hour format
const convertTo24Hour = (time) => {
  //convert timestamp to Date object
  const date = new Date(time * 1000);
  //get hours and pad with leading zero if necessary
  const hours = date.getHours().toString().padStart(2, "0");
  //get minutes and pad with leading zero if necessary
  const minutes = date.getMinutes().toString().padStart(2, "0");
  //return time in 24-hour format
  return `${hours}:${minutes}`;
};

// fetch basic weather data for Zurich
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
      weatherToday.innerHTML = `<h1>${data.name}</h1><p>${data.weather[0].description} | ${data.main.temp}°C</p><p>Sunrise ${sunriseTime}</p><p>Sunset ${sunsetTime}</p>`;
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
      //variable to store daily forecast
      const dailyForecasts = {};
      //Loop through the forecast data to extract min and max temperatures for each day
      data.list.forEach((forecast) => {
        //Convert dt_txt string to Date object
        const date = new Date(forecast.dt_txt);
        //Get the shortened day name
        const dayName = getDayName(date);
        //If the day is not already added to dailyForecasts and we have less than four days
        if (
          !dailyForecasts[dayName] &&
          Object.keys(dailyForecasts).length < 4
        ) {
          dailyForecasts[dayName] = {
            minTemp: forecast.main.temp_min,
            maxTemp: forecast.main.temp_max,
          };
        }
      });

      //HTML for each day with min and max temperatures
      let forecastHTML = "";
      for (const dayName in dailyForecasts) {
        forecastHTML += `<p>${dayName} | Min: ${dailyForecasts[
          dayName
        ].minTemp.toFixed(1)}°C | Max: ${dailyForecasts[
          dayName
        ].maxTemp.toFixed(1)}°C</p>`;
      }

      //Update fourdayForecast innerHTML with the constructed HTML
      fourdayForecast.innerHTML = forecastHTML;
    });
};

//Function to get abbreviated day name
function getDayName(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

//Call the function to get forecast data
forecastZurich();
