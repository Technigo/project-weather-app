const container = document.getElementById('Gothenburg')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Gotenburg&units=metric&appid=3b69213b480a303abeec34f0262802f0')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    json.main.temp = Math.round(json.main.temp)
    container.innerHTML = `<h2> The temperature is ${json.main.temp}</h2>`
    // console.log(json.main.temp)
    // DESCRIPTION
    json.weather.forEach((now) => {
      container.innerHTML += `<p>${now.description} </p>`
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
      // expected output: 01:15:30
      // console.log(up)
      // console.log(json.sys.sunset)
      // console.log(set)

    })
  })


//FORECAST

fetch('http://api.openweathermap.org/data/2.5/forecast?q=Gothenburg&units=metric&appid=3b69213b480a303abeec34f0262802f0')
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))


    filteredForecast.forEach((weekday) => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursdagy', 'Friday', 'Saturday']
      let day = new Date(weekday.dt * 1000).getDay()
      weekday.main.temp = Math.round(weekday.main.temp)
      container.innerHTML += `<p>${days[day]}  ${weekday.main.temp}  ${weekday.weather[0].description}</p> 
      <img src=https://openweathermap.org/img/wn/${weekday.weather[0].icon}@2x.png></img>`
      console.log(filteredForecast)
    })
  })


  .catch((err) => {
    console.log(`caughterror`, err)
  })