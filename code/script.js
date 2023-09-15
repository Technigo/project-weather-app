//DOM selectors
const background = document.getElementById("background");
const currentWeather = document.getElementById("currentWeather");
const currentTemp = document.getElementById("currentTemp");
const city = document.getElementById("city");
const localTimeDisplay = document.getElementById("localTimeDisplay");
const weather = document.getElementById("weather");
const weatherIcon = document.getElementById("weatherIcon");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherForecast = document.getElementById("weatherForecast");

// Variables for API-fethcing
const API_KEY = "5660c7e2a75e2c204e4b057312e71c93"; // (Query param)
let cityName = "Stockholm"; // City on startpage (Path param)

//Global variable
// Get the user's local timezone
//let userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//API for the weather data for Stockholm.
const fetchStockholmWeather = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      // Current temperature
      const temp = json.main.temp;
      const roundedTemp = temp.toFixed(1); // This will round to one decimal place
      console.log(roundedTemp);

      currentTemp.innerHTML = `${roundedTemp}`;
      console.log(`${roundedTemp}°C`);
      city.innerHTML = `${json.name}`;
      console.log(json.name);

      //Shows the local time
      const utcTimestamp = json.dt * 1000; //Convert to milliseconds
      const localTime = new Date(utcTimestamp);
      const formattedLocalTime = localTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      console.log(`Clock is: ${formattedLocalTime}`);
      localTimeDisplay.innerHTML = `Time: ${formattedLocalTime}`;

      const weatherDescription = json.weather[0].description;
      weather.innerHTML = `${weatherDescription}`;
      console.log(weatherDescription);

      let { icon } = json.weather[0];
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;

      // Shows the sunrise and sunset time with the right timezone
      // The date object is handling dates and times
      const sunriseData = new Date(json.sys.sunrise * 1000); // Multiplying by 1000 to convert it into milliseconds.
      // Formats the sunriseData Date object into a time string using the toLocaleTimeString method.
      const sunriseTime = sunriseData.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const sunsetData = new Date(json.sys.sunset * 1000);
      const sunsetTime = sunsetData.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Sunrise and sunset innerHTML
      sunrise.innerHTML += `${sunriseTime}`;
      sunset.innerHTML += `${sunsetTime}`;

      console.log(`sunrise ${sunriseTime}`);
      console.log(`sunset ${sunsetTime}`);

      const todaysWeather = json.weather[0].main;
      console.log(todaysWeather);

      // ------------ Image backgrounds feature ------------
      // Array for weather category atmosphere
      const atmosphere = [
        "Mist",
        "Smoke",
        "Haze",
        "Dust",
        "Fog",
        "Sand",
        "Dust",
        "Ash",
        "Squall",
        "Tornado",
      ];

      console.log(formattedLocalTime);
      console.log(sunriseTime);
      console.log(sunsetTime);
      console.log(
        formattedLocalTime >= sunriseTime && formattedLocalTime >= sunsetTime
      );
      console.log(
        formattedLocalTime <= sunriseTime && formattedLocalTime <= sunsetTime
      );

      // WHY DOES THIS WORK?
      if (
        formattedLocalTime <= sunriseTime &&
        formattedLocalTime <= sunsetTime
      ) {
        // Daytime background images depending on weather.
        if (todaysWeather === "Thunderstorm") {
          background.style.backgroundImage = `url('./images/thunder.jpg')`;
        } else if (todaysWeather === "Drizzle" || todaysWeather === "Rain") {
          background.style.backgroundImage = `url('./images/rainy.jpg')`;
        } else if (todaysWeather === "Snow") {
          background.style.backgroundImage = `url('./images/snow.jpg')`;
        } else if (todaysWeather === "Clear") {
          background.style.backgroundImage = `url('./images/sunnyday.jpg')`;
        } else if (todaysWeather === "Clouds") {
          background.style.backgroundImage = `url('./images/cloudy.jpg')`;
        } else if (atmosphere.includes(todaysWeather)) {
          background.style.backgroundImage = `url('./images/mist.jpg')`;
        } else {
          background.style.backgroundImage = `url('./images/else.jpg')`;
        }
      } else {
        // Nighttime background images depending on weather.
        if (todaysWeather === "Clear") {
          background.style.backgroundImage = `url('./images/night.jpg')`;
        } else {
          background.style.backgroundImage = `url('./images/cloudy-night.jpg')`;
        }
      }
    })
    .catch((error) => console.log("Error ❌", error));
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
          <img class="moln" src="https://openweathermap.org/img/wn/${icon}@2x.png">
        </div>
        <div class="forecast-temp">${roundedTemp}&#176;C</div>
        <div class="forecast-wind">${wind_speed} m/s</div>
      </div>
 `;
    }
  });
};
