const container = document.getElementById('todaysinfo')
const sunriseContainer = document.getElementById('sunriseinfo')
const sunsetContainer = document.getElementById('sunsetinfo')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Miami,%20USA&units=metric&APPID=804400298ac4f45795306a8ea7ab8f5e')
.then((response) => {
  return response.json()
})
.then((json) => {
  todaysinfo.innerHTML = 
  `<h1>${json.name} </h1> 
  <h2>${json.main.temp.toFixed(1)} Celcius</h2> 
  <h2>${json.weather[0].description} </h2>`
  
  console.log(json)


//Declare variable for the time of sunrise/sunset
const unixTimestampSunrise = json.sys.sunrise
const unixTimestampSunset = json.sys.sunset

//To get sunrise/sunset time in hours:minutes:seconds
let sunrise = new Date(unixTimestampSunrise * 1000)
let sunset = new Date(unixTimestampSunset * 1000)

//Declare new variable to show only hh:mm
let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

sunsetContainer.innerHTML = `<h1> Sunset: ${sunsetTime} </h1>`
sunriseContainer.innerHTML = `<h1> Sunrise: ${sunriseTime} </h1>`

  })

