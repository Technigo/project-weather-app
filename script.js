const city = document.getElementById("city");
const weather = document.getElementById("typeOfWeather");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forecast = document.querySelector(".forecast");
const weatherHeader = document.querySelector(".weather-header");

const API_KEY = "64856650e6321cbb411769554b46b8ad";
// Reserve API KEY = "421db630ea3e3aeb0cb64db6a500c27b"

let cityName = "Orebro";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;

const API_CALL = `${url}`;

const apiData = () => {
  fetch(API_CALL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      /* ******** Sunrise and Sunset ******** */
      city.innerHTML = `${data.name}`;
      weather.innerHTML = `${data.weather[0].description}`;
      console.log(data.weather[0].description);
      temperature.innerHTML = `${data.main.temp.toFixed(1)}`;

      // Convert timestamps to readable time format
      const sunriseTime = new Date(data.sys.sunrise * 1000); //Convert to milliseconds
      const sunsetTime = new Date(data.sys.sunset * 1000);

      // Format the times as HH.MM:SS
      const sunriseFormatted = sunriseTime.toLocaleTimeString("sv-SE", {
        timeStyle: "short",
        hour12: false,
      });
      const sunsetFormatted = sunsetTime.toLocaleTimeString("sv-SE", {
        timeStyle: "short",
        hour12: false,
      });

      sunrise.innerHTML = sunriseFormatted;
      sunset.innerHTML = sunsetFormatted;

      /* Forecast */
      let lat = data.coord.lat;
      let lon = data.coord.lon;

      let mainWeather = data.weather[0].main;
      if (mainWeather === "Clouds") {
        weatherHeader.style.backgroundImage =
          "url('https://media3.giphy.com/media/xT9GEpqOhIhNcV5etq/giphy.gif')";
      }
      console.log(mainWeather);
      //May need to be replaced
      let localTime = new Date((data.dt + data.timezone) * 1000);
      let subbedTime = localTime.toUTCString().substring(17, 22);

      console.log(`Local Time is: ${subbedTime}`);
      console.log(localTime.toUTCString());
      const part = "current,minutely,hourly,alerts";
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&cnt=6&exclude=${part}&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((forecastData) => {
          console.log(forecastData);
          //Counter for days received from array
          let counter = 0;

          forecastData.daily.map((day, index) => {
            let converted = new Date(day.dt * 1000);
            let dayMax = day.temp.max.toFixed(0);
            let dayMin = day.temp.min.toFixed(0);
            let weekday = converted.toUTCString().substring(0, 3);
            let iconLink = day.weather[0].icon;
            //just a test
            //-------------------
            //This makes sure that only the five upcoming days will be displayed
            if (counter < 5 && index !== 0) {
              forecast.innerHTML += `
                      <div class="futureForecast">
                      <p class="weekday">${weekday}</p>
                      <img src="http://openweathermap.org/img/wn/${iconLink}@2x.png" alt="weather-icon" class="weather-icon">
                      <p class="min-max-temps">${dayMax}°C / ${dayMin}°C </p>

                      </div>`;
              counter++;
            }
          });
        });
    });
};
apiData();
