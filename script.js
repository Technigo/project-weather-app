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

////////////////////////////-----Functions----///////////////////////////////

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

// fetches the forecast (5 days) weather data from the API and converts it to json
const fetchForecast = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => (weatherForecastBox.innerHTML = "<p>oops .. something went wrong</p>"));
};

// fetches the forecast day and temperature with specfied filters
const fetchForecastData = () => {
  fetchForecast(forecastURL).then((forecastData) => {
    const filteredForecastData = filterOutTodaysData(forecastData);
    forecastWeather = filteredForecastData.map((item) => {
      const date = item.dt_txt;
      const day = getWeekdayName(date);
      const temp = Math.round(item.main.temp);
      console.log(forecastData);
      console.log(day, temp);
      return { day, temp };
    });
    showForecastWeather(forecastWeather);
  });
};

//----------functions that change the presentation or filters the data----------//

// converts the dates to the name of the weekday in abbreviation
const getWeekdayName = (dates) => {
  const day = new Date(dates);
  return day.toLocaleDateString("en-US", { weekday: "short" });
};

// gets todays date
const getToday = () => {
  const today = new Date();
  return today;
};

// compares two dates
const compareDates = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// filters out objects at a specific time
const getTime12 = (dt_txt) => dt_txt.includes("12:00:00");

// filter out todays date to not be shown
const filterOutTodaysData = (forecastData) => {
  const today = getToday();
  return forecastData.list.filter((infoForTheDay) => {
    const forecastDate = new Date(infoForTheDay.dt_txt);
    return !compareDates(today, forecastDate) && getTime12(infoForTheDay.dt_txt);
  });
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

const showForecastWeather = (forecastWeather) => {
  forecastWeather.forEach((forecast) => {
    weatherForecastBox.innerHTML += `${forecast.day} ${forecast.temp}&deg`;
  });
};

//---------------------------function calls----------------------------//

fetchTodaysWeather();
fetchSunriseSunset();
fetchForecastData();
