fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8e3b288ccb7e41d96fd2f44603191864")
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const unixTimestampSunrise = json.sys.sunrise
    const unixTimestampSunset = json.sys.sunset

    const sunrise = new Date(unixTimestampSunrise * 1000)
    const sunset = new Date(unixTimestampSunset * 1000)

    const sunriseTime = sunrise.toLocaleTimeString([], {
      timeStyle: 'short'
    })
    const sunsetTime = sunset.toLocaleTimeString([], {
      timeStyle: 'short'
    })
    const longTemp = json.main.temp
    const shortTemp = longTemp.toFixed(1);

    // Changing color of the city depending on description
    if (json.weather[0].description.includes('clear')) {
      document.getElementById("rubrik").style.color = "white";
    } else {
      document.getElementById("rubrik").style.color = "orange";
    }

    // Changing color of a container depending on temperature
    let tempContainer = document.getElementById("todayWeather")

    if (shortTemp < -5) {
      tempContainer.classList.toggle("cold")
    } else if (shortTemp > 25) {
      tempContainer.classList.toggle("warm")
    } else {
      tempContainer.classList.toggle("ok")
    }

    // Changing the dom
    document.getElementById("description").innerHTML = `${json.weather[0].description}`
    document.getElementById("todayTemp").innerHTML = `${shortTemp}˚`
    document.getElementById("currentCondition").innerHTML += `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="" />`
    document.getElementById("sr").innerHTML = `${sunriseTime}`
    document.getElementById("ss").innerHTML = `${sunsetTime}`
    //console.log(`${json.main.temp_min}`)
    //console.log(`${json.main.temp_max}`)
  })


fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8e3b288ccb7e41d96fd2f44603191864")
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    //console.log(filteredForecast)

    const containerFiveDays = document.getElementById("weekWeather")

    filteredForecast.forEach((day) => {
      const date = new Date(day.dt_txt);
      //console.log(date);

      const dayName = date.toLocaleDateString('en-US', {
        weekday: 'long'
      });
      //console.log(`${dayName}`)
      //console.log(`${day.main.temp.toFixed(1)}`)
      containerFiveDays.innerHTML += `<div class="dayRow"><div class="dayLabel">${dayName}</div> <div class="dayTemp">${day.main.temp.toFixed(1)} °C <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" class="dayIcon" /></div></div>`

      //console.log(`<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />`)
    })
  })
/* containerFiveDays.innerHTML = "";
 filteredForecast.forEach(day => {
   const date = new Date(day.dt * 1000)
   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   let dayOfWeek = weekdays[date.getDay()];
   containerFiveDays.innerHTML += `<div class="dayRow"><div class="dayLabel">${dayOfWeek}</div> <div class="dayTemp">${day.main.temp.toFixed(1)} °C </div></div>`
   })
  //console.log(containerFiveDays)*/

/*filteredForecast.forEach(item => {
  console.log(item.weather[0].description)
  console.log(item.main.temp)
  console.log(item.main.temp)
  console.log(item.main.temp_min)
  console.log(item.main.temp_max)
})
*/