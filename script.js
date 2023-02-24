// http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=775b6d69e24fcb088a070bee66d05057
const weatherHeader = document.getElementById("weather-header");
const mainSection = document.getElementById("main-section");
const weatherIcon = document.getElementById("weather-icon");
const weatherText = document.getElementById("weather-text");
const weekdays = document.getElementById("weekdays");
const temperature = document.getElementById("temperature");
const weatherForecast = document.getElementById("weather-forecast");
const nameForm = document.getElementById("nameForm");

const allowLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, error);
  } else {
    alert("Geolocation not avalible");
  }
};

const error = () => {
  alert("Geolocation not avalible.");
};

const setPosition = (position) => {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
};

const getWeather = (latitude, longitude) => {
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=775b6d69e24fcb088a070bee66d05057`;

  fetch(weatherApi)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      updateWeatherData(json);
      fetchForecastApi(json.name);
      weatherStylingChange(json.name);
    });
};
//Update with new html styling
const updateWeatherData = (data) => {
  const currentTemp = data.main.temp;
  const roundedUpTemp = Math.round(currentTemp);
  const description = data.weather[0].description;
  console.log(description);
  const sunriseNewDate = new Date(data.sys.sunrise * 1000);
  const sunriseTime = sunriseNewDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const sunsetNewDate = new Date(data.sys.sunset * 1000);
  const sunsetTime = sunsetNewDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  weatherHeader.innerHTML = `<p>${description} | ${roundedUpTemp}°C</p>
  <div class="sun-info">
  <div class="sunrise-info"><img src="Designs/Animated icons/sunrise.svg" class="sun-icon"/><p>${sunriseTime}</p></div>
  <div class="sunset-info"><img src="Designs/Animated icons/sunset.svg" class="sun-icon"/><p>${sunsetTime}</p></div>
  </div>
  `;
};

//Update with new html styling
const updateForeCastData = (data) => {
  const filteredForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00")
  );
  weekdays.innerHTML = "";
  filteredForecast.forEach((value) => {
    const forecastDate = new Date(value.dt * 1000);
    const weatherIcon = value.weather[0].icon;
    console.log(value.dt);

    weekdays.innerHTML += `
      <tr>
      <td>${forecastDate.toLocaleString("en-US", { weekday: "long" })}</td>
      <td class="forecasticonTd"><img src="Designs/Forecast icons/${weatherIcon}.svg" class="forecast-icon"/></td>
      <td class="tempTd">${value.main.temp.toFixed()} °C</td>
      </tr>
  `;
  });
};

const fetchWeatherApi = (nameOfCity) => {
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${nameOfCity}&units=metric&APPID=775b6d69e24fcb088a070bee66d05057`;

  fetch(weatherApi)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      updateWeatherData(json);
    });
};

const fetchForecastApi = (nameOfCity) => {
  let forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${nameOfCity}&units=metric&APPID=775b6d69e24fcb088a070bee66d05057`;

  fetch(forecastApi)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      updateForeCastData(json);
    });
};

const weatherStylingChange = (nameOfCity) => {
  let styleApi = `http://api.openweathermap.org/data/2.5/weather?q=${nameOfCity}&units=metric&APPID=775b6d69e24fcb088a070bee66d05057`;

  fetch(styleApi)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const typeOfWeather = `${json.weather[0].main}`; //this creates a variable where the information
      //about the weather condition is stored, so that it can be used in the else if-statements
      console.log(typeOfWeather);
      if (typeOfWeather === "Clouds") {
        //if the json description of the weather is "clouds", the following happens
        document.body.style.backgroundColor = "#dee1e2"; //adds grey bg color if it's cloudy
        document.body.style.color = "#C66966"; //adds salmon-y text color if it's cloudy
        weatherText.innerHTML = ` 
        <img src="Designs/Animated icons/cloudy.svg" class="weather-icon"/> 
        <h1>Light a fire and get cozy!
      ${json.name} is looking rather grey today.</h1>`; //adds the correct text and icon depending on the weather
      } else if (typeOfWeather === "Clear") {
        document.body.style.backgroundColor = "#F4E9BE";
        document.body.style.color = "#33531B";
        weatherText.innerHTML = `<img src="Designs/Animated icons/clear-day.svg" class="weather-icon"/>
        <h1>Get your sunnies on!
        ${json.name} is looking great today.</h1>`;
      } else if (typeOfWeather === "Snow") {
        document.body.style.backgroundColor = "#c9dce2";
        document.body.style.color = "#244762";
        weatherText.innerHTML = ` 
        <img src="Designs/Animated icons/snow.svg" class="weather-icon"/> 
        <h1>Cozy up inside or grab your skiis!
      It is snowing in ${json.name} today.</h1>`;
      } else if (typeOfWeather === "Rain") {
        document.body.style.backgroundColor = "#C6E7F8";
        document.body.style.color = "#244762";
        weatherText.innerHTML = `<img src="Designs/Animated icons/rain.svg" class="weather-icon"/>
        <h1>Don't forget your umbrella!
        It's wet in ${json.name} today.</h1>`;
      } else if (typeOfWeather === "Drizzle") {
        document.body.style.backgroundColor = "#C6E7F8";
        document.body.style.color = "#244762";
        weatherText.innerHTML = `<img src="Designs/Animated icons/rain.svg" class="weather-icon"/>
        <h1>Don't forget your umbrella!
        It's wet in ${json.name} today.</h1>`;
      } else if (typeOfWeather === "Thunderstorm") {
        document.body.style.backgroundColor = "#FFDBD5";
        document.body.style.color = "#7A3838";
        weatherText.innerHTML = `<img src="Designs/Animated icons/lightning-bolt.svg" class="weather-icon"/>
        <h1>Watch out!
        There's a thunderstorm brewing in ${json.name} today.</h1>`;
      }
    });
};

const start = () => {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=775b6d69e24fcb088a070bee66d05057"
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((json) => {
      updateWeatherData(json);
    });

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=775b6d69e24fcb088a070bee66d05057"
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((json) => {
      updateForeCastData(json);
    });

  allowLocation();
  cityInput.value = "";
};

const searchCity = (event) => {
  event.preventDefault();
  const cityInput = document.getElementById("cityInput");

  fetchForecastApi(cityInput.value);
  fetchWeatherApi(cityInput.value);
  weatherStylingChange(cityInput.value);

  cityInput.value = "";
};

start();
nameForm.addEventListener("submit", searchCity);
