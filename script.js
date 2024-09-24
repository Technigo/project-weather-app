
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid='
const API_KEY = '1bd3fe8b6571a9e92c6d24232e62bdc8'

const URL = `${BASE_URL}${API_KEY}`

console.log(URL)

const weatherLocation = document.getElementById("location")
const temperature = document.getElementById("temp")

fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data.list[0].main.temp)

    const stockholm = data.city.name
    const stockholmTemp = data.list[0].main.temp

    weatherLocation.innerText = stockholm
    temperature.innerText = stockholmTemp

  })


