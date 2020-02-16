const container =  document.getElementById('weatherInfo')
const containerSunrise = document.getElementById('sunrise')
const containerSunset = document.getElementById('sunset')
const titleDays = document.getElementById('title')

const URLDay = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=69828f6ac304f247815bc18fa686b778'
const URLForecast ='https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=69828f6ac304f247815bc18fa686b778'

const containerFive =  document.getElementById('fiveDays')

fetch(URLDay)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    container.innerHTML = `<h1>${myJson.name} ${Math.round(myJson.main.temp.toFixed(1))}
    <sup>°C</sup></h1> 
    <h1>${myJson.weather[0].description}</h1>`
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
  console.log(filteredForecast)
   //containerFive.innerHTML = `<h1>${filteredForecast}<sup>°C</sup></h1>`

   filteredForecast.forEach((day) => {
    
    containerFive.innerHTML += `<h1>${Math.round(day.main.temp.toFixed(1))}<sup>°C</sup></h1>`

   })
   
 })

 






 