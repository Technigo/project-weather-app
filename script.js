const city = document.getElementById("city");
const weather = document.getElementById("typeOfWeather");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forecast = document.querySelector(".forecast");
const weatherHeader = document.querySelector(".weather-header");
const typeOfWeatherData = document.querySelector(".typeOfWeatherData");
const search = document.getElementById("search");

const searchSubmit = search.addEventListener("change", (e) => searching(e.target.value));


const API_KEY = "64856650e6321cbb411769554b46b8ad";
// Reserve API KEY = "421db630ea3e3aeb0cb64db6a500c27b"

let cityName = "Orebro";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;
let API_CALL = `${url}`;
const searching = (city) => {
  cityName = city;
  url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;
  API_CALL = `${url}`; 
  apiData();
}


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
      const weatherIconTop = data.weather[0].icon;
      typeOfWeatherData.innerHTML += `
      <img src="http://openweathermap.org/img/wn/${weatherIconTop}@2x.png" alt="weather-icon" class="weather-icon">
      `;
    const unixTimestampSunrise = data.sys.sunrise;
  
    const timezone = data.timezone
    const offset = new Date().getTimezoneOffset() * 60; //Offset in sec
    const sunriseInSeconds = unixTimestampSunrise + timezone + offset;
    const sunriseinMilliseconds = sunriseInSeconds * 1000;
    const sunriseLocalDate = new Date(sunriseinMilliseconds);
    const LocalTimeSunrise = sunriseLocalDate.toLocaleTimeString([], {timeStyle: "short", hour12: false,});
    sunrise.innerText = LocalTimeSunrise;
    const unixTimestampSunset = data.sys.sunset;

    const sunsetInSeconds = unixTimestampSunset + timezone + offset;
    const sunsetinMilliseconds = sunsetInSeconds * 1000;
    const sunsetLocalDate = new Date(sunsetinMilliseconds);
    const LocalTimeSunset = sunsetLocalDate.toLocaleTimeString([], {timeStyle: "short", hour12: false,}); // Convert timestamps to readable time format
    sunset.innerText = LocalTimeSunset;

    console.log(LocalTimeSunrise, LocalTimeSunset)
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
                      <div class="weekday">
                      <p>${weekday}</p>
                      </div>
                      <div class ="forecastImg">
                      <img src="http://openweathermap.org/img/wn/${iconLink}@2x.png" alt="weather-icon" class="weather-icon">
                     </div>
                     <div class="min-max-temps">
                      <p>${dayMax}°C / ${dayMin}°C </p>
                    </div>
                      </div>`;
              counter++;
            }
          });
        });
    });
};
apiData();
