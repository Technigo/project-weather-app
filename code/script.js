
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lulea,Sweden&units=metric&APPID=c3c53989f6119fa7482844c2c10c32ce`
const forecastUrl= `https://api.openweathermap.org/data/2.5/forecast?q=Lulea,Sweden&units=metric&APPID=c3c53989f6119fa7482844c2c10c32ce`
const container = document.getElementById(`weatherapi`)
const containerDayCast=document.getElementById(`day-forecast`)
const containerIconCast=document.getElementById(`icon-forecast`)
const containerDescriptionCast=document.getElementById(`description-forecast`) //lang=se
const containerTempCast=document.getElementById(`temp-forecast`)


// Today weather - From WEATHER API 
fetch(weatherUrl)
.then((response) =>{
  return response.json()
})
.then ((json)  => {
const unixTimestampSunrise = json.sys.sunrise
const unixTimestampSunset = json.sys.sunset
const sunrise = new Date(unixTimestampSunrise * 1000)
const sunset = new Date(unixTimestampSunset * 1000)
const sunriseTime = sunrise.toLocaleTimeString([], {timeStyle: 'short'
  })
  const sunsetTime = sunset.toLocaleTimeString([], {timeStyle: 'short'
}) 
container.innerHTML= `<p class="maintemp"> ${json.main.temp.toFixed(1)}°C <br>
<p class="cityname">${json.name}</p><p class="citytemp">${json.weather[0].description}
<p class = "sunrise-set">Sunrise: ${sunriseTime} Sunset: ${sunsetTime}</p>`

})


// From forecats API 
fetch(forecastUrl)
.then((response) =>{
return response.json()
})
.then((json) => {

 // FILTER
const filteredForecast = json.list.filter(day => day.dt_txt.includes('12:00'));
filteredForecast.forEach((day) => {
const date = new Date(day.dt*1000)
let dayinWeek = date.toLocaleDateString('en',{weekday: 'short'})
const dayOfWeek = dayinWeek.toUpperCase()
containerDayCast.innerHTML += `<p> ${dayOfWeek}</p>`
//ICON
console.log(day.weather[0].icon)
const icon = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`;
console.log(`icon img?${icon}`)
containerIconCast.innerHTML += `<p><img src=${icon}></p>`
containerDescriptionCast.innerHTML+=`<p> ${day.weather[0].description} </p>`
containerTempCast.innerHTML+= `<p>${day.main.temp.toFixed(1)} °C </p>`
console.log(filteredForecast)

if (day.main.temp < 3) {
  container.classList.toggle ("cold")
} else if (day.main.temp < 6 <10) {
  container.classList.toggle ("warmish")
}else if (day.main.temp < 10<15) {
  container.classList.toggle ("hot")
} else {
  container.classList.toggle ("fire")
}
console.log(day.main.temp)
  })
})


.catch((err) => {
console.log(`caught error`,err)
})


