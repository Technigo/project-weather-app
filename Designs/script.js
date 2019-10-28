const container = document.getElementById("weather")

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b913ce9c82eec1ad0ab3597f17f5d5db')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    container.innerHTML = `<h1>The weather in ${json.name} right now</h1>`
    const temp = json.main.temp
    const tempOneDec = temp.toFixed(0.1)
    container.innerHTML += `<p>Temperature: ${tempOneDec} °C</p>`
    container.innerHTML += `Today it's: ${json.weather[0].description}`
  })
  
