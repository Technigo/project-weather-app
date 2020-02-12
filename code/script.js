const city = document.querySelector('#city')
const temperature = document.querySelector('#temperature')
const description = document.querySelector('#description')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=302165d90858a8a500d4198d9bc63d2b')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    city.innerHTML = json.name
    description.innerHTML = json.weather[0].description
    temperature.innerHTML = json.main.temp.toFixed(1)
  })
  .catch((err) => {
    console.log("oops error", err)
  })