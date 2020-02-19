// http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ed2d4804e9f1b16e037cdf4e25100bc4

const container = document.getElementById('city') 
const containerWeather = document.getElementById('weather')
const containerCelcius = document.getElementById('celsius')
const containerSunsetRise = document.getElementById('sunsetSunrise')
const containerForecast = document.getElementById('forecast')
const currentCondition = document.getElementById('weather')
const conditionImg = document.getElementById('weatherImage')
const countries = document.getElementById('otherCountries')


const uppsala = 'https://api.openweathermap.org/data/2.5/weather?q=Uppsala,Sweden&units=metric&APPID=ed2d4804e9f1b16e037cdf4e25100bc4'
const uppsalaForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ed2d4804e9f1b16e037cdf4e25100bc4'
const alicante = 'https://api.openweathermap.org/data/2.5/weather?q=Alicante,Spain&units=metric&APPID=ed2d4804e9f1b16e037cdf4e25100bc4'
const london = 'https://api.openweathermap.org/data/2.5/weather?q=London,UK&units=metric&APPID=ed2d4804e9f1b16e037cdf4e25100bc4'
const tampa = 'https://api.openweathermap.org/data/2.5/weather?q=Tampa,US&units=metric&APPID=ed2d4804e9f1b16e037cdf4e25100bc4'


fetch(uppsala)
.then((response) => {
  return response.json()
})

.then((json) => {
  container.innerHTML = `<h1>${json.name}</h1>`
  let tempAsJSON = json.main.temp.toFixed(0)
  containerCelcius.innerHTML += `<h1> ${tempAsJSON}${'&#730;'}<sup>C</sup>  </h1>`
  json.weather.forEach( (report)=> {
  containerWeather.innerHTML += `<h2>${report.description}</h2>` 

});
const weatherToday = () => {
  let windSpeed = json.wind.speed
  const weatherSymbol= json.weather[0].icon
  conditionImg.innerHTML += `<img class="weatherSymbol" src="${weatherSymbol}.png" alt="">`
  let sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {timeStyle:'short'})
  let sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {timeStyle:'short'})
 containerSunsetRise.innerHTML += `<h4> Sunrise: ${sunrise} </h4> <h4>Sunset: ${sunset} </h4>`
 

 var now = new Date();
 var short = now.toLocaleTimeString([], {timeStyle:'short'})
 if (short >= sunrise && short <= sunset) {
  document.getElementById("backgroundColor").classList.toggle('day')
  
 } else {
  document.getElementById("backgroundColor").classList.toggle('night')
  containerSunsetRise.style.color = 'rgba(255, 255, 255, 0.911)'
  
 }

}





weatherToday()
})



fetch(uppsalaForecast)
.then((response) => {
  return response.json()
})

.then((json) => {
  
  const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
filteredForecast.forEach((temp) => {
  let temperature = temp.main.temp.toFixed(0) 
  console.log(temperature)
  console.log(temp)
  const temperatureDays = new Date (temp.dt_txt)
  const correctDayFormat = temperatureDays.toLocaleDateString('en-US', {weekday:'short'})
  const weatherSymbol= temp.weather[0].icon
  document.getElementById('forecast').innerHTML += `<h6> ${correctDayFormat} ${temperature} ${'&#730;'}c <img class="weatherSymbolFore" src="${weatherSymbol}.png" alt=""> </h6> `
})  
  })
   
  fetch(london)
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    let tempCountries = json.main.temp.toFixed(0)
    const weatherSymbol= json.weather[0].icon
    countries.innerHTML += `<h2> ${json.name} ${tempCountries}${'&#730;'} c  <img class="weatherSymbolFore" src="${weatherSymbol}.png" alt=""></h2>`
  })

  fetch(alicante)
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    let tempCountries = json.main.temp.toFixed(0)
    const weatherSymbol= json.weather[0].icon
    countries.innerHTML += `<h2> ${json.name} ${tempCountries}${'&#730;'} c <img class="weatherSymbolFore" src="${weatherSymbol}.png" alt=""> </h2>`
  })

  fetch(tampa)
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    let tempCountries = json.main.temp.toFixed(0)
   const weatherSymbol= json.weather[0].icon 
   countries.innerHTML += `<h2> ${json.name} ${tempCountries}${'&#730;'} c  <img class="weatherSymbolFore" src="${weatherSymbol}.png" alt=""> </h2>`
  })