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
      console.log(forecastList);

      //filter the forecast that contain the time "15:00"
      const filteredForecastList = forecastList.filter((item) =>
        item.dt_txt.includes("15:00:00")
      );
      console.log(filteredForecastList);

      //filter the forecast to include only 4 days
      const todaysDate = new Date();
      const addFourDays = new Date(todaysDate);
      addFourDays.setDate(todaysDate.getDate() + 4);

      const fourDayForecast = filteredForecastList.filter((item) => {
        const forecastDate = new Date(item.dt * 1000);
        return forecastDate <= addFourDays;
      });

      //convert the timestamp to a date
      fourDayForecast.forEach((day) => {
        const eachDate = new Date(day.dt * 1000);
        console.log(eachDate);
        //convert each date to the name of the weekday
        const weekdayNameOption = { weekday: "short" };
        let weekdayName = eachDate.toLocaleDateString(
          "en-US",
          weekdayNameOption
        );
        console.log(weekdayName);

        //find the highest and lowest temp from the 5 day forecast fetch
        let highestMaxTemp = -500;
        let lowestMinTemp = 500;

        //i need to fix this so that it displays the maxTemp and minTemp for each day and not from the entire list.
        forecastList.forEach((item) => {
          const maxTemp = Math.round(item.main.temp_max);
          const minTemp = Math.round(item.main.temp_min);

          if (maxTemp > highestMaxTemp) {
            highestMaxTemp = maxTemp;
          }

          if (minTemp < lowestMinTemp) {
            lowestMinTemp = minTemp;
          }
        });

        console.log("highest max temp:", `${highestMaxTemp}`);
        console.log("lowest min temp:", `${lowestMinTemp}`);

        //get today's date to compare it to each day of the forecastodaysDate = new Date();
        const todaysForecast = eachDate.getDay() === todaysDate.getDay();
        console.log(todaysForecast);

        if (!todaysForecast) {
          forecast.innerHTML += `
          <div class="four-day-forecast">
            <div class="weekday">
              <span>${weekdayName}</span>
              <span class="forecast-image"></span>
              <span>${highestMaxTemp}° /</span>
              <span>${lowestMinTemp}°C</span>
            </div>
          </div>
          `;
        }
      });
    });
};

fetchForecast();
