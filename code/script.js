const url = 'https://api.openweathermap.org/data/2.5/weather?q=Honolulu,US&units=metric&APPID=10fda04a7a07d18a42350678faeacff1'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Honolulu,US&units=metric&APPID=10fda04a7a07d18a42350678faeacff1'
const mainContainer = document.getElementById('main')
const city = document.getElementById('city')
const weather = document.getElementById('weather')
const temperature = document.getElementById('temperature')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const week = document.getElementById('week')
const header = document.getElementById('header')
const weatherIcon = document.getElementById('weather-icon')

fetch(url)
.then((response) => (response.json()))
.then((data) => {
 
  
  city.innerHTML += ` ${data.name}`; 
  temperature.innerHTML += ` ${data.main.temp.toFixed(1)} ºC`;
  weather.innerHTML += `${data.weather[0].description}`;
  sunrise.innerHTML +=`${new Date((data.sys.sunrise + data.timezone) * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12:false,})}`
  sunset.innerHTML += `${new Date((data.sys.sunset + data.timezone) * 1000).toLocaleTimeString('en-US',{hour: '2-digit', minute:'2-digit', hour12:false,})}`
})

.catch((error)=>{
  mainContainer.innerHTML = `<h2>Ooops, an error has occurred! Please try again later.<h2>`
})

fetch(forecastUrl)
.then((response) => (response.json())) 
.then((data) => {
  const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))

  filteredForecast.forEach(item => {
  let temperature = (item.main.temp).toFixed(1);
  let weekday = (new Date(item.dt * 1000)).toLocaleDateString("en-US", {weekday: "long"});
  let weatherPicture = `<img src=https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png></img>`;

  week.innerHTML += `
    <p>${weekday}  ${weatherPicture} ${temperature} ºC</p>`;
})
})

.catch((error)=>{
  mainContainer.innerHTML = `<h2>Ooops, an error has occurred! Please try again later.<h2>`
})