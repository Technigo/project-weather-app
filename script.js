//Weather Today in Stockholm

const apiToday = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e33f1cc192401277e601a6aed3a82800'
const apiKey = "e33f1cc192401277e601a6aed3a82800"
const weatherLocation = document.getElementById('location');
const weatherDescription = document.getElementById('description');
const weatherTemperature = document.getElementById('temperature');

fetch(apiToday)
  .then((response) => {
    return response.json();
    })
  .then((json) => {
    weatherToday(json)
  })

const weatherToday = (json) => {
weatherLocation.innerHTML = json.name;
weatherDescription.innerHTML = json.weather[0].description
weatherTemperature.innerHTML = json.main.temp.toFixed(0.5)
}
