


// http://openweathermap.org/img/wn/10d@2x.png

const tempToday = document.getElementById('headerTemp')
const weatherInfo = document.getElementById('weather')
const sunMoves = document.getElementById('SunRiseSet')
const forecasted = document.getElementById('fiveDays')
const body = document.getElementById('body')
const locationDropdown = document.getElementById('locationDropdown')
const  weatherIcon = document.getElementById('weatherImage')

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,SE&units=metric&APPID=00620bb638ed0fa5525452696e39c3ed`
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=00620bb638ed0fa5525452696e39c3ed`
//APID = 00620bb638ed0fa5525452696e39c3ed


  fetch(weatherURL)
    .then(response => response.json())
    .then((jsonWeather) => {
      console.log(jsonWeather.weather[0].icon)
      const temperature = Math.round(jsonWeather.main.temp * 10) / 10;
      const feelsLike = Math.round(jsonWeather.main.feels_like * 10) / 10;
      tempToday.innerHTML = `<img class="weather-image" src="https://openweathermap.org/img/wn/${jsonWeather.weather[0].icon}@2x.png"/>`; 
      tempToday.innerHTML += `<h1>${temperature}&#730;<h/1>`;
      weatherInfo.innerHTML = `<h4>But feels like ${feelsLike}&#730; in </h4>`;
      weatherInfo.innerHTML += `<h2>${jsonWeather.name}</h2>`;
      jsonWeather.weather.forEach((sky) => {
        weatherInfo.innerHTML += `<h3>${sky.description}</h3>`;
        const rise = new Date(jsonWeather.sys.sunrise * 1000);
        const sunRise = rise.toLocaleTimeString('en-SE', { timeStyle: 'short' });
        const set = new Date(jsonWeather.sys.sunset * 1000);
        const sunSet = set.toLocaleTimeString('en-SE', { timeStyle: 'short' });
        sunMoves.innerHTML += `<p>Sunrise: ${sunRise} </p>`
        sunMoves.innerHTML += `<p>Sunset: ${sunSet}</p>`
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
    })
/*
fetch(forecastURL)
  .then(response => response.json())
  .then(json => {
    const dateObject = {}
    const forecastData = json.list;
    forecastData.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      if (dateObject[date]) {
        dateObject[date].push(item)
      } else {
        dateObject[date] = [item]
      }
    })
    Object.entries(dateObject).forEach(item => {
      const date = item[0]
      const weekday= new Date(date)
      const forecastDay = weekday.toLocaleDateString('en-SE', { weekday: 'long' });
      const weatherData = item[1]
      const temps = weatherData.map(value => value.main.temp);
      const maxT = Math.max(...temps);
      const maxTemp = Math.round(maxT * 10) /10;
      const minT = Math.min(...temps);
      const minTemp = Math.round(minT * 10) / 10;
      console.log(forecastDay, minTemp, maxTemp);
      forecasted.innerHTML +=`<table class="forecast-table">
        <td>${forecastDay}</td><td>Max temp ${maxTemp}</td><td>Min Temp${minTemp}</td>
      </table>`
    })
  }); */

// http://openweathermap.org/img/wn/10d@2x.png

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
        console.log(fiveDays)
        console.log(temperature, feelsLike)
        console.log("https://openweathermap.org/img/wn/${icon}@2x.png");
        forecasted.innerHTML += `<table class="forecast-table"><td>${fiveDays}<td/>
      <td><img src="https://openweathermap.org/img/wn/${icon}.png" class= "forecast-icon"/></td><td>${temperature}&#730;</td>`
      })
    })



    /*`<p>${fiveDays} <p/>
      <img src="https://openweathermap.org/img/wn/${icon}.png" class= "forecast-icon"/><p>${temperature}&#730; (Will feel like ${feelsLike}&#730;)</p>`*/


