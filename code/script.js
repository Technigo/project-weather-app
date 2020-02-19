

const container = document.getElementById(`weatherapi`)
const containerDayCast=document.getElementById(`day-forecast`)
const containerIconCast=document.getElementById(`icon-forecast`)
const containerDescriptionCast=document.getElementById(`description-forecast`)
const containerTempCast=document.getElementById(`temp-forecast`)


fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=c3c53989f6119fa7482844c2c10c32ce`)
.then((response) =>{
return response.json()
})
.then((json) => {
const unixTimestampSunrise = json.city.sunrise
const unixTimestampSunset = json.city.sunset
const sunrise = new Date(unixTimestampSunrise * 1000)
const sunset = new Date(unixTimestampSunset * 1000)
const sunriseTime = sunrise.toLocaleTimeString([], {timeStyle: 'short'
  })
console.log(sunriseTime)
const sunsetTime = sunset.toLocaleTimeString([], {timeStyle: 'short'
  })
// Main Weather
container.innerHTML=`<p><h1>${json.list[0].main.temp.toFixed(1)}<span style='font-size:10px;'>&#8451;</span> </h1><br>
 <h3>${json.city.name}<br>
 Sunrise: ${sunriseTime} Sunset: ${sunsetTime}</h3></p>`

 // FILTER
const filteredForecast = json.list.filter(day => day.dt_txt.includes('12:00'));
filteredForecast.forEach(day => {
const date = new Date(day.dt * 1000)
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dayOfWeek = weekdays[date.getDay()];
containerDayCast.innerHTML += `<p> ${dayOfWeek}</p>`
containerIconCast.innerHTML+= `<p>${day.weather[0].icon}</p>`
containerDescriptionCast.innerHTML+=`<p> ${day.weather[0].description} </p>`
containerTempCast.innerHTML+= `<p>${day.main.temp.toFixed(1)} °C </p>`


console.log(filteredForecast)
  })
})

.catch((err) => {
console.log(`caught error`,err)
})


