const container = document.getElementById('weatherApp')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Majorna,Sweden&units=metric&APPID=150f4ff6ea1bf24cf1f0e1bdecefa90f')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    container.innerHTML = `<h1>Todays weather in: ${json.name}</h1>`

    const temp = json.main.temp
    const tempRounded = temp.toFixed(0.1)

    json.weather.forEach((today) => {
      container.innerHTML += `<p>${tempRounded}°C ${today.description}</p>`
    })
  })
