//Splash screen
let intro = document.querySelector(".intro");
let logo = document.querySelector(".logo-header");
let logoSpan = document.querySelectorAll(".logo");

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

//splash screen at work
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    logoSpan.forEach((span, idx) => {
      setTimeout(() => {
        span.classList.add("active");
      }, (idx + 1) * 400);
    });

    setTimeout(() => {
      logoSpan.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.remove("active");
          span.classList.add("fade");
        }, (idx + 1) * 50);
      });
    }, 2000);

    setTimeout(() => {
      intro.style.top = `-100vh`;
    }, 2300);
  });
});

// show is added to how burger menu appears
const show = () => {
  sideMenu.style.display = "flex";
  closeMenu.style.display = "flex";
};
const close = () => {
  sideMenu.style.display = "none";
  closeMenu.style.display = "none";
};

const getIconForWeather = (weather) => {
  if (weather === "Clear") {
    return "./assets/weather-icons/clear.svg";
  } else if (weather === "Clouds") {
    return "./assets/weather-icons/cloudy.svg";
  } else if (weather === "Drizzle") {
    return "./assets/weather-icons/rain.svg";
  } else if (weather === "Rain") {
    return "./assets/weather-icons/rain.svg";
  } else if (weather === "Thunderstorm") {
    return "./assets/weather-icons/thunderstorm.svg";
  } else if (weather === "Snow") {
    return "./assets/weather-icons/snow.svg";
  } else if (weather === "Mist") {
    return "./assets/weather-icons/mist.svg";
  } else if (weather === "Fog") {
    return "./assets/weather-icons/mist.svg";
  } else console.log("icon not found for", weather);

  return "./assets/weather-icons/default.svg";
};

const weatherBasedTheme = (weather, city) => {
  console.log("weatherBasedTheme", weather);
  const cozyIcon = document.getElementById("cozyTextIcon");
  const cozyText = document.getElementById("cozyTextParagraph");

  let newIcon, newText;

  if (weather === "Clear") {
    document.body.className = "weather-condition-clear";
    newIcon = `<img src="./assets/weather-icons/clear.svg">`;
    newText = `Sun's out, buns out - you know it ${city}! `;
  } else if (weather === "Clouds") {
    document.body.className = "weather-condition-cloudy";
    newIcon = `<img src="./assets/weather-icons/cloudy.svg">`;
    newText = `Light your favorite candle, ${city} is cloudy today.`;
  } else if (weather === "Drizzle") {
    document.body.className = "weather-condition-rain";
    newIcon = `<img src="./assets/weather-icons/rain.svg">`;
    newText = `Drizzle or waterfall, in ${city} you'll know when it's too late.`;
  } else if (weather === "Rain") {
    document.body.className = "weather-condition-rain";
    newIcon = `<img src="./assets/weather-icons/rain.svg">`;
    newText = `Drizzle or skyfall, in ${city} you'll know when it's too late.`;
  } else if (weather === "Thunderstorm") {
    document.body.className = "weather-condition-thunderstorm";
    newIcon = `<img src="./assets/weather-icons/thunderstorm.svg">`;
    newText = `Quickly ${city}, get inside and listen to the thunder!`;
  } else if (weather === "Snow") {
    document.body.className = "weather-condition-snow";
    newIcon = `<img src="./assets/weather-icons/snow.svg">`;
    newText = `Brrr... ${city} is feeling cold today. `;
  } else if (weather === "Mist") {
    document.body.className = "weather-condition-mist";
    newIcon = `<img src="./assets/weather-icons/mist.svg">`;
    newText = `Is ${city} misty or is something burning?`;
  } else if (weather === "Fog") {
    document.body.className = "weather-condition-mist";
    newIcon = `<img src="./assets/weather-icons/mist.svg">`;
    newText = `Is ${city} foggy or is something burning?`;
  } else {
    console.log("theme not found for", weather);
    document.body.className = "weather-condition-default";
    newIcon = `<img src="./assets/weather-icons/default.svg">`;
    newText = `Well this is embarrasing ${city}, can't seem to load your weather.`;
  }
  console.log("weatherBasedTheme() - about to set ", {
    newIcon,
    newText,
  });

  cozyIcon.innerHTML = newIcon;
  cozyText.innerHTML = newText;
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
  <span class="weather-forecast-entry-day">${daysOfTheWeek[dayOfTheWeek]}</span>
  <span class="weather-forecast-entry-icon"><img src="${forecastIcon}" alt="${forecastWeatherType}"/></span>
  <span class="weather-forecast-entry-temperature">${dayForecast.main.temp.toFixed(
    0
  )}°</span>
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

      console.log(json.name);
      console.log(currentCity);

      currentCity.innerHTML = json.name;
      liveTemperature.innerHTML = json.main.temp.toFixed(1);
      weatherDescription.innerHTML = json.weather[0].description;

      weatherBasedTheme(json.weather[0].main, json.name);

      // Sunrise and sunset //
      const timestampSunrise = json.sys.sunrise;
      const timestampSunset = json.sys.sunset;

      let sunrise = new Date(timestampSunrise * 1000);
      let sunriseTime = sunrise.toLocaleTimeString("sv-SE", {
        timeStyle: "short",
      });
      currentSunrise.innerHTML = `${sunriseTime}`; // prints in HTML

      let sunset = new Date(timestampSunset * 1000);
      let sunsetTime = sunset.toLocaleTimeString("sv-SE", {
        timeStyle: "short",
      });
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

// Enable user to close burger menu by pressing escape button
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
