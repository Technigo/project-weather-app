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
    // 1. WEATHER // 2. TEMPERATURE 
    json.weather.map((weather) => {
      const sunriseDate = new Date((json.sys.sunrise + json.timezone) * 1000)
      const sunsetDate = new Date((json.sys.sunset + json.timezone) * 1000)
      temperature = json.main.temp
      summary.innerHTML += `
        <p>${weather.description} | ${temperature.toFixed(0)} &#8451;</p>
        <p> sunrise: ${sunriseDate.getHours()}:${sunriseDate.getMinutes()}</p>
        <p> Sunset: ${sunsetDate.getHours()}:${sunsetDate.getMinutes()}</p>`
    })

    const { id, main } = json.weather[0];
    if (id < 250) {
      // THUNDER
      icon.innerHTML += `<img src="assets/thunder.svg">`

    } else if (id < 550) {
      // RAIN
      icon.innerHTML += `<img src="assets/rain.svg">`

    } else if (id < 650) {
      // SNOW
      icon.innerHTML += `<img src="assets/snowy.svg">`

    } else if (id < 700) {
      // HAZE
      icon.innerHTML += `<img src="assets/hazecloud.svg">`
    } else if (id == 800) {
      // CLEAR
      icon.innerHTML += `<img src="assets/sun.svg">`  

    } else if (id > 800) {
      // CLOUDY
      icon.innerHTML += `<img src="assets/cloud.svg">`

    } else {
      // BAD
      icon.innerHTML += `<img src="assets/whirlpool.svg">`
    }


    //MAIN INFORMATION
    // SVG + descriptive text that changes depending on the weather
    // 1. LOCATION 
    mainInformation.innerHTML += `
    <h2>Morbi placerat, mauris a ultrices elementum,${json.name} augue velit aliquam nibh, ut hendrerit risus nisl gravida metus.</h2>`

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
  /*filteredForecast.map((forecast) => {
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
  })*/

  filteredForecast.map((forecast) => {
    const mainTemperature = forecast.main.temp.toFixed(1)
    const weatherDiscription = forecast.weather[0].description
    
    const forecastDate = new Date((forecast.dt + timezone) * 1000)
    const forecastDay = forecastDate.toLocaleDateString('en-US', 
      { 
        weekday: 'short', 
        month: 'numeric', 
        day: 'numeric'
      })
    
    forecastContainer.innerHTML += 
      `<p> ${forecastDay} |  ${weatherDiscription}   | ${mainTemperature} &#8451</p>`
  })

})
