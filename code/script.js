

// function för forecast/dagens väder , med fetch, sätt variabler, gör till json och inner html etc . function get temperature(temp)
/*const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=c3c53989f6119fa7482844c2c10c32ce`
const forecastUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=c3c53989f6119fa7482844c2c10c32ce`*/
const container = document.getElementById(`weatherapi`)
const containerDayCast=document.getElementById(`day-forecast`)
const containerIconCast=document.getElementById(`icon-forecast`)
const containerDescriptionCast=document.getElementById(`description-forecast`) //lang=se
const containerTempCast=document.getElementById(`temp-forecast`)
const citybuttonLulea = document.getElementById(`citybuttonLulea`)
const citybuttonStockholm = document.getElementById(`citybuttonStockholm`)
let cityDropdown = document.getElementById(`cityDropdown`)
// Today weather - From WEATHER API 
const showWeather = (city) => {
  containerDayCast.innerHTML = "";
  containerIconCast.innerHTML = "";
  containerDescriptionCast.innerHTML = "";
  containerTempCast.innerHTML = "";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=c3c53989f6119fa7482844c2c10c32ce`)
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
  console.log(json.name)
  container.innerHTML = `<p class="maintemp"> ${json.main.temp.toFixed(1)}°C <br>
  <p class="cityname">${json.name}</p><p class="citytemp">${json.weather[0].description}
  <p class = "sunrise-set">Sunrise: ${sunriseTime} Sunset: ${sunsetTime}</p>`
  })
  
  // From forecats API 
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=c3c53989f6119fa7482844c2c10c32ce`)
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
  const icon = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`;
  containerIconCast.innerHTML += `<p><img src=${icon}></p>`
  containerDescriptionCast.innerHTML+=`<p> ${day.weather[0].description} </p>`
  containerTempCast.innerHTML+= `<p>${day.main.temp.toFixed(1)} °C </p>`
  
  
  if (day.main.temp < 4) {
    container.classList.toggle ("cold")
  } else if (day.main.temp < 6 <10) {
    container.classList.toggle ("warmish")
  }else if (day.main.temp < 10<15) {
    container.classList.toggle ("hot")
  } else {
    container.classList.toggle ("fire")
  }
    })
  })
}

 
cityDropdown.addEventListener("change", () => showWeather(cityDropdown.value));

/*
.catch((err) => {
console.log(`caught error`,err)
})
*/


