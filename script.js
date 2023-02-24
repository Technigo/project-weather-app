let currentCity = "Malmö"; // set Malmö to the default city

let weatherDescription = document.getElementById("weatherDescription");
let cityName = document.getElementById("cityName");
let currentTemperature = document.getElementById("currentTemperature");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let weeklyWeather = document.getElementById("weeklyWeather");
let changeCityMalmo = document.getElementById("cityMalmo");
let changeCityStockholm = document.getElementById("cityStockholm");
let mainWeather = document.getElementById("mainWeather");
let mainWeatherPicture = document.getElementById("mainWeatherPicture");

const fetchCurrentWeather = (currentCity) => {
  let currentWeatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity},Sweden&units=metric&APPID=d73aa5f2cfee2a35632856b10b30a458`;

  fetch(currentWeatherLink)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderCurrentWeather(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchWeeklyWeather = (currentCity) => {
  let weeklyWeatherLink = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity},Sweden&units=metric&APPID=d73aa5f2cfee2a35632856b10b30a458`;

  fetch(weeklyWeatherLink)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderWeeklyWeather(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const renderCurrentWeather = (data) => {
  let weatherDescription = data.weather[0].description;
  let cityName = data.name;
  let currentTemperature = data.main.temp.toFixed();

  weatherDescription.innerHTML = `${weatherDescription}`;
  cityName.innerHTML = `${cityName}`;
  currentTemperature.innerHTML = `${currentTemperature}°C`;

  let fetchedSunrise = data.sys.sunrise;
  let sunriseTime = new Date(fetchedSunrise * 1000);
  let sunriseHours = sunriseTime.getHours();
  let sunriseMinutes = sunriseTime.getMinutes();
  let renderedSunrise =
    (sunriseHours < 10 ? "0" + sunriseHours : sunriseHours) +
    "." +
    (sunriseMinutes < 10 ? "0" + sunriseMinutes : sunriseMinutes); // making sure that if we get a one digit number we add 0 before it

  let fetchedSunset = data.sys.sunset;
  let sunsetTime = new Date(fetchedSunset * 1000);
  let sunsetHours = sunsetTime.getHours();
  let sunsetMinutes = sunsetTime.getMinutes();
  let renderedSunset =
    (sunsetHours < 10 ? "0" + sunsetHours : sunsetHours) +
    "." +
    (sunsetMinutes < 10 ? "0" + sunsetMinutes : sunsetMinutes);

  sunrise.innerHTML = `${renderedSunrise}`;
  sunset.innerHTML = `${renderedSunset}`;

  if (data.main.dt < data.sys.sunrise && data.main.dt > data.sys.sunset) {
    weeklyWeather.style.backgroundColor = "white"; // change this
  } else {
    weeklyWeather.style.backgroundColor = "black"; // change this
  }
};

const renderWeeklyWeather = (data) => {
  //code from https://stackoverflowteams.com/c/technigo/questions/786
  weeklyWeather.innerHTML = "";
  const filteredForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00")
  );

  filteredForecast.forEach((day) => {
    const date = new Date(day.dt * 1000);

    // Make a Date object for right now
    const now = new Date();

    // Compare the forecast's day with the day right now
    const isTodaysForecast = date.getDay() === now.getDay();

    let dayName = date.toLocaleDateString("en-US", { weekday: "short" });

    // We don't want to include this forecast if it is for today
    if (!isTodaysForecast) {
      weeklyWeather.innerHTML += `<p>${dayName} <img src="http://openweathermap.org/img/wn/${
        day.weather[0].icon
      }.png" alt="${
        day.weather[0].description
      }">  ${day.main.temp.toFixed()}°C</p>`;
    }
  });
};

const updateWeatherPicture = (data) => {
  // background changes depending on the weather type
  let weatherImage = data.weather[0].main;

  if (weatherImage === "Clear") {
    // https://openweathermap.org/weather-conditions The types should match the main types from this web?
    mainWeatherPicture.innerHTML = `
    <img id="" class="" src="/assets/sun.jpg">`;
  } else if (weatherImage === "Thunderstorm") {
    mainWeatherPicture.innerHTML = `
    <img id="" class="" src=""/>`;
  } else if (weatherImage === "Drizzle") {
    mainWeatherPicture.innerHTML = `
    <img id="" class="" src="./assets/sun.jpg"/>`;
  } else if (weatherImage === "Rain") {
    mainWeatherPicture.innerHTML = `
    <img id="" class="" src="./assets/sun.jpg"/>`;
  } else if (weatherImage === "Snow") {
    mainWeatherPicture.innerHTML = `
    <img id="" class="" src="/assets/cloudy.jpg">`;
  } else if (weatherImage === "Clouds") {
    mainWeatherPicture.innerHTML = `
    <img id="" class="" src="./assets/sun.jpg"/>`;
  } else {
    mainWeatherPicture.innerHTML = `
    <img id="" class="" src="./assets/sun.jpg"/>`;
  }
};

fetchCurrentWeather(currentCity);
fetchWeeklyWeather(currentCity);

changeCityMalmo.addEventListener("click", () => {
  fetchCurrentWeather("Malmö");
  fetchWeeklyWeather("Malmö");
});
changeCityStockholm.addEventListener("click", () => {
  fetchCurrentWeather("Stockholm");
  fetchWeeklyWeather("Stockholm");
});
