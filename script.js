const container = document.getElementById(`weather`);
const hamburgerMenu = document.getElementById("hamburger-menu");
const navMenu = document.getElementById("nav-menu");
const weatherIcon = document.getElementById("weather-icon");
const forecastContainer = document.getElementById("forecast-container");

const apiKey = "b0bce0ead37d18acc13acd506864e75a";
const city = "Stockholm,Sweden";
const units = "metric";

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b0bce0ead37d18acc13ad506864e75ac"
)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    console.log(json);
    const roundedTemperature = parseFloat(json.main.temp).toFixed(1);
    //const temperature = Math.round(json.main.temp);
    container.innerHTML += `
    <h1>${roundedTemperature} °C</h1>
    <h2>${json.name}</h2>
    <p>${json.weather[0].description}</p>
    <p>${json.weather[0].icon}<p/>
   
    `;

    // Fetch the weather icon mappings from JSON file
    fetch("weatherIcons.json")
      .then((response) => response.json())
      .then((iconMappings) => {
        const currentWeatherDescription = json.weather[0].description;
        const iconFileName =
          iconMappings[currentWeatherDescription] || iconMappings["Default"];
        const iconURL = `images/${iconFileName}`;
        weatherIcon.src = iconURL;
        weatherIcon.alt = currentWeatherDescription;
      })
      .catch((error) => {
        console.error("Error fetching weatherIcons.json:", error);
      });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const fiveDayForecast = () => {
  console.log(`fetch five day forecast`);
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=b0bce0ead37d18acc13ad506864e75ac"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      const forecastList = json.list;

      // Filter the forecast data to include only the next 5 days
      const next5DaysForecast = forecastList.filter((forecast) => {
        const forecastDate = new Date(forecast.dt * 1000); // Convert to milliseconds
        const currentDate = new Date();
        return (
          forecastDate.getDate() !== currentDate.getDate() &&
          forecastDate >= currentDate
        );
      });

      // Create and append HTML elements to display the forecast for each day
      next5DaysForecast.forEach((forecast, index) => {
        const forecastDate = new Date(forecast.dt * 1000);
        const dayOfWeek = days[forecastDate.getDay()];
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;

        const forecastElement = document.createElement("div");
        forecastElement.innerHTML = `
          <p>Day ${index + 1}: ${dayOfWeek}</p>
          <p>Temperature: ${temperature}°C</p>
          <p>Description: ${description}</p>
        `;

        forecastContainer.appendChild(forecastElement);
      });
    });
};

fiveDayForecast();

/*
const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const fiveDayForecast = () => {
  console.log(`fetch five day forecast`);
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=b0bce0ead37d18acc13ad506864e75ac"
  )
    .then((response) => {
      return response.json();
    })

    .then((json) => {
      console.log(json);
      const forecastList = json.list;

      // Filter the forecast data to include only the next 5 days
      const next5DaysForecast = forecastList.filter((forecast) => {
        const forecastDate = new Date(forecast.dt * 1000); // Convert to milliseconds
        const currentDate = new Date();
        return (
          forecastDate.getDate() !== currentDate.getDate() &&
          forecastDate >= currentDate
        );
      });
      // Display the forecast for each day
      next5DaysForecast.forEach((forecast, index) => {
        const forecastDate = new Date(forecast.dt * 1000);
        const dayOfWeek = days[forecastDate.getDay()];
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;

        console.log(
          `Day ${
            index + 1
          }: ${dayOfWeek} - Temperature: ${temperature}°C, Description: ${description}`
        );
      });
    });
};
fiveDayForecast();
*/

hamburgerMenu.addEventListener("click", function () {
  console.log(`hamburger menu`);
  if (navMenu.style.display === "block") {
    navMenu.style.display = "none";
  } else {
    navMenu.style.display = "block";
  }
});
