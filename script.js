//////////////////////////-----DOM Selectors----/////////////////////////////

const todaysWeatherBox = document.getElementById("todaysWeather");
const sunsetSunriseBox = document.getElementById("sunsetSunrise");
const weatherImageBox = document.getElementById("weatherImageBox");
const weatherMessageBox = document.getElementById("weatherMessageBox");
const weatherForecastBox = document.getElementById("weatherForecastBox");
const weatherDesign = document.getElementById("weatherDesign");

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
    weatherMessage(weatherData);
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

//----------functions that filters or change the format of the data----------//

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
  todaysWeatherBox.innerHTML += `<p>${weatherCondition} | ${todaysTemperature}&deg</p>`;
};

// calls a function to run the appropiate weather design
const weatherMessage = (weatherData) => {
  const weatherType = weatherData.weather[0].main;

  if (weatherType === "Clear") {
    setClearDesign();
  } else if (weatherType === "Clouds") {
    setCloudyDesign();
  } else if (weatherType === "Rain" || weatherType === "Drizzle") {
    setRainyDesign();
  } else if (weatherType === "Snow") {
    setSnowyDesign();
  } else if (weatherType === "Thunderstorm") {
    setThunderDesign();
  } else {
    setFogDesign();
  }
};

// calls this design and message when clear weather
const setClearDesign = () => {
  weatherDesign.className = "clear";
  weatherImageBox.innerHTML = `<img class="weather-icon" src="assets/sun.png" alt="cloud weather icon" /> `;
  weatherMessageBox.innerHTML = `<h2>${city} <br> is shining today.</h2>`;
};

// calls this design and message when cloudy weather
const setCloudyDesign = () => {
  weatherDesign.className = "clouds";
  weatherImageBox.innerHTML = `<img class="weather-icon" src="assets/cloud.png" alt="cloud weather icon" /> `;
  weatherMessageBox.innerHTML = `<h2>${city} <br> is looking grey.</h2>`;
};

// calls this design and message when rainy weather
const setRainyDesign = () => {
  weatherDesign.className = "rain";
  weatherImageBox.innerHTML = `<img class="weather-icon" src="assets/rain.png" alt="cloud weather icon" /> `;
  weatherMessageBox.innerHTML = `<h2>${city} <br> is wet today.</h2>`;
};

//calls this design and message when snowy weather
const setSnowyDesign = () => {
  weatherDesign.className = "snow";
  weatherImageBox.innerHTML = `<img class="weather-icon" src="assets/snow.png" alt="cloud weather icon" /> `;
  weatherMessageBox.innerHTML = `<h2>${city} <br> is turning into a winter wonderland.</h2>`;
};

// calls this design an message when thunderstorm
const setThunderDesign = () => {
  weatherDesign.className = "thunder";
  weatherImageBox.innerHTML = `<img class="weather-icon" src="assets/thunder.png" alt="cloud weather icon" /> `;
  weatherMessageBox.innerHTML = `<h2>${city}<br> is electric.</h2>`;
};

// calls this design and message when the weather is none of above
const setFogDesign = () => {
  weatherDesign.className = "clouds";
  weatherImageBox.innerHTML = `<img class="weather-icon" src="assets/fog.png" alt="cloud weather icon" /> `;
  weatherMessageBox.innerHTML = `<h2>${city} <br> has limited vision, stay safe!</h2>`;
};

// presents the sunrise and sunset time
const showSunsetSunrise = (sunriseData, sunsetData) => {
  sunsetSunriseBox.innerHTML = `
    <p>sunrise ${sunriseData}</p> 
    <p>sunset ${sunsetData}</p>`;
};

const showForecastWeather = (forecastWeather) => {
  forecastWeather.forEach((forecast) => {
    const forecastElement = document.createElement("div");
    forecastElement.classList.add("forecast-weather");
    forecastElement.innerHTML = `<p>${forecast.day}</p> <p> ${forecast.temp}&deg</p>`;
    weatherForecastBox.appendChild(forecastElement);
  });
};

//---------------------------function calls----------------------------//

fetchTodaysWeather();
fetchSunriseSunset();
fetchForecastData();
