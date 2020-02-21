// API for the cities, current weather

const tokyoAPI = "http://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=1c5c00b108885200d83efb308cec13d8"
const delhiAPI = "http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=1c5c00b108885200d83efb308cec13d8"
const shanghaiAPI = "http://api.openweathermap.org/data/2.5/weather?q=shanghai&appid=1c5c00b108885200d83efb308cec13d8"
const mexicoCityAPI = "http://api.openweathermap.org/data/2.5/weather?q=mexico&city&appid=1c5c00b108885200d83efb308cec13d8"
const saoPauloAPI = "http://api.openweathermap.org/data/2.5/weather?q=sao&paulo&appid=1c5c00b108885200d83efb308cec13d8"


// DOM elements

const currentTokyo = document.getElementById("currentTokyo")
const currentDelhi = document.getElementById("currentDelhi")
const currentShanghai = document.getElementById("currentShanghai")
const currentMexicoCity = document.getElementById("currentMexicoCity")
const currentSaoPaulo = document.getElementById("currentSaoPaulo")

const sunTokyo = document.getElementById("sunTokyo")
const sunDelhi = document.getElementById("sunDelhi")
const sunShanghai = document.getElementById("sunShanghai")
const sunMexicoCity = document.getElementById("sunMexicoCity")
const sunSaoPaulo = document.getElementById("sunSaoPaulo")

// Arrays

const biggestCities = [
  { API: tokyoAPI, current: currentTokyo, sun: sunTokyo, timeZone: "Asia/Tokyo" },
  { API: delhiAPI, current: currentDelhi, sun: sunDelhi, timeZone: "Asia/Kolkata" },
  { API: shanghaiAPI, current: currentShanghai, sun: sunShanghai, timeZone: "Asia/Shanghai" },
  { API: mexicoCityAPI, current: currentMexicoCity, sun: sunMexicoCity, timeZone: "America/Mexico_City" },
  { API: saoPauloAPI, current: currentSaoPaulo, sun: sunSaoPaulo, timeZone: "America/Sao_Paulo" }
]


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


// Get current weather for each city
biggestCities.forEach((item) => {

  let current = item.current
  let url = item.API
  let sun = item.sun
  let timeZone = item.timeZone
  const sunriseIcon = `<i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-sun"></i>`
  const sunsetIcon = `<i class="fas fa-long-arrow-alt-down"></i><i class="fas fa-sun"></i>`

  // Current weather
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((currentWeather) => {

      var icon = currentWeather.weather[0].id;
      let temp = (currentWeather.main.temp - 273.15).toFixed(1);
      let description = currentWeather.weather[0].description;

      let sunset = (new Date(currentWeather.sys.sunset * 1000)).toLocaleDateString("sv-SE", { timeStyle: "short", timeZone: `${timeZone}` });
      let sunrise = (new Date(currentWeather.sys.sunrise * 1000)).toLocaleDateString("sv-SE", { timeStyle: "short", timeZone: `${timeZone}` });

      let figure = weatherImage(icon);
      current.innerHTML = `The current temperature is ${temp}&#8451; and there are some ${description}. ${figure}`;
      sun.innerHTML = `${sunriseIcon} ${sunrise} ${sunsetIcon}${sunset} `;
    });

})


