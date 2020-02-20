const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,sweden&units=metric&APPID=00620bb638ed0fa5525452696e39c3ed`
const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=00620bb638ed0fa5525452696e39c3ed`
//APID = 00620bb638ed0fa5525452696e39c3ed


// http://openweathermap.org/img/wn/10d@2x.png

const tempToday = document.getElementById('headerTemp')
const weatherInfo = document.getElementById('weather')
//const sunMoves = document.getElementById('SunRiseSet')
const forecasted = document.getElementById('fiveDays')
const body = document.getElementById('body')


fetch(weatherURL)
  .then(response => response.json())
  .then((jsonWeather) => {
    console.log(jsonWeather)
    const temperature = Math.round(jsonWeather.main.temp * 10) /10;
    const feelsLike = Math.round(jsonWeather.main.feels_like *10) /10;
    tempToday.innerHTML = `<h1>${temperature}&#730;<h/1>`;
    weatherInfo.innerHTML = `<h4>But feels like ${feelsLike}&#730; in </h4>`;
    weatherInfo.innerHTML += `<h2>${jsonWeather.name}</h2>`;
    jsonWeather.weather.forEach((sky) => {
      weatherInfo.innerHTML += `<h3>${sky.description}</h3>`;
    const rise = new Date(jsonWeather.sys.sunrise * 1000);
    const sunRise = rise.toLocaleTimeString('en-SE', {timeStyle: 'short'});
    const set = new Date(jsonWeather.sys.sunset * 1000);
    const sunSet = set.toLocaleTimeString('en-SE', {timeStyle: 'short'});
    weatherInfo.innerHTML += `<p>Sunrise: ${sunRise} </p>`
    weatherInfo.innerHTML +=`<p>Sunset: ${sunSet}</p>`
    })
    if (jsonWeather.main.temp > 20 ) {
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

// http://openweathermap.org/img/wn/10d@2x.png

fetch(forecast)
  .then(response => response.json())
  .then((jsonForecast) => {
    console.log(jsonForecast)
    const filteredForecast = jsonForecast.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)
    filteredForecast.forEach((forecast) => {
     //  const forecastIcon = 
      const temperature = Math.round(forecast.main.temp * 10) / 10;
      const feelsLike = Math.round(forecast.main.feels_like * 10) / 10;
      const upcomingDays = new Date(forecast.dt_txt);
      const fiveDays = upcomingDays.toLocaleDateString('en-SE', {weekday: 'long'});
      const icon = (forecast.weather[0].icon)
      console.log(fiveDays) 
      console.log(temperature, feelsLike)
      console.log("https://openweathermap.org/img/wn/${icon}@2x.png");
      forecasted.innerHTML += `<p>${fiveDays} <p/>
      <img src="https://openweathermap.org/img/wn/${icon}.png" class= "forecast-icon"/><p>${temperature}&#730; (Will feel like ${feelsLike}&#730;)</p>`
    })
  })




  .catch((err) => {
    console.log('cauhgt error', err)
  })