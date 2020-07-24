const tempToday = document.getElementById('headerTemp')
const skyToday = document.getElementById('headerPicture')
const weatherInfo = document.getElementById('weather')
const sunUp = document.getElementById('sunRise')
const sunDown = document.getElementById('sunSet')
const forecasted = document.getElementById('fiveDays')
const body = document.getElementById('body')
const locationDropdown = document.getElementById('locationDropdown')
const  weatherIcon = document.getElementById('weatherImage')


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(displayLocationInfo);
}
function displayLocationInfo(position) {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;

  // const apiURL https://api.openweathermap.org/data/2.5/
  // const APPID

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=00620bb638ed0fa5525452696e39c3ed`
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=00620bb638ed0fa5525452696e39c3ed`

  fetch(weatherURL)
    .then(response => response.json())
    .then((jsonWeather) => {
      const temperature = Math.round(jsonWeather.main.temp * 10) / 10;
      const feelsLike = Math.round(jsonWeather.main.feels_like * 10) / 10;
      tempToday.innerHTML += `<h1>${temperature}&#730;</h1>`;
      weatherInfo.innerHTML = `<h4>But feels like ${feelsLike}&#730; in </h4>`;
      weatherInfo.innerHTML += `<h2>${jsonWeather.name}</h2>`;
      jsonWeather.weather.forEach((sky) => {
        weatherInfo.innerHTML += `<h3>${sky.description}</h3>`;
        const rise = new Date(jsonWeather.sys.sunrise * 1000);
        const sunRise = rise.toLocaleTimeString('en-SE', { timeStyle: 'short' });
        const set = new Date(jsonWeather.sys.sunset * 1000);
        const sunSet = set.toLocaleTimeString('en-SE', { timeStyle: 'short' });
        sunUp.innerHTML += `<p>Sunrise: </p> <p>${sunRise} </p>`
        sunDown.innerHTML += `<p>Sunset: </> <p>${sunSet} </p>`
      })
      if (jsonWeather.main.temp > 20) {
        body.classList.toggle("hot");
      } else if (jsonWeather.main.temp > 10) {
        body.classList.toggle("warm");
      } else if (jsonWeather.main.temp > 0) {
        body.classList.toggle("medium");
      } else if (jsonWeather.main.temp > -10) {
        body.classList.toggle("cold");
      } else {
        body.classList.toggle("freezing");
      }
      if (jsonWeather.weather[0].main === "Clear") {
        skyToday.innerHTML = `<img class="weather-image" src="./assets/sun.png">`
      } else if (jsonWeather.weather[0].main === "Clouds") {
        skyToday.innerHTML = `<img class="weather-image" src="./assets/cloud.png">`
      } else if (jsonWeather.weather[0].main === "Rain" || "Drizzle") {
        skyToday.innerHTML = `<img class="weather-image" src="./assets/rain.png">`
      } else if (jsonWeather.weather[0].main === "Snow") {
        skyToday.innerHTML = `<img class="weather-image" src="./assets/snow.png">`
      } else {
        skyToday.innerHTML = `<img class="weather-image" src=".assets/cloud.png">`
      }
    })

  fetch(forecastURL)
    .then(response => response.json())
    .then((jsonForecast) => {
      const filteredForecast = jsonForecast.list.filter(item => item.dt_txt.includes('12:00'))
      filteredForecast.forEach((forecast) => { 
        const temperature = Math.round(forecast.main.temp * 10) / 10;
        const feelsLike = Math.round(forecast.main.feels_like * 10) / 10;
        const upcomingDays = new Date(forecast.dt_txt);
        const fiveDays = upcomingDays.toLocaleDateString('en-SE', { weekday: 'long' });
        const icon = (forecast.weather[0].icon)
        forecasted.innerHTML += `<table class="forecast-table"><td>${fiveDays}<td/>
      <td><img src="https://openweathermap.org/img/wn/${icon}.png" class= "forecast-icon"/></td><td>${temperature}&#730;</td></table>`
      })
    })
  }

 

