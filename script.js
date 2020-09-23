
const city = document.getElementById("city");
const weatherToday = document.getElementById("weatherToday")
const temperature = document.getElementById("temperature")

const weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1c055fa282f5d9954e97fd78b7cd3c03";


fetch(weatherAPI)
.then((response) => {
    return response.json()
    })
    .then((json) => {
    city.innerHTML += `<p>${json.name}</p>`;
    weatherToday.innerHTML += `<p>${json.weather[0].description}</p>`;
    temperature.innerHTML += `<p>${json.main.temp.toFixed(1)}</p>`;
})
