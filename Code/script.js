const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=915dd116171f65a30d26ebd8f13dfc18'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=915dd116171f65a30d26ebd8f13dfc18'
const currentWeather = document.getElementById('currentWeather')
const forecast = document.getElementById('forecast')
const mood = document.getElementById('mood')


//CURRENT FETCH
fetch(currentWeatherUrl)
 .then((response) => {
  return response.json()
 })
 .then((data) => {
   const weatherDescription = data.weather.map((value) => {
    return value.main
    })
  
    currentWeather.innerHTML = `<p>${data.main.temp.toFixed()} | ${weatherDescription}</p>`
    currentWeather.innerHTML += `<p>sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleString('se-SE', {hour:'numeric', minute: 'numeric'})}</p>`
    currentWeather.innerHTML += `<p>sunset: ${new Date(data.sys.sunset * 1000).toLocaleString('se-SE', {hour:'numeric', minute: 'numeric'})}</p>`

  //mood.innerHTML += `<h2>Light a fire and get cosy. ${data.name} is looking grey today.</h2>`
  })

  const weatherMessage = () => {
    const weatherDescription = data.weather.map((value) => {
      return value.main
      })
  if (weatherDescription === "Clouds") {
    console.log('working')
    currentWeather.innerHTML += `<img src="./noun_Cloud_1188486.svg">`
    mood.innerHTML += `<h2>Light a fire and get cosy. ${data.name} is looking grey today.</h2>`
  } else if (weatherDescription === "Rain") {
    mood.innerHTML += `<img src="./noun_Cloud_1188486.svg">`
    mood.innerHTML += `<h2>Light a fire and get cosy. ${data.name} is looking grey today.</h2>`
  }
}

weatherMessage()



//FORECAST FETCH
  fetch(forecastUrl)
  .then((response) => {
    return response.json()
   })
   .then((data) => {
    
    
    console.log('data!', data.list.main)
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
    
    
    filteredForecast.forEach((value) => {
      const forecastDate = new Date(value.dt * 1000);
      console.log(value.dt)
      forecast.innerHTML += `<div><h3>${forecastDate.toLocaleString('en-US', {weekday: 'long'})}</h3>`
      
      forecast.innerHTML += `<p>Temp:${value.main.temp}</p>`

      //forecast.innerHTML += `<p>max-temp:${value.main.temp_max}</p>`
      forecast.innerHTML += `</div>`
    })
   })
