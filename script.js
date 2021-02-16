//API variables
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Kuala%20Lumpur&units=metric&appid=5527a65cb469b1aa0aae3017c8ea2460'
const apiUrlForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=Kuala%20Lumpur&units=metric&appid=5527a65cb469b1aa0aae3017c8ea2460'


const summary = document.getElementById('summary')
const mainInformation = document.getElementById('mainInformation')
const icon = document.getElementById('icon')
const infoText = document.getElementById('infoText')
const forecast = document.getElementById('forecast')

//Global variables
let temperature


fetch(apiUrl)
.then((response) => {
  return response.json()

})
.then((json) => {
  // SUMMARY
  // 1. WEATHER (weather --> description)
  json.weather.map((weather) => {
    // console.log(weather.description)    //sätt en innerHTML
    summary.innerHTML += `
      <p>${weather.description}</p>`
  })

  // 2. TEMPERATURE (main --> temp) 
  // console.log(json.main.temp)  
  temperature = json.main.temp
  // console.log(temperature.toFixed(0))
  summary.innerHTML += `
    <p>${temperature.toFixed(0)}</p>`

  // 3. SUNRISE (sys --> sunrise)
  // console.log(json.sys.sunrise)
  summary.innerHTML += `
  <p>${json.sys.sunrise}</p>`

  // 4. SUNSET (sys --> sunset)
  // console.log(json.sys.sunset)
  summary.innerHTML += `
  <p>${json.sys.sunset}</p>`


  //MAIN INFORMATION
  // SVG + descriptive text that changes depending on the weather
  // 1. LOCATION (name)
  // console.log(json.name)
  mainInformation.innerHTML += `
  <p>${json.name}</p>`

})


//FORECAST - own fetch function
// Weather next 5 days + the same time
fetch(apiUrlForecast)
.then((response) => {
  return response.json()

})
.then((json) => {
  //// console.log(json)
  //Data types: day, date, temperature, weather (description)
  const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
  console.log(filteredForecast)

  filteredForecast.map((temp) => {
    console.log(temp.main.temp.toFixed(0))    
  })

  // WEATHER
  // const weatherDesc = filteredForecast.filter(item => item.weather.description)
  // console.log(weatherDesc)
  // filteredForecast.map((weather) => {

  //   // console.log(weather.weather.description)
    
  // })

})
