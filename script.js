const city = document.getElementById("city");
const weather = document.getElementById("typeOfWeather");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forecast = document.querySelector(".forecast");
const weatherHeader = document.querySelector(".weather-header");
const typeOfWeatherData = document.querySelector(".typeOfWeatherData");
const search = document.getElementById("search");
const theX = document.querySelector(".theX");
const lookingGlass = document.querySelector(".lookingGlass");
const searchBar = document.querySelector(".searchBar");
const headerBackground = document.querySelector(".header-background");
const weatherSection = document.getElementById("weather-section");
const weatherIconTop = document.getElementById("weatherIconTop");

let searchDisplay = false;
const searchToggle = (searchBoolean) => {
  if (searchBoolean) {
    searchBar.style.justifyContent = "center";
    search.style.display = "none";
    theX.style.display = "none";
    lookingGlass.style.display = "flex";
    searchDisplay = false;
  } else {
    search.style.display = "flex";
    theX.style.display = "flex";
    lookingGlass.style.display = "none";
    searchDisplay = true;
  }
};

//An event listener that calls the searching function when the value in the search bar is changed
const searchSubmit = search.addEventListener("change", (e) =>
  searching(e.target.value)
);

//Event listeners that toggle the visibility of the search bar
theX.addEventListener("click", () => {
  searchToggle(searchDisplay);
});
lookingGlass.addEventListener("click", () => {
  searchToggle(searchDisplay);
});

const API_KEY = "64856650e6321cbb411769554b46b8ad";
// Reserve API KEY = "421db630ea3e3aeb0cb64db6a500c27b"

let cityName = "Tokyo";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;
let API_CALL = `${url}`;

//Search function enabling users to search for weather in different places
const searching = (city) => {
  cityName = city; //sets the cityName to the one the user searched for
  url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`; //updates the url with the new information
  API_CALL = `${url}`;
  forecast.innerHTML = ""; //resets the forecast so that new data can be displayed
  apiData(); //calls the api again to request data for the place the user has entered
  search.value = "";
};

//Runs the geoLocationAPI that requests the user's location
const startUp = () => {
  geoLocationAPI();
};

//requests the user's location
const geoLocationAPI = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, errorHandling);
  }
};

//takes the coordinates from the user's location and sends a request to the API
function showPosition(position) {
  let startLat = position.coords.latitude;
  let startLon = position.coords.longitude;
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${startLat}&lon=${startLon}&units=metric&APPID=${API_KEY}`;
  API_CALL = `${url}`;
  apiData();
}

//Handles error related to the geolocation
function errorHandling(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      //If user does not allow geoplocation data the program will run with Tokyo as the default city
      apiData();
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}

const apiData = () => {
  fetch(API_CALL)
    .then((response) => response.json())
    .then((data) => {
      /* ******** Sunrise and Sunset ******** */
      city.innerHTML = `${data.name}`;
      weather.innerHTML = `${data.weather[0].description}`;
      temperature.innerHTML = `${data.main.temp.toFixed(1)}`;
      weatherIconTop.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      //A calculation to display the sunrise data in the city's local time
      const unixTimestampSunrise = data.sys.sunrise;

      const timezone = data.timezone;
      const offset = new Date().getTimezoneOffset() * 60; //Offset in sec
      const sunriseInSeconds = unixTimestampSunrise + timezone + offset;
      const sunriseinMilliseconds = sunriseInSeconds * 1000;
      const sunriseLocalDate = new Date(sunriseinMilliseconds);
      const LocalTimeSunrise = sunriseLocalDate.toLocaleTimeString([], {
        timeStyle: "short",
        hour12: false,
      });
      //Sets the data for the sunrise element
      sunrise.innerText = LocalTimeSunrise;

      //A calculation to display the sunset data in the city's local time
      const unixTimestampSunset = data.sys.sunset;

      const sunsetInSeconds = unixTimestampSunset + timezone + offset;
      const sunsetinMilliseconds = sunsetInSeconds * 1000;
      const sunsetLocalDate = new Date(sunsetinMilliseconds);
      const LocalTimeSunset = sunsetLocalDate.toLocaleTimeString([], {
        timeStyle: "short",
        hour12: false,
      }); // Convert timestamps to simple and short time format
      sunset.innerText = LocalTimeSunset;

      /* Forecast */
      //Takes the lat and lon data from the initial search and uses it to call the api again for the forecast
      let lat = data.coord.lat;
      let lon = data.coord.lon;

      //A function to change the background depending on weather
      let mainWeather = data.weather[0].main;
      if (mainWeather === "Clear") {
        headerBackground.style.background =
          "url('https://images.unsplash.com/photo-1523913950023-c47b5ae5b164?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80')";
        headerBackground.style.backgroundRepeat = "no-repeat";
        headerBackground.style.backgroundSize = "cover";
        headerBackground.style.backgroundPosition = "center bottom";
      } else if (mainWeather === "Clouds") {
        headerBackground.style.background =
          "url('https://images.unsplash.com/photo-1595661671412-e20c4a3e65cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80')";
        headerBackground.style.backgroundRepeat = "no-repeat";
        headerBackground.style.backgroundSize = "cover";
        headerBackground.style.backgroundPosition = "center bottom";
      } else if (mainWeather === "Rain") {
        headerBackground.style.background =
          "url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80')";
        headerBackground.style.backgroundRepeat = "no-repeat";
        headerBackground.style.backgroundSize = "cover";
        headerBackground.style.backgroundPosition = "center bottom";
      } else if (mainWeather === "Drizzle") {
        headerBackground.style.background =
          "url('https://images.unsplash.com/photo-1638253910847-b98cac8387c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80')";
        headerBackground.style.backgroundRepeat = "no-repeat";
        headerBackground.style.backgroundSize = "cover";
        headerBackground.style.backgroundPosition = "center bottom";
      } else if (mainWeather === "Thunderstorm") {
        headerBackground.style.background =
          "url('https://images.unsplash.com/photo-1429552077091-836152271555?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1970&q=80')";
        headerBackground.style.backgroundRepeat = "no-repeat";
        headerBackground.style.backgroundSize = "cover";
        headerBackground.style.backgroundPosition = "center bottom";
      } else if (mainWeather === "Snow") {
        headerBackground.style.background =
          "url('https://images.unsplash.com/photo-1516715094483-75da7dee9758?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')";
        headerBackground.style.backgroundRepeat = "no-repeat";
        headerBackground.style.backgroundSize = "cover";
        headerBackground.style.backgroundPosition = "center bottom";
      }

      const part = "current,minutely,hourly,alerts"; //Information to omit when calling the api for forecast data
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&cnt=6&exclude=${part}&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((forecastData) => {
          //Counter for days received from array
          let counter = 0;
          forecastData.daily.map((day, index) => {
            //A calculation to display the local time
            let unixTimestampDailyLocal = day.dt;

            const tzLocal = data.timezone;
            const offsetLocal = new Date().getTimezoneOffset() * 60; //Offset in sec
            const localInSeconds =
              unixTimestampDailyLocal + tzLocal + offsetLocal;
            const localinMilliseconds = localInSeconds * 1000;
            const localDate = new Date(localinMilliseconds);

            //Variables that get data about min and max temp, day of the week, and icon for weather
            let dayMax = day.temp.max.toFixed(0);
            let dayMin = day.temp.min.toFixed(0);
            let weekday = String(localDate).substring(0, 3);
            let iconLink = day.weather[0].icon;

            //This makes sure that only the five upcoming days will be displayed in the forecast
            //Index 0 is the current day and doesn't need to be shown in a list of upcoming weather
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

//Starts the app
startUp();
