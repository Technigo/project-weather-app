const container = document.getElementById('weather')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=10c15495461885dfddf7c2f3846d4e30')
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    console.log(json)
  })



