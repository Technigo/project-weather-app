const weatherContainer = document.getElementById("virestadWeather");
const weatherForecast = document.getElementById("forecast");
const forecastElement = document.getElementById("forecast");
const sunriseSunset = document.getElementById("sunriseSunset");
const dailyWeather = document.getElementById("dailyWeather");

// Where to find the weather data
const appID = "d1af2f27692b758fb8f71728de60753b";
const units = "metric";
const baseURL = "https://api.openweathermap.org/data/2.5/";
const searchString = (searchTerm, searchCity) => {
  return `${baseURL}${searchTerm}?q=${searchCity}&units=${units}&APPID=${appID}`;
};

fetch(searchString("weather", "Virestad, Sweden"))
  .then((response) => response.json())
  .then((json) => {
    let weatherIcon = json.weather[0].icon;
    let temperature = json.main.temp;
    let cityName = json.name;
    let weatherCondition = json.weather[0].description;
    let sunriseTimestamp = json.sys.sunrise * 1000;
    let sunsetTimestamp = json.sys.sunrise * 1000; // Convert Unix timestamp to milliseconds
    let feelsLike = json.main.feels_like;

    const sunrise = new Date(sunriseTimestamp);
    const sunset = new Date(sunsetTimestamp);

    // Determine if it's currently day or night
    const currentTime = new Date();
    const isDaytime = currentTime <= sunrise || currentTime >= sunset;

    // Change background based on day or night
    if (isDaytime) {
      document.getElementById("background-container").style.backgroundImage =
        "url('pictures/day.jpg')"; // Daytime background
    } else {
      document.getElementById("background-container").style.backgroundImage =
        "url('pictures/night.jpg')"; // Nighttime background
    }

    console.log(`city` + cityName);
    console.log(weatherIcon);
    console.log(weatherCondition);
    console.log(`temp` + temperature);
    console.log(`feels like` + feelsLike);
    console.log(currentTime);

    weatherContainer.innerHTML = `
      <h1>${temperature} °C</h1>
      <p class="city">${cityName}</p>
      <p>${weatherCondition}</p>
      <p>Feels like: ${feelsLike} °C</p>
    `;

    sunriseSunset.innerHTML = `
      <p>Sunrise ${sunrise.toLocaleTimeString([], {
        timeStyle: "short",
      })}</p>
      <p>Sunset ${sunset.toLocaleTimeString([], { timeStyle: "short" })}</p>
    `;
  });

// Loop through dailyWeather and create forecast elements
dailyWeather.forEach((item) => {
  let dayOfWeek = new Date(item.dt * 1000).toLocaleDateString("en-US", {
    weekday: "long",
  });
  let dailyTemperature = item.temp.day;
  let dailyFeelsLike = item.feels_like.day;
  let dailyWeatherConditions = item.weather[0].description;
  let dailyWeatherIcon = item.weather[0].icon;

  // Create and append forecast element
  createForecastElement(
    dayOfWeek,
    dailyTemperature,
    dailyFeelsLike,
    dailyWeatherConditions,
    dailyWeatherIcon
  );
});

// Function to create and append weather icon
function createIcon(weatherIcon, parentElement) {
  let base_URL = `https://openweathermap.org/img/wn/`;
  let iconURL = base_URL + weatherIcon + ".png"; // Use ".png" instead of "@2x.png"

  const iconElement = document.createElement("img");
  iconElement.src = iconURL;
  iconElement.alt = "Weather Icon";

  // Append iconElement to specified parentElement
  parentElement.appendChild(iconElement);
}

// Function to create and append forecast element
function createForecastElement(
  dayOfWeek,
  dailyTemperature,
  dailyFeelsLike,
  dailyWeatherConditions,
  dailyWeatherIcon
) {
  const forecastElement = document.createElement("div");
  forecastElement.className = "forecast";
  forecastElement.innerHTML = `
    <p>${dayOfWeek}</p>
    <p>${dailyWeatherConditions}</p>
    <p>${dailyTemperature}°C</p>
    <p>Feels like: ${dailyFeelsLike}°C</p>
  `;

  // Append weather icon to forecast element
  createIcon(dailyWeatherIcon, forecastElement);

  // Append forecastElement to forecastContainer
  forecastContainer.appendChild(forecastElement);
}

// Getting the weather forecast for the next five days
// let today = new Date().toDateString();
// console.log(today);
// let iteration = 1;
// console.log(iteration);

// // Select the container for forecast elements
// const forecastContainer = document.getElementById("forecastContainer");

// // Inside the fetch for weather forecast
// if (Array.isArray(dailyWeather)) {
//   dailyWeather.forEach((item) => {
//     let day = new Date(item.dt_txt);
//     let dayOfWeek = day.toLocaleDateString("en-US", { weekday: "long" });
//     let dailyTemperature = item.main.temp;
//     let dailyFeelsLike = item.main.feels_like;
//     let dailyWeatherConditions = item.weather[0].description;
//     let dailyWeatherIcon = item.weather[0].icon;

//     if (day.toDateString() !== new Date().toDateString()) {
//       // Create and append forecast element
//       createForecastElement(
//         dayOfWeek,
//         dailyTemperature,
//         dailyFeelsLike,
//         dailyWeatherIcon,
//         dailyWeatherConditions
//       );
//     }
//   });
// }

// function createForecastElement(
//   dayOfWeek,
//   dailyTemperature,
//   dailyFeelsLike,
//   dailyWeatherIcon,
//   dailyWeatherConditions
// ) {
//   const forecastElement = document.createElement("div");
//   forecastElement.className = "forecast";
//   forecastElement.innerHTML = `
//     <p>${dayOfWeek}</p>
//     <p>${dailyWeatherIcon}</p>
//     <p>${dailyWeatherConditions}</p>
//     <p>${dailyTemperature}°C</p>
//     <p>Feels like: ${dailyFeelsLike}°C</p>
//   `;

//   //Append weather icon to forecast element
//   createIcon(dailyWeatherIcon, forecastElement);

//   // Append forecastElement to forecastContainer
//   forecastContainer.appendChild(forecastElement);
// }

// const forecast = (
//   iter,
//   day,
//   dailyTemperature,
//   dailyFeelsLike,
//   dailyWeatherConditions
// ) => {
//   const forecastInfo = document.getElementById(`forecast${iter}`);

//   const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//   let today = weekDays[date.getDay()];
//   console.log(`today it is `, today);
// };
// //Creating the icon
// // Example of using createIcon function to set src attribute of an img element
// function createIcon(weatherIcon) {
//   let base_URL = `https://openweathermap.org/img/wn/`;
//   let iconURL = base_URL + weatherIcon + "@2x.png";

//   const iconElement = document.createElement("img");
//   iconElement.src = iconURL;
//   iconElement.alt = "Weather Icon";

//   // Append iconElement wherever needed in the DOM
//   // For example:
//   // weatherContainer.appendChild(iconElement);
// }
