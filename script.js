const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=";
const API_KEY = "ea8ddf441b50c5601343ca1ba4aa982c";

const URL = `${BASE_URL}${API_KEY}`;

//DOM Selectors
const city = document.getElementById("currentCity");
const temp = document.getElementById("currentTemp");
const weather = document.getElementById("currentWeather");
const forecast = document.getElementById("fourDayForecast");

//fetch weather data
const fetchWeatherData = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      city.textContent = `
      ${data.name}
      `;
      const roundedTemp = Math.round(data.main.temp * 10) / 10;
      temp.textContent = `
      ${roundedTemp} °C
      `;
      weather.textContent = `
      ${data.weather[0].main}
      `;
    });
};

fetchWeatherData();

//fetch five day forecast
const fetchForecast = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ea8ddf441b50c5601343ca1ba4aa982c"
  )
    .then((response) => response.json())
    .then((data) => {
      const forecastList = data.list;
      console.log("forecast list:", forecastList);

      const todaysDate = new Date().toISOString().split("T")[0];
      console.log("todays date without time:", todaysDate);

      const dailyTemperatures = {};

      forecastList.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        console.log("date split to show YY-MM-DD:", date);
        if (date !== todaysDate) {
          const maxTemp = Math.round(item.main.temp_max);
          const minTemp = Math.round(item.main.temp_min);

          if (!dailyTemperatures[date]) {
            dailyTemperatures[date] = {
              maxTemp: maxTemp,
              minTemp: minTemp,
            };
          } else {
            dailyTemperatures[date].maxTemp = Math.max(
              dailyTemperatures[date].maxTemp,
              maxTemp
            );
            dailyTemperatures[date].minTemp = Math.min(
              dailyTemperatures[date].minTemp,
              minTemp
            );
          }
        }
      });
      console.log("Daily Temp", dailyTemperatures);

      for (const date in dailyTemperatures) {
        const minTemp = dailyTemperatures[date].minTemp;
        const maxTemp = dailyTemperatures[date].maxTemp;

        const weekdayName = new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
        });

        forecast.innerHTML += `
            <div class="four-day-forecast">
              <div class="weekday">
                <span>${weekdayName}</span>
                <span class="forecast-image"></span>
                <span>${minTemp}° /</span>
                <span>${maxTemp}°C</span>
              </div>
            </div>
            `;
      }

      // const groupedByDay = {};

      // forecastList.forEach((item) => {
      //   const day = item.dt_txt.split(" ")[0];
      //   console.log(day)

      //   if (day !== todaysDate) {
      //     if (!groupedByDay[day]) {
      //       groupedByDay[day] = [];
      //     }

      //     groupedByDay[day].push(item);
      //     console.log(groupedByDay)
      //   }
      // });

      //filter out today's forecast and assign it the weekday name
      // const filteredForecastList = forecastList.filter(
      //   (item) =>
      //     item.dt_txt.includes("15:00:00") &&
      //     !item.dt_txt.startsWith(todaysDate)
      // );
      // console.log("forecast exluding today's date:", filteredForecastList);

      //convert milliseconds into date form
      // filteredForecastList.forEach((day) => {
      //   const eachDaysDate = new Date(day.dt * 1000);
      //   console.log("forecast days in date form:", eachDaysDate);
      //   //convert each date form into the name of weekday
      //   const weekdayNameOption = { weekday: "short" };
      //   weekdayName = eachDaysDate.toLocaleDateString(
      //     "en-US",
      //     weekdayNameOption
      //   );
      //   console.log("weekday name:", weekdayName);
      // });

      // let highestMaxTemp = -500;
      // let lowestMinTemp = 500;

      // forecastList.forEach((item) => {
      //   const maxTemp = Math.round(item.main.temp_max);
      //   const minTemp = Math.round(item.main.temp_min);

      //   if (maxTemp > highestMaxTemp) {
      //     highestMaxTemp = maxTemp;
      //   }

      //   if (minTemp < lowestMinTemp) {
      //     lowestMinTemp = minTemp;
      //   }
      // });
      // console.log(
      //   `min/max temp: ${lowestMinTemp}, ${highestMaxTemp}`
      )
    });
};

fetchForecast();
