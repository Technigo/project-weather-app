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