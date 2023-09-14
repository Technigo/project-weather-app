// One call länk och API key som funkar :OOOO https://api.openweathermap.org/data/2.5/onecall?lat=59.334591&lon=18.063240&exclude=hourly,minutely&units=metric&appid=7309e4a5829fafe809df835ad95f18ea

//DOM selectors
const currentWeather = document.getElementById("currentWeather");
const tempContainer = document.getElementById("temperature");
const city = document.getElementById("city");
const time = document.getElementById("time");
const weather = document.getElementById("weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherForecast = document.getElementById("weatherForecast");

// Variables for API-fethcing
const API_KEY = "5660c7e2a75e2c204e4b057312e71c93"; // (Query param)
let cityName = "Stockholm"; // City on startpage (Path param)

//Global variable

//API for the weather data for Stockholm.
const fetchStockholmWeather = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);

      const temperature = json.main.temp;
      const roundedTemperature = temperature.toFixed(1); // This will round to one decimal place
      console.log(roundedTemperature);

      tempContainer.innerHTML = `${roundedTemperature}`;
      city.innerHTML = `${json.name}`;
      //time.innerHTML = `${}`

      const weatherDescription = json.weather[0].description;
      weather.innerHTML = `${weatherDescription}`;
      //sunrise.innerHTML = `${}`
      //sunset.innerHTML = `${}`
    });
};

fetchStockholmWeather();

// API for weather forecast of the next 5 days.
const fiveDayForecast = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const filteredData = json.list.filter((dayWeather) => {
        // Check if the time is 12:00 (noon)
        return dayWeather.dt_txt.includes("12:00");
      });

      console.log(filteredData);
      // You can now use filteredData to display the weather at 12:00 PM every day
      showWeatherData(filteredData);
    })
    .catch((error) => console.log("Error ⛔", error));
};
fiveDayForecast();

// Weather forecast loop for each fifth day.
const showWeatherData = (filteredData) => {
  filteredData.forEach((day) => {
    const date = new Date(day.dt * 1000);
    console.log(date);
    //
    let dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    console.log(dayName);
    // Make a Date object for right now
    const today = new Date();
    console.log(today);
    // Compare the forecast's day with the day right now
    const isTodaysForecast = date.getDay() === today.getDay();

    const { main, wind, weather } = day;
    const { temp } = main;
    const icon = weather[0].icon;

    // Access wind speed from the wind object
    const { speed: wind_speed } = wind;
    // Use toFixed(0) to round the temperature to a whole number
    const roundedTemp = temp.toFixed(0);

    if (!isTodaysForecast) {
      // Weather forecast content for each 5 day
      weatherForecast.innerHTML += `
      <div class="forecast-container">
        <div class="forecast-weekday">${dayName}</div>
        <div class="forecast-icon">
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
        </div>
        <div class="forecast-temp">${roundedTemp}&#176;C</div>
        <div class="forecast-wind">${wind_speed} m/s</div>
      </div>
 `;
    }
  });
};
