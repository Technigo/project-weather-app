const container = document.getElementById('todaysinfo')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Miami,%20USA&units=metric&APPID=804400298ac4f45795306a8ea7ab8f5e')
.then((response) => {
  return response.json()
})
.then((json) => {
  todaysinfo.innerHTML = 
  `<h1>${json.name} </h1> 
  <h2>${Math.round(json.main.temp)} Celcius</h2> 
  <h2>${json.weather[0].description} </h2>
  <h2>Sunrise at: ${`${json.sys.sunrise}:${json.sys.sunrise}`}</h2>
  <h2>Sunset at: ${`${json.sys.sunset}:${json.sys.sunset}`}</h2>`

  console.log(json)
 /* .catch(function() {
    // catch any errors
  })*/

.then((json) => {
//Declare variable for the time of sunrise/sunset
const unixTimestampSunrise = json.sys.sunrise
const unixTimestampSunset = json.sys.sunset

//To get sunrise/sunset time in hours:minutes:seconds
let sunrise = new Date(unixTimestampSunrise * 1000)
let sunset = new Date(unixTimestampSunset * 1000)

//Declare new variable to show only hh:mm
let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

/*sunriseInfo.innerHTML = `<h2>Sunrise at: ${`${json.sys.sunrise}:${json.sys.sunrise}`}</h2>`

 sunsetInfo.innerHTML = `<h2>Sunset at: ${`${json.sys.sunset}:${json.sys.sunset}`}</h2>`


/*const unixTimestamp = 1572261986

const unixTimestamp2 = 1572302548

let sunrise = new Date(unixTimestamp * 1000)

let sunset = new Date(unixTimestamp2 * 1000)

/*console.log(`${sunrise.getHours()}:${sunrise.getMinutes()}`)*/
  })

})