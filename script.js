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
  alert("Geolocation not avalible.")
}

const setPosition = (position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

const getWeather = (latitude, longitude) => {
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=775b6d69e24fcb088a070bee66d05057`;

  fetch(weatherApi)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      updateWeatherData(json);
      fetchForecastApi(json.name);
    });
}
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
  weatherHeader.innerHTML = `
    <p>City: ${data.name}</p>
    <p>Temperature: ${roundedUpTemp} °C</p>
    <p>Weather: ${description}</p>
    <p>Sunrise: ${sunriseTime}</p>
    <p>Sunset: ${sunsetTime}</p>
    `;
};
//Update with new html styling
const updateForeCastData = (data) => {
  const filteredForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00")
  );
  weekdays.innerHTML = ""
  filteredForecast.forEach((value) => {
    const forecastDate = new Date(value.dt * 1000);
    console.log(value.dt);

    weekdays.innerHTML += `
      <tr>
      <td>${forecastDate.toLocaleString("en-US", { weekday: "long" })}</td>
      <td class="tempTd">${value.main.temp.toFixed()} °C</td>
      </tr>
  `;
  });
}

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
      updateForeCastData(json)
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
     updateForeCastData(json)
    });

    allowLocation();
    cityInput.value = ""
}

const searchCity = (event) => {
  event.preventDefault();
  const cityInput = document.getElementById("cityInput");

  fetchForecastApi(cityInput.value);
  fetchWeatherApi(cityInput.value);

  cityInput.value = ""
};

start()
nameForm.addEventListener("submit", searchCity);
