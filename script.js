let cityID = 2673730
const api_key = 'eb46c8c17530a3d02461794022d39d32'

const dropDown = document.querySelector('.city-nav')

const getWeatherNow = () => {
  const api = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&appid=${api_key}`

  fetch(api)
  .then((response) => {
    return response.json()
  })
  .then((city) => {

    // Top left lines
    const currentWeather = document.getElementById('current-weather')
    const sunriseTime = document.getElementById('sunrise')
    const sunsetTime = document.getElementById('sunset')
    const tempNow = Math.round(city.main.temp)
    const sunriseCalc = new Date(city.sys.sunrise * 1000)
    const sunrise = (new Date(sunriseCalc)).toLocaleTimeString('sv-SE', {
      hour12: false, 
      hour: '2-digit',
      minute: '2-digit'
    })
    const sunsetCalc = new Date(city.sys.sunset * 1000)
    const sunset = (new Date(sunsetCalc)).toLocaleTimeString('sv-SE', {
      hour12: false, 
      hour: '2-digit',
      minute: '2-digit'
    })

    currentWeather.innerHTML = `${city.weather[0].main} | ${tempNow}\u00b0C`
    sunriseTime.innerHTML = `Sunrise ${sunrise}`
    sunsetTime.innerHTML = `Sunset ${sunset}`
  

    // Headline content
    const now = document.getElementById('now')
    const ico = document.getElementById('now-icon')
    const nowFeelsLike = Math.round(city.main.feels_like)
    now.innerHTML = `It feels like ${nowFeelsLike}\u00b0C in ${city.name}.`,
    ico.src = `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
  })
}
getWeatherNow()



dropDown.addEventListener('change', (event) => {
  cityID = document.querySelector('.cityID')
  // const api = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&appid=${api_key}`

  console.log(`${event.target.value}`)

  if (cityID === 5391959){
    cityID = 5391959
    // San Francisco
    getWeatherNow()
    getForecast()

  } else if (cityID === 2643743){
    // London    
    getWeatherNow()
    getForecast()

  } else if (cityID === 1665148){
    // Taipei
    
    getWeatherNow()
    getForecast()
  } 
  else if (cityID === 2158177){
    // Melbourne
    
    getWeatherNow()
    getForecast()

  } else {
    // Stockholm
    cityID = 2673730
    getWeatherNow()
    getForecast()
  }
})
  



// Current Weather (default city)


  // fetch(api)
  // .then((response) => {
  //   return response.json()
  // })
  // .then((city) => {

  //   // Top left lines
  //   const tempNow = Math.round(city.main.temp)
  //   const sunriseCalc = new Date(city.sys.sunrise * 1000)
  //   const sunrise = (new Date(sunriseCalc)).toLocaleTimeString('sv-SE', {
  //     hour12: false, 
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   })
  //   const sunsetCalc = new Date(city.sys.sunset * 1000)
  //   const sunset = (new Date(sunsetCalc)).toLocaleTimeString('sv-SE', {
  //     hour12: false, 
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   })

  //   currentWeather.innerHTML = `${city.weather[0].main} | ${tempNow}\u00b0C`
  //   sunriseTime.innerHTML = `Sunrise ${sunrise}`
  //   sunsetTime.innerHTML = `Sunset ${sunset}`
  

  //   // Headline content
  //   const nowFeelsLike = Math.round(city.main.feels_like)
  //   now.innerHTML = `It feels like ${nowFeelsLike}\u00b0C in ${city.name}.`,
  //   ico.src = `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
  // })


  // // 5 day forecast
  const forecastAPI = `http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&units=metric&appid=eb46c8c17530a3d02461794022d39d32`
  const fiveDay = document.getElementById('five-Day') 

  const getForecast = () => {
    fetch(forecastAPI)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      const filteredForecast = json.list.filter(item =>item.dt_txt.includes('12:00'))
      filteredForecast.forEach((day) => {
        const date = new Date(day.dt * 1000)
        const dayName = date.toLocaleDateString('en-US', { 
          weekday: 'short',
          day: 'numeric'
        })
        const dayTemp = Math.round(day.main.feels_like)

        fiveDay.innerHTML += 
        `<p class="date">${dayName}</p>
        <p class="temp">${dayTemp}\u00b0C</p>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />
        <p class="description">${day.weather[0].description}</p>`    
    })
  }) 
  }
getForecast()
