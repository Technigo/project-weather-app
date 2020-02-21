// DOM elements
let header = document.getElementById("header");
let weather = document.getElementById("currentWeather")
let sun = document.getElementById("sun")
let forecast = document.getElementById("forecastWeather")
const head = document.getElementById("head")

// Dark mode
const darkMode = (sunsetTime, sunriseTime) => {

  let currentTime = new Date()
  currentTime = currentTime.toLocaleTimeString([], { timeStyle: "short" })
  if (sunriseTime <= currentTime && currentTime < sunsetTime) {
    head.innerHTML += `<link rel="stylesheet" href="/Code/CSS/style.css">`
  }
  else {
    head.innerHTML += `<link rel="stylesheet" href="/Code/CSS/darkMode.css">`
  }
}

// Icon generator
const weatherImage = (icon) => {
  if (icon < 300) {
    let figure = `<i class="fas fa-bolt"></i>`
    return figure;
  }
  else if (icon < 500) {
    let figure = `<i class="fas fa-cloud-rain"></i>`
    return figure;
  }
  else if (icon < 700) {
    let figure = `<i class="fas fa-cloud-showers-heavy"></i>`
    return figure;
  }
  else if (icon < 700) {
    let figure = `<i class="fas fa-snowflake"></i>`
    return figure;
  }
  else if (icon < 800) {
    let figure = `<i class="fas fa-smog"></i>`
    return figure;
  }
  else if (icon == 800) {
    let figure = `<i class="fas fa-sun"></i>`
    return figure;
  }
  else {
    let figure = `<i class="fas fa-cloud"></i>`
    return figure;
  }
}

// Get current position and print the weather
const success = (position) => {
  let geolocation = position.coords;

  const sunriseIcon = `<i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-sun"></i>`
  const sunsetIcon = `<i class="fas fa-long-arrow-alt-down"></i><i class="fas fa-sun"></i>`

  let latitude = geolocation.latitude;
  let longitude = geolocation.longitude;

  const weatherURL = `https://api.openweathermap.org//data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1c5c00b108885200d83efb308cec13d8`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=1c5c00b108885200d83efb308cec13d8`;

  // Current weather
  fetch(weatherURL)
    .then((response) => {
      return response.json();
    })
    .then((currentWeather) => {

      let temp = (currentWeather.main.temp - 273.15).toFixed(1);
      weather.innerHTML = `The current temperature is ${temp}&#8451; and it will be some ${currentWeather.weather[0].description}.`;

      header.innerHTML += `${currentWeather.name} `;

      let sunriseTime = (new Date(currentWeather.sys.sunrise * 1000)).toLocaleDateString("sv-SE", { timeStyle: "short" });
      let sunsetTime = (new Date(currentWeather.sys.sunset * 1000)).toLocaleDateString("sv-SE", { timeStyle: "short" });

      sun.innerHTML = `${sunriseIcon} ${sunriseTime} ${sunsetIcon}${sunsetTime}`;

      darkMode(sunsetTime, sunriseTime);
    })

  // Forecast
  fetch(forecastURL)
    .then((response) => {
      return response.json();
    })
    .then((forecastWeather) => {


      const filteredForecast = forecastWeather.list.filter(item => item.dt_txt.includes('03:00'))

      console.log(filteredForecast)
      filteredForecast.forEach(item => {
        let temperature = (item.main.temp - 273.15).toFixed(1);
        var icon = item.weather[0].id;
        let weekday = (new Date(item.dt * 1000)).toLocaleDateString("en-GB", { weekday: "short" })

        let figure = weatherImage(icon);
        forecast.innerHTML += `<p>${weekday} ${temperature}&#8451; ${figure}</p>`;
      });

    })
}

// If geolocation is not suported
const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message} `);
}

// Invoke geolocation finder
navigator.geolocation.getCurrentPosition(success, error);


