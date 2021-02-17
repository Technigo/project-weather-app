//API variables
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Kuala%20Lumpur&units=metric&appid=5527a65cb469b1aa0aae3017c8ea2460'
const apiUrlForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=Kuala%20Lumpur&units=metric&appid=5527a65cb469b1aa0aae3017c8ea2460'

//DOM selectors
const summary = document.getElementById('summary')
const mainInformation = document.getElementById('mainInformation')
const icon = document.getElementById('icon')
const infoText = document.getElementById('infoText')
const forecastContainer = document.getElementById('forecastContainer')

//Global variables
let temperature


fetch(apiUrl)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    // SUMMARY
    // 1. WEATHER 
    json.weather.map((weather) => {
      summary.innerHTML += `
        <p>${weather.description}</p>`
    })

    // 2. TEMPERATURE 
    temperature = json.main.temp
    summary.innerHTML += `
      <p>${temperature.toFixed(0)}</p>`

    // 3. SUNRISE 
    const sunriseDate = new Date((json.sys.sunrise + json.timezone) * 1000)
    summary.innerHTML += `
    <p>${sunriseDate.getHours()}:${sunriseDate.getMinutes()}</p>`

    // 4. SUNSET 
    const sunsetDate = new Date((json.sys.sunset + json.timezone) * 1000)
    summary.innerHTML += `
    <p>${sunsetDate.getHours()}:${sunsetDate.getMinutes()}</p>`


    //MAIN INFORMATION
    // SVG + descriptive text that changes depending on the weather
    // 1. LOCATION 
    mainInformation.innerHTML += `
    <h2>${json.name}</h2>`
  })
  .catch(err => {
    console.error(err)
    summary.innerHTML = 'Error! ' + err
  })


//FORECAST - own fetch function
// Weather next 5 days + the same time
fetch(apiUrlForecast)
.then((response) => {
  return response.json()
})
.then((json) => {
  //Data types: day, date, temperature, weather (description)
  const timezone = json.city.timezone
  const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

  // TEMPERATURE & WEATHER
  filteredForecast.map((forecast) => {
    forecastContainer.innerHTML += `
    <p>${forecast.main.temp.toFixed(0)}</p>
    `

    //hårdkodat, skriv kommentar senare
    forecastContainer.innerHTML += `
    <p>${forecast.weather[0].description}</p>           
    `

    const forecastDate = new Date((forecast.dt + timezone) * 1000)
    forecastContainer.innerHTML += `
    ${forecastDate.toLocaleDateString('en-US', {weekday: 'short', month: 'numeric', day: 'numeric'})}
    `
  })


})
