
/********CITY & TODAYS FORECAST*******/

const container = document.getElementById('todaysinfo')
const sunriseContainer = document.getElementById('sunriseinfo')
const sunsetContainer = document.getElementById('sunsetinfo')


fetch('http://api.openweathermap.org/data/2.5/weather?q=Miami,%20USA,3166-2US-FLL&units=metric&APPID=804400298ac4f45795306a8ea7ab8f5e')
.then((response) => {
  return response.json()
})
.then((json) => {
  todaysinfo.innerHTML = 
  `<h1>${json.name}</h1> 
  <h2>${json.main.temp.toFixed(1)} Celcius</h2> 
  <h2>${json.weather[0].description} </h2>`
  
  console.log(json)

/*************SUNRISE & SUNSET **********/

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


/*******FORECAST 4 DAYS ********/

const wednesdayBox = document.getElementById('wednesdayContainer')
const thursdayBox = document.getElementById('thursdayContainer')
const fridayBox = document.getElementById('fridayContainer')
const saturdayBox = document.getElementById('saturdayContainer')

fetch('http://api.openweathermap.org/data/2.5/forecast?q=Miami,%20USA&units=metric&APPID=c4ff459e6977fcdff3cc5fa6319866b6')
.then((response) => {
  return response.json()
})
.then((json) => {
  wednesdayBox.innerHTML= `<p>Wednesday min:${json.list[15].main.temp_min.toFixed(1)}° - max:${json.list[18].main.temp_max.toFixed(1)}° with ${json.list[18].weather[0].description}</p>`
  thursdayBox.innerHTML=`<p>Thursday min:${json.list[23].main.temp_min.toFixed(1)}° - max:${json.list[26].main.temp_max.toFixed(1)}° with ${json.list[26].weather[0].description}</p>`
  fridayBox.innerHTML= `<p>Friday min:${json.list[31].main.temp_min.toFixed(1)}° - max:${json.list[34].main.temp_max.toFixed(1)}° with ${json.list[34].weather[0].description}</p>`
  saturdayBox.innerHTML= `<p>Saturday min:${json.list[39].main.temp_min.toFixed(1)}° - max:${json.list[38].main.temp_max.toFixed(1)}° with ${json.list[38].weather[0].description}</p>`
  

   console.log(json)

})
