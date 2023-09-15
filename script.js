const city = document.getElementById("city");
const weather = document.getElementById("typeOfWeather");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forecast = document.querySelector(".forecast");
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
      temperature.innerHTML = `${data.main.temp}`;

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
      let localTime = new Date((data.dt + data.timezone) * 1000);
      let subbedTime = localTime.toUTCString().substring(17, 22);

      console.log(`Local Time is: ${subbedTime}`);
      console.log(localTime.toUTCString());
      const part = "current,minutely,hourly,alerts";
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&cnt=6&exclude=${part}&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          //Counter for days received from array
          let counter = 0;

          data.daily.map((day, index) => {
            let converted = new Date(day.dt * 1000);
            let dayMax = day.temp.max.toFixed(0);
            let dayMin = day.temp.min.toFixed(0);
            let dailyWeather = day.weather[0].description;
            let weekday = converted.toUTCString().substring(0, 3);
            let iconLink = day.weather[0].icon;
            //This makes sure that only the five upcoming days will be displayed
            if (counter < 5 && index !== 0) {
              forecast.innerHTML += `
                      <div>
                      <p>${weekday} </p>
                      <p>${dayMax}°C / ${dayMin}°C </p>
                      <p>${dailyWeather} </p> <img src="http://openweathermap.org/img/wn/${iconLink}@2x.png" alt="weather-icon">
                      </div>`;
              console.log(
                `${weekday} ${dayMax}°C / ${dayMin}°C  ${dailyWeather}`
              );
              counter++;
            }
          });
        });
    });
};
apiData();
