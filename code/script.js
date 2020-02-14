const container = document.getElementById('Gothenburg')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Gotenburg&units=metric&appid=3b69213b480a303abeec34f0262802f0')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    json.main.temp = Math.round(json.main.temp)
    container.innerHTML = `<h2> The temperature is ${json.main.temp}</h2>`
    // console.log(json.main.temp)
    json.weather.forEach((now) => {
      container.innerHTML += `<p>${now.description} </p>`
    })
  })