
/********CITY & TODAYS FORECAST*******/

const todayContainer = document.getElementById('todaysinfo')
const sunriseContainer = document.getElementById('sunriseinfo')
const sunsetContainer = document.getElementById('sunsetinfo')


let usaTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
usaTime = new Date(usaTime);
console.log('USA time: '+usaTime.toLocaleString())

fetch('http://api.openweathermap.org/data/2.5/weather?q=Miami,%20USA,3166-2US-FLL&units=metric&APPID=804400298ac4f45795306a8ea7ab8f5e')
.then((response) => {
  return response.json()
})
.then((json) => {
  todaysinfo.innerHTML = 
    `<h1>${json.main.temp.toFixed(1)}°</h1> 
    <h2>${json.name}</h2> 
    <h2>${json.weather[0].description} </h2>`
  
  console.log(json)

/*************SUNRISE & SUNSET **********/

//Declare variable for the time of sunrise/sunset
const unixTimestampSunrise = json.sys.sunrise
const unixTimestampSunset = json.sys.sunset

//To get sunrise/sunset time in hours:minutes:seconds
let sunrise = new Date ((unixTimestampSunrise + json.timezone) * 1000);
let sunset = new Date ((unixTimestampSunset + json.timezone) * 1000);

//Declare new variable to show only hh:mm
let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

sunsetContainer.innerHTML = `<h2> Sunset: ${sunsetTime} </h2>`
sunriseContainer.innerHTML = `<h2> Sunrise: ${sunriseTime} </h2>`
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
  wednesdayBox.innerHTML= `<h3>Wednesday: min:${json.list[15].main.temp_min.toFixed(1)}° - max:${json.list[18].main.temp_max.toFixed(1)}° with ${json.list[18].weather[0].description}</h3>`
  thursdayBox.innerHTML=`<h3>Thursday: min ${json.list[23].main.temp_min.toFixed(1)}°| max ${json.list[26].main.temp_max.toFixed(1)}° with ${json.list[26].weather[0].description}</h3>`
  fridayBox.innerHTML= `<h3>Friday min:${json.list[31].main.temp_min.toFixed(1)}° - max:${json.list[34].main.temp_max.toFixed(1)}° with ${json.list[34].weather[0].description}</h3>`
  saturdayBox.innerHTML= `<h3>Saturday min:${json.list[39].main.temp_min.toFixed(1)}° - max:${json.list[38].main.temp_max.toFixed(1)}° with ${json.list[38].weather[0].description}</h3>`
  

   console.log(json)

})


 /*const sunrise = new Date(json.sys.sunrise * 1000) 
const sunset = new Date(json.sys.sunset * 1000) */

/*const sunriseTime = sunrise.toLocaleTimeString('en-US', { timeStyle: 'short' }) 
const sunsetTime = sunset.toLocaleTimeString('en-US', { timeStyle: 'short' })*/

//To get sunrise/sunset time in hours:minutes:seconds
/*let sunrise = new Date (unixTimestampSunrise * 1000);

let sunset = new Date (unixTimestampSunset * 1000);*/