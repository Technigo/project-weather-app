const city = document.getElementById('city')
const temp = document.getElementById('temp')
const description = document.getElementById('description')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=60032cdd91d77852bfb39762c09118fe')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    city.innerHTML = json.name

    temp.innerHTML = `${json.main.temp.toFixed(1)} °`

    description.innerHTML = json.weather[0].description
  })