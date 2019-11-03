"use strict";

const api_key = "3927ba6963ab68cfceebff54c1ee693f";
const container = document.getElementById("today");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const weathers = {
  Cloudy: "noun_weather.png",
  Sunny: "noun_sunny.png",
  Drizzle: "noun_Drizzle.png"
  
};

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${api_key}`
)
  .then(response => {
    return response.json();
  })
  .then(json => {
    console.log(json);

    const sunriseHour = new Date(json.sys.sunrise * 1000).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit" 
      }
    );
    const sunsetHour = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    console.log(`Sunrise: ${sunriseHour}, Sunset: ${sunsetHour}`);

    container.innerHTML = `<h1>Today's weather in: </h1> <h1 id="location">${json.name} 
    </h1>  <h2>${json.main.temp}&#8451;</h2> <img src="noun_Drizzle.png"${weathers[json.weather[0].main]}/>
      
     <h3 id="todaysMinMax">${json.main.temp_min}&#8451; /
   ${json.main.temp_max} &#8451;</h3>	<h2> sunrise ${sunriseHour} </h2> <h2>sunset ${sunsetHour} </h2>`;
  });
  
const handle5DayForecast = json => {
  const forecastDiv = document.getElementById("forecastdates");
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

    forecastDiv.innerHTML += `<h3><li>${date} - min: ${minTemp.toFixed(
      1 
    )}&#8451, max: 	${maxTemp.toFixed(1)}	&#8451;</li></h3>`;
  });
};

fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&appid=${api_key}&units=metric`
)
  .then(res => res.json())
  .then(handle5DayForecast);
