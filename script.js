const container = document.getElementById("weather")
const tempContainer = document.getElementById("temp")
const sunriseContainer = document.getElementById("sunrise")
const sunsetContainer = document.getElementById("sunset")

const container2 = document.getElementById("days")
fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f4893e301384d5deeafa555ccaa61aaa")
.then((response) => {
return response.json()
})
.then((json) => {
    console.log(json)
  container.innerHTML = `<h1> ${json.name} </h1>` 
  tempContainer.innerHTML = `<p>${json.main.temp.toFixed(1)} &#176;</p><p>${json.weather[0].description}</p>`
  
  
  const unixTimestampSunrise = json.sys.sunrise
  let sunrise = new Date(unixTimestampSunrise * 1000)
  let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
  

  const unixTimestampSunset = json.sys.sunset
  let sunset = new Date(unixTimestampSunset * 1000)
  let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })
  sunriseContainer.innerHTML = `<p>Sunrise ${sunriseTime} </p>`
  sunsetContainer.innerHTML = `<p>Sunset ${sunsetTime} </p>`
 
})

fetch("http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=f4893e301384d5deeafa555ccaa61aaa")
.then((response) => {
return response.json()
})
.then((json) =>{
  console.log(json)
  container2.innerHTML = `<p>Wed: ${json.list[8].main.temp.toFixed(1)} &#176; ${json.list[8].weather[0].description}</p> <p> Thu: ${json.list[16].main.temp.toFixed(1)} &#176; ${json.list[16
  ].weather[0].description}</p> <p> Fri: ${json.list[24].main.temp.toFixed(1)} &#176; ${json.list[24].weather[0].description}</p> <p> Sat: ${json.list[32].main.temp.toFixed(1)} &#176; ${json.list[32].weather[0].description}</p>` 
  
})


