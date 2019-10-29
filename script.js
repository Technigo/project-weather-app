const container = document.getElementById("weather")
const tempContainer = document.getElementById("temp")
const sunriseContainer = document.getElementById("sunrise")
const sunsetContainer = document.getElementById("sunset")
fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f4893e301384d5deeafa555ccaa61aaa")
.then((response) => {
return response.json()
})
.then((json) => {
    console.log(json)
  container.innerHTML = `<h1>Today's weather in ${json.name} </h1>` 
  tempContainer.innerHTML = `<h2> ${json.main.temp.toFixed(1)} &#8451 ${json.weather[0].description}</h2>`
  
  
  const unixTimestampSunrise = json.sys.sunrise
  let sunrise = new Date(unixTimestampSunrise * 1000)
  let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
  sunriseContainer.innerHTML = `<p>Sunrise ${sunriseTime} </p>`

  const unixTimestampSunset = json.sys.sunset
  let sunset = new Date(unixTimestampSunset * 1000)
  let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })
  sunsetContainer.innerHTML = `<p>Sunset ${sunsetTime} </p>`
})


