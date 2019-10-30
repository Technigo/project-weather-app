"use strict";

const api_key = "3927ba6963ab68cfceebff54c1ee693f";
const container = document.getElementById("weather");
const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

fetch(
  `http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${api_key}`
)
  .then(response => {
    return response.json();
  })
  .then(json => {
    console.log(json);

    let sunriseHour = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    let sunsetHour = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    console.log(`Sunrise: ${sunriseHour}, Sunset: ${sunsetHour}`);

    container.innerHTML = `<h2>Todays weather in Stockholm  ${json.main.temp} degrees with a daily min of ${json.main.temp_min} and daily max of
   ${json.main.temp_max} ,  ${sunriseHour} ${sunsetHour}</h2>`;
  });

const handle5DayForecast = json => {
  const forecastDiv = document.getElementById("forecast");
  const dates = {};

  json.list.forEach(weather => {
    const date = weather.dt_txt.split(" ")[0];
    if (dates[date]) {
      dates[date].push(weather);
    } else {
      dates[date] = [weather];
    }
  });

  Object.entries(dates).forEach((item, index) => {
    if (index === 0) {
      return;
    }

    const date = days[new Date(item[0]).getDay()];
    const weatherValues = item[1];

    const temps = weatherValues.map(value => value.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    forecastDiv.innerHTML += `<li>${date} - min: ${minTemp.toFixed(
      1
    )}, max: ${maxTemp.toFixed(1)}</li>`;
  });
};

fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&appid=${api_key}&units=metric`
)
  .then(res => res.json())
  .then(handle5DayForecast);
