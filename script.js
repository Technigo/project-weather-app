const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Kuala%20Lumpur&units=metric&appid=5527a65cb469b1aa0aae3017c8ea2460'

const summary = document.getElementById('summary')
const mainInformation = document.getElementById('mainInformation')
const icon = document.getElementById('icon')
const infoText = document.getElementById('infoText')
const forecast = document.getElementById('forecast')

fetch(apiUrl)
.then((response) => {
  return response.json()

})
.then((json) => {
  console.log(json)

  // SUMMARY
  // 1. WEATHER (weather --> main/description)
  // 2. TEMPERATURE (main --> temp) 
  // 3. SUNRISE (sys --> sunrise)
  // 4. SUNSET (sys --> sunset)

  //MAIN INFORMATION

  

  //FORECAST


})