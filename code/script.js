const container = document.getElementById('today')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Gotenburg&units=metric&appid=3b69213b480a303abeec34f0262802f0')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    json.main.temp = Math.round(json.main.temp)
    container.innerHTML = `<h2>${json.main.temp}&degC</h2>`

    // IMG-COLOR CHANGE WITH WARMER TEMP
    if (json.main.temp > 6) {
      document.getElementById("gbg-image").style.backgroundImage = 'linear-gradient(to bottom, rgba(143, 249, 185, 0.52), rgba(244, 244, 247, 0.73)), url("gbg-img.jpg")';
    } else if (json.main.temp > 16) {
      document.getElementById("gbg-image").style.backgroundImage = 'linear-gradient(to bottom, rgba(249, 190, 130, 0.52), rgba(244, 244, 247, 0.73)), url("gbg-img.jpg")';
    } else if (json.main.temp > 22) {
      document.getElementById("gbg-image").style.backgroundImage = 'linear-gradient(to bottom, rgba(241, 69, 41, 0.28), rgba(244, 244, 247, 0.73)), url("gbg-img.jpg")';
    }
    // DESCRIPTION AND ICON
    json.weather.forEach((now) => {
      container.innerHTML += `<p>${now.description} </p>
      <img src=https://openweathermap.org/img/wn/${now.icon}@2x.png></img>`
      //SUNRISE; SUNSET
      let rise = new Date(json.sys.sunrise * 1000);
      let up = rise.toLocaleTimeString([], {
        timeStyle: 'short'
      })
      let set = new Date(json.sys.sunset * 1000);
      let down = set.toLocaleTimeString([], {
        timeStyle: 'short'
      })
      container.innerHTML += `<p>Sunrise: ${up} - Sunset: ${down}</p>`
    })
  })

//FORECAST

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Gothenburg&units=metric&appid=3b69213b480a303abeec34f0262802f0')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    filteredForecast.forEach((weekday) => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      let day = new Date(weekday.dt * 1000).getDay()
      weekday.main.temp = Math.round(weekday.main.temp)
      document.getElementById('forecast-weekday').innerHTML += `<p>${days[day]}</p>`
      document.getElementById('forecast-temp').innerHTML += `<p>${weekday.main.temp}&degC</p>`
      document.getElementById('forecast-description').innerHTML += `<p>${weekday.weather[0].description}</p>`
      document.getElementById('forecast-icon').innerHTML += `<img src=https://openweathermap.org/img/wn/${weekday.weather[0].icon}@2x.png></img>`
    })
  })

  .catch((err) => {
    console.log(`caughterror`, err)
  })