const container = document.getElementById('main-container')
const city = document.getElementById('city')



fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d5df19d6f5f0e0c58e9f1a6d07022e47")
.then((response) => {
    return response.json()
})
.then((json) => {
    container.innerHTML = `<p>${Math.round(json.main.temp * 10)/10}</p>`
    city.innerHTML += `<p>${json.name}<p>`
    container.innerHTML += `<p>${json.weather[0].description}</p>`
})

