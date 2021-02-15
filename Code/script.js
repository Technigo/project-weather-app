const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=915dd116171f65a30d26ebd8f13dfc18'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=915dd116171f65a30d26ebd8f13dfc18'
const currentWeather = document.getElementById('currentWeather')
const forecast = document.getElementById('forecast')



fetch(currentWeatherUrl)
 .then((response) => {
  return response.json()
 })
 .then((data) => {
   console.log(data.name)
   //const temp = temp.toFixed(1)
   currentWeather.innerHTML = `<h1>${data.main.temp.toFixed()}</h1>`
   currentWeather.innerHTML += `<h2>${data.name}</h2>`
  
  data.weather.map((description) => {
    return currentWeather.innerHTML += `<p>${description.description}</p>`
    
  })

  currentWeather.innerHTML += `<h2>sunrise: ${data.sys.sunrise}</h2>`
  currentWeather.innerHTML += `<h2>sunset: ${data.sys.sunset}</h2>`

  fetch(forecastUrl)
  .then((response) => {
    return response.json()
   })
   .then((data) => {
    
    
    console.log(data.list.main)
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(data.list.dt)
    const currentDay = new Date(1613395460);
    const options = { weekday: 'long'};
    const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(currentDay);
// Monday
    
    
    
    filteredForecast.forEach((value) => {
      forecast.innerHTML += `<div><h3>${dayOfWeek}</h3>`
      forecast.innerHTML += `<p>min-temp:${value.main.feels_like}</p>`

      forecast.innerHTML += `<p>max-temp:${value.main.temp_max}</p>`
      forecast.innerHTML += `</div>`
      
      

    })
    
   })
  


   













 })