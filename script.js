const container = document.getElementById('weather')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=80c5dd84564bfbfbbae5184faea61c48')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    container.innerHTML = `The humidity in Stockholm is ${json.main.humidity}%`
  })