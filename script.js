const container = document.getElementById('daily')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Umea,se&APPID=30014767311a3c96ba7b2be3dae96ec4')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    container.innerHTML = `<h1>Today's weather in </h1>`
    container.innerHTML += `<h1>${json.name}</h1>`
    container.innerHTML += `<p>${json.weather.description} </p>`
    container.innerHTML += `<p>${json.main.temp} ° ${json.wind.speed} m/s</p>`





  })