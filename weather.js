// http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ed2d4804e9f1b16e037cdf4e25100bc4

const container = document.getElementById('city') 
const containerWeather = document.getElementById('weather')
const containerCelcius = document.getElementById('celsius')
const containerSunsetRise = document.getElementById('sunsetSunrise')
const containerForecast = document.getElementById('forecast')



fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ed2d4804e9f1b16e037cdf4e25100bc4')
.then((response) => {
  return response.json()
})

.then((json) => {
  container.innerHTML = `<h1>${json.name}</h1>`
  let tempAsJSON = json.main.temp.toFixed(1)
  containerCelcius.innerHTML += `<h1> ${tempAsJSON}${'&#730;'}<sup>C</sup>  </h1>`
  json.weather.forEach( (report)=> {
  containerWeather.innerHTML += `<h2>${report.description}</h2>`  

});


const windSpeed = () => {
  let windSpeed = json.wind.speed 
  
  containerSunsetRise.innerHTML += `Wind speed: ${windSpeed}`
}
windSpeed()

const sunrise = () => {
  let sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {timeStyle:'short'})
  containerSunsetRise.innerHTML += `<h4> Sunrise: ${sunrise} </h4>`
  
}
sunrise()

const sunset = () => {
let sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {timeStyle:'short'})
containerSunsetRise.innerHTML += `<h4> Sunset: ${sunset} </h4>`
  }

sunset()



})



fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ed2d4804e9f1b16e037cdf4e25100bc4')
.then((response) => {
  return response.json()
})

.then((json) => {
  //let middle = json.list.forEach(temperature => document.getElementById('forecast').innerHTML += `<p> ${temperature.dt} Min temp: ${temperature.main.temp_min} </p>`) 
  
  const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
  
  

// filteredForecast.forEach((temp) => {
//   let temperature = temp.main.temp_max
//   console.log(temperature)

// })

// filteredForecast.forEach((days) => {
//   let daysName = new Date(days.dt)
//   console.log(daysName.toDateString())
// })

//This Works
filteredForecast.forEach((temp) => {
  let temperature = temp.main.temp 
  //let daysName =  (temp.dt_txt)
  console.log(temperature)
  console.log(temp)
  //console.log(daysName)

  const temperatureDays = new Date (temp.dt_txt)
  const correctDayFormat = temperatureDays.toLocaleDateString('en-US', {weekday:'short'})
  document.getElementById('forecast').innerHTML += `<p> ${correctDayFormat}  ${temperature} ${'&#730;'} c </p>`
})


//fungerade dagar!!
// filteredForecast.forEach((temp) => {
//   const temperatureDays = new Date (temp.dt_txt)
//   const correctDayFormat = temperatureDays.toLocaleDateString('en-US', {weekday:'short'})
//   containerForecast.innerHTML+= `<p> ${correctDayFormat} </p>`
// })

 
  //console.log(daysName.toDateString())



//document.getElementById('forecast').innerHTML += `${days.daysName} ${temp.temperature}`
  
// filteredForecast.forEach((item) => {
//  document.getElementById('forecast').innerHTML += `<p> ${item.dt} Max temp: ${item.main.temp_max} </p>`
// })


  
  })
   

//})