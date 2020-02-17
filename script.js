const container = document.getElementById('weather')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=0d132ddb58c8876e79d1539a65dccf8b')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    container.innerHTML = `<h1>${json.name}</h1>`
    json.weather.forEach((weatherInfo) => {
      container.innerHTML += `<p>${weatherInfo.description}</p>`
    })
    let temperature = Math.round(json.main.temp * 10) / 10
    container.innerHTML += `<h1>${temperature}</h1>`

  })


