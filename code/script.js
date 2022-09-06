const summary = document.getElementById("summary");
const main = document.getElementById("main");
const forecast = document.getElementById("forecast");


fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=a8803210b888f640e92f889b4be6e93f')
    .then((response) => {
    return response.json()
    })

    .then((json) => {
    console.log(json)
    summary.innerHTML = `<h1>${json.name}</h1>
    ${json.weather[0].description}
    ${Math.round(json.main.temp)}°C` 
    })