

const container = document.getElementById(`weatherapi`)
const containerForecast=document.getElementById(`weekreport`)


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
const sunsetTime = sunset.toLocaleTimeString([], {timeStyle: 'short'
  })
// Main Weather
container.innerHTML=`<p><h1>${json.list[0].main.temp}<span style='font-size:10px;'>&#8451;</span> </h1><br>
 <h3>${json.city.name}<br>
 Sunrise: ${sunriseTime} Sunset: ${sunsetTime}</h3></p>`

 // FILTER
const filteredForecast = json.list.filter(day => day.dt_txt.includes('12:00'));
filteredForecast.forEach(day => {
const date = new Date(day.dt * 1000)
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dayOfWeek = weekdays[date.getDay()];
containerForecast.innerHTML += `<p class = "weekimg"> ${dayOfWeek} ${day.weather[0].icon} ${day.weather[0].description} ${day.main.temp.toFixed(0)} °C </p>`
console.log(filteredForecast)
  })
})
.catch((err) => {
console.log(`caught error`,err)
})



/* Body swapping
 // ICON
 if( json.weather[0].description.includes('rain') > 0 ) {
    document.className = 'rainy';
} else if( json.weather[0].description.includes('clouds') > 0 ) {
    document.className = 'cloudy';
} else if( json.weather[0].description.includes('sunny') > 0 ) {
    document.body.className = 'sunny';
}
*/