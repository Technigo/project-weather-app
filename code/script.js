// URL
// https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&appid=5660c7e2a75e2c204e4b057312e71c93

const currentWeather = document.getElementById("currentWeather");
const currentTemp = document.getElementById("currentTemp");
const city = document.getElementById("city");
const weather = document.getElementById("weather");
const weatherIcon = document.getElementById("weatherIcon");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

// Variables for API-fethcing
const API_KEY = "5660c7e2a75e2c204e4b057312e71c93"; // Query param
let cityName = "Stockholm"; // Path param

const fetchStockholm = () => {
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

      currentTemp.innerHTML = `${roundedTemp}°C`;
      console.log(`${roundedTemp}°C`);

      city.innerHTML = `${json.name}`;
      console.log(json.name);

      const weatherDescription = json.weather[0].description;
      weather.innerHTML = `${weatherDescription}`;
      console.log(weatherDescription);

      let { icon } = json.weather[0];
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;

      // Shows the sunrise and sunset time with the right timezone
      // The date object is handling dates and times
      const sunriseData = new Date((json.sys.sunrise + json.timezone) * 1000); // Multiplying by 1000 to convert it into milliseconds.
      // Formats the sunriseData Date object into a time string using the toLocaleTimeString method.
      const sunriseTime = sunriseData.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const sunsetData = new Date((json.sys.sunset + json.timezone) * 1000);
      const sunsetTime = sunsetData.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Sunrise and sunset innerHTML
      sunrise.innerHTML = `
        <p>sunrise</p>${sunriseTime}
      `;
      sunset.innerHTML = `
        <p>sunset</p>${sunsetTime}
      `;

      console.log(`sunrise ${sunriseTime}`);
      console.log(`sunset ${sunsetTime}`);
    })
    .catch((error) => console.log("Error ❌", error));
};

fetchStockholm();
