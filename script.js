//////////////////////////-----DOM Selectors----/////////////////////////////

const todaysWeatherBox = document.getElementById("todaysWeather");
const sunsetSunriseBox = document.getElementById("sunsetSunrise");
const messageBox = document.getElementById("weatherMessageBox");
const weatherForecastBox = document.getElementById("weatherForecastBox");

/////////////////////////-----Global variables----////////////////////////////

const todaysWeatherBaseURL = "https://api.openweathermap.org/data/2.5/weather";
const forecastBaseURL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "dae068dbdd598bca3f03f4b209decb99";
const city = "Stockholm";
const units = "metric";

const todayURL = `${todaysWeatherBaseURL}?q=${city}&units=${units}&APPID=${API_KEY}`;
const forecastURL = `${forecastBaseURL}?q=${city}&units=${units}&APPID=${API_KEY}`;

/////////////////////////-----Functions----////////////////////////////

//--------------functions that fetches the data needed---------------//

// fetches todays weather data from the API and converts it to json
const fetchWeatherData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => (messageBox.innerHTML = "<p>oops .. something went wrong</p>"));
};

// fetches todays weathercondition and temperature
const fetchTodaysWeather = () => {
  fetchWeatherData(todayURL).then((weatherData) => {
    const weatherCondition = weatherData.weather[0].description;
    const todaysTemperature = weatherData.main.temp.toFixed(1);
    showsTodaysWeather(weatherCondition, todaysTemperature);
    console.log(weatherData);
  });
};

// fetches sunrise and sunset time
const fetchSunriseSunset = () => {
  fetchWeatherData(todayURL).then((weatherData) => {
    const sunriseData = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const sunsetData = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    showSunsetSunrise(sunriseData, sunsetData);
  });
};

// fetches the forecast (4-5 days) weather data from the API and converts it to json
const fetchForecast = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => (weatherForecastBox.innerHTML = "<p>oops .. something went wrong</p>"));
};

// fetches the forecast day and temperature at 12:00
const fetchForecastData = () => {
  fetchForecast(forecastURL).then((forecastData) => {
    const filteredForecastData = forecastData.list.filter((infoForTheDay) => infoForTheDay.dt_txt.includes("12:00:00"));
    forecastWeather = filteredForecastData.map((item) => {
      const date = item.dt_txt;
      const day = getWeekdayName(date);
      const temp = item.main.temp;
      return { day, temp };
    });
    showForecastWeather(forecastWeather);
  });
};

//----------functions that change the presentation of the data----------//

// converts the dates to the name of the weekday in abbreviation
const getWeekdayName = (dates) => {
  const day = new Date(dates);
  return day.toLocaleDateString("en-US", { weekday: "short" });
};

//--------------functions that presents the fetched data---------------//

// presents todays weather description and temperature
const showsTodaysWeather = (weatherCondition, todaysTemperature) => {
  todaysWeatherBox.innerHTML += `${weatherCondition} | ${todaysTemperature}&deg`;
};

// presents the sunrise and sunset time
const showSunsetSunrise = (sunriseData, sunsetData) => {
  sunsetSunriseBox.innerHTML = `
    <p>sunrise ${sunriseData}</p> 
    <p>sunset ${sunsetData}</p>`;
};

//---------------------------function calls----------------------------//

fetchTodaysWeather();
fetchSunriseSunset();
fetchForecastData();

// // const showForecastWeather = (forecastData) => {
// //   console.log(forecastData);
// //   const getDates = forecastData
// //     .filter((item) => item.dt_txt.endsWidth("12:00:00"))
// //     .map((item) => {
// //       const date = new Date(item.dt * 1000).toISOString().split("T")[0];
// //       const temperature = item.main.temp;
// //       console.log(getDates);
//     });
// };
