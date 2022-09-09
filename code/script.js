// burger menu
const closeMenu = document.querySelector(".closeMenu");
const burger = document.querySelector(".burger");
const sideMenu = document.querySelector(".sideMenu");
const inputLocation = document.getElementById("inputLocation");
const submitBtn = document.getElementById("submitBtn");
const searchForm = document.getElementById("searchForm");

// city and temps
const currentCity = document.getElementById("city");
const liveTemperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("description");
const dayForecast = document.getElementById("weatherForecast");
const daysOfTheWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const currentSunrise = document.getElementById("todaysWeatherSunrise");
const currentSunset = document.getElementById("todaysWeatherSunset");

// show is added to how burger menu appears
const show = () => {
  sideMenu.style.display = "flex";
  // sideMenu.style.top = "0";
  closeMenu.style.display = "flex";
};
const close = () => {
  // sideMenu.style.top = "-150%";
  sideMenu.style.display = "none";
  closeMenu.style.display = "none";
};

let city = "Stockholm";
const apiNow = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=ba408ec4b2f7f251f2dd0044bd3e07f2`;
const apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=ba408ec4b2f7f251f2dd0044bd3e07f2`;

const getIconForWeather = (weather) => {
  // keep clear, clouds, rain (drizzle goes here!), thunderstorm, snow, mist
  if (weather === "Clear") {
    return "./assets/weather-icons/clear.svg";
  } else if (weather === "Clouds") {
    return "./assets/weather-icons/cloudy.svg";
  } else if (weather === "Drizzle") {
    return "./assets/weather-icons/drizzle.svg";
  } else if (weather === "Rain") {
    return "./assets/weather-icons/rain.svg";
  } else if (weather === "Thunderstorm") {
    return "./assets/weather-icons/thunderstorm.svg";
  } else if (weather === "Snow") {
    return "./assets/weather-icons/snow.svg";
  } else if (weather === "Mist") {
    return "./assets/weather-icons/mist.svg";
  } else console.log("icon not found for", weather);

  return "./assets/weather-icons/fallback-icon.svg";
};

const printForecastEntry = (dayForecast) => {
  const forecastDate = new Date(dayForecast.dt * 1000);
  const dayOfTheWeek = forecastDate.getDay();

  const forecastWeatherType = dayForecast.weather[0].main;

  console.log(forecastWeatherType);
  const forecastIcon = getIconForWeather(forecastWeatherType);

  console.log(forecastIcon);

  weatherForecast.innerHTML += `
  <div class="weather-forecast-entry">
  <span>${daysOfTheWeek[dayOfTheWeek]}</span>
  <span><img src="${forecastIcon}" class="weather-forecast-icon" alt="${forecastWeatherType}"/></span>
  <span>${dayForecast.main.temp.toFixed(0)}°</span>
  </div>
  `;
};

const getWeather = (city) => {
  console.log("fetching weather data for ", city);
  const apiNow = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=ba408ec4b2f7f251f2dd0044bd3e07f2`;
  const apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=ba408ec4b2f7f251f2dd0044bd3e07f2`;

  console.log("using urls:", { apiNow, apiForecast });

  fetch(apiNow)
    .then((response) => response.json())
    .then((json) => {
      console.log("got weather for now");

      currentCity.innerHTML = json.name;
      liveTemperature.innerHTML = json.main.temp.toFixed(1);
      weatherDescription.innerHTML = json.weather[0].description;

      // Sunrise and sunset //
      const timestampSunrise = json.sys.sunrise;
      const timestampSunset = json.sys.sunset;

      let sunrise = new Date(timestampSunrise * 1000);
      let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
      currentSunrise.innerHTML = `${sunriseTime}`; // prints in HTML

      let sunset = new Date(timestampSunset * 1000);
      let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });
      currentSunset.innerHTML = `${sunsetTime}`; // prints in HTML
    })
    .catch((error) =>
      console.error(
        "There has been a problem with your fetch operation:",
        error
      )
    );

  fetch(apiForecast)
    .then((response) => {
      return response.json();
    })
    .then((dayForecast) => {
      console.log("got weather for forecast");
      const filteredForecast = dayForecast.list.filter((item) =>
        // @TODO maybe change to a better time here? see this for visualisation https://jsoncrack.com/editor?fbclid=IwAR2ZSGA26fdIHECi0-ISKwEsHs8BuZlb8bCS_-3O1j_0drQRkNIdzvK7fE0
        item.dt_txt.includes("12:00")
      );
      filteredForecast.forEach(printForecastEntry);
    });
};
getWeather("Stockholm");

// Event listeners
searchForm.addEventListener("submit", (e) => {
  //when pressend enter it sends
  console.log("form submitted");
  e.preventDefault();
  weatherForecast.innerHTML = ``;
  city = inputLocation.value;
  console.log("change city to", city);
  getWeather(city);
});
burger.addEventListener("click", show);
closeMenu.addEventListener("click", close);
searchForm.addEventListener("submit", close);

document.onkeydown = function (evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = evt.key === "Escape" || evt.key === "Esc";
  } else {
    isEscape = evt.keyCode === 27;
  }
  if (isEscape) {
    close();
  }
};
