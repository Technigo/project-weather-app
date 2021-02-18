const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=915dd116171f65a30d26ebd8f13dfc18'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=915dd116171f65a30d26ebd8f13dfc18'
const currentWeather = document.getElementById('currentWeather')
const forecast = document.getElementById('forecast')
const mood = document.getElementById('mood')
const body = document.getElementById('body')


//CURRENT FETCH
fetch(currentWeatherUrl)
 .then((response) => {
  return response.json()
 })
 .then((data) => {
   const weatherDescription = data.weather.map((value) => {
    return value.main
    })
  
    currentWeather.innerHTML = `<p>${weatherDescription} | ${data.main.temp.toFixed()}</p>`
    currentWeather.innerHTML += `<p>sunrise ${new Date(data.sys.sunrise * 1000).toLocaleString('se-SE', {hour:'numeric', minute: 'numeric'})}</p>`
    currentWeather.innerHTML += `<p>sunset ${new Date(data.sys.sunset * 1000).toLocaleString('se-SE', {hour:'numeric', minute: 'numeric'})}</p>`

  
  //mood.innerHTML += `<h2>Light a fire and get cosy. ${data.name} is looking grey today.</h2>`
  const weatherMessage = () => {
    if (weatherDescription[0] === "Clouds") {
      console.log('working')
      mood.innerHTML += `<img src="icons/Cloud.svg">`
      mood.innerHTML += `<h2>Light a fire and get cosy. ${data.name} is looking grey today.</h2>`
      body.classList.add("cloud")
    } else if (weatherDescription[0] === "Rain") {
      mood.innerHTML += `<img src="icons/Umbrella.svg">`
      mood.innerHTML += `<h2>Don't forget your umbrella! It's wet in ${data.name} today.</h2>`
      body.classList.add("rain")
    } else if (weatherDescription[0] === "Sun") {
      mood.innerHTML += `<img src="icons/sun.svg">`
      mood.innerHTML += `<h2>Get sunnies on! ${data.name} is looking rather great today.</h2>`
      body.classList.add("sun")
    } else if (weatherDescription[0] === "Snow") {
      mood.innerHTML += `<img src="icons/snowflake.svg">`
      mood.innerHTML += `<h2>Put our warmest coat on! ${data.name} is rather chilly today.</h2>`
      body.classList.add("snow")
    }
  }
  
  weatherMessage()
  })



//FORECAST FETCH
  fetch(forecastUrl)
  .then((response) => {
    return response.json()
   })
   .then((data) => {
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))

    filteredForecast.forEach((value) => {
      const forecastDate = new Date(value.dt * 1000);
      console.log(value.dt)
      forecast.innerHTML += `
      <div class="day-temp">
        <p>${forecastDate.toLocaleString('en-US', {weekday: 'long'})}</p>
        <p>${value.main.temp.toFixed()}º</p>
      </div>
      <hr class="line">
      `
    })
   })
