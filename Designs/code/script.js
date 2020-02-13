const container = document.getElementById('forecast')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=6f2155bea70058c9c702a90730859c85')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    container.innerHTML = `<h2> In ${json.name} the temperature is ${json.main.temp.toFixed(1)} degrees and it is ${json.weather[2]} </h2 > `
  })