const container =  document.getElementById('weatherInfo')
const containerSunrise = document.getElementById('sunrise')
const containerSunset = document.getElementById('sunset')

const URLDay = 'https://api.openweathermap.org/data/2.5/weather?q=Sanremo,Italia&units=metric&APPID=69828f6ac304f247815bc18fa686b778'
const URLForecast ='https://api.openweathermap.org/data/2.5/forecast?q=Sanremo,Italia&units=metric&APPID=69828f6ac304f247815bc18fa686b778'

const titleDays = document.getElementById('title')
const containerFive =  document.getElementById('fiveDays')
const containerDay = document.getElementById('weekDay')


fetch(URLDay)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    container.innerHTML = `<h1>${Math.round(myJson.main.temp.toFixed(1))}
    <sup>°C</sup></h1><h2>${myJson.name}</h2> 
    <h3>${myJson.weather[0].description}</h3>`
  })

  fetch(URLDay)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    let sunrise = new Date(myJson.sys.sunrise * 1000)
    let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' });

    let sunset = new Date(myJson.sys.sunset * 1000)
    let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' });

    containerSunrise.innerHTML = `<h2> Sunrise: ${sunriseTime} </h2>`
 
    containerSunset.innerHTML = `<h2> Sunset: ${sunsetTime} </h2>`
   
 })

 fetch(URLForecast)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    const filteredForecast = myJson.list.filter(item => item.dt_txt.includes('12:00'))
    filteredForecast.forEach((day) => {
    containerFive.innerHTML += `<li>${Math.round(day.main.temp.toFixed(1))}<sup>°C</sup></li>`
   
    const daysForecast = new Date(day.dt * 1000)
    const showDateString = daysForecast.toLocaleDateString('en-US', {weekday: 'short'});
      
      containerDay.innerHTML += `<li>${showDateString}</li>`

   })    
 })
