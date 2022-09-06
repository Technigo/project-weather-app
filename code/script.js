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
    ${Math.round(json.main.temp)}°C
    ` 
    })
 
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=a8803210b888f640e92f889b4be6e93f')
    .then((response) => {
    return response.json()
    })
    
    
    .then((json) => {
    console.log(json)
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('15:00'))
    forecast.innerHTML =
    `
    ${Math.round(filteredForecast[0].main.temp)}°C

    ${Math.round(filteredForecast[1].main.temp)}°C

    ${Math.round(filteredForecast[2].main.temp)}°C

    ${Math.round(filteredForecast[3].main.temp)}°C

    ${Math.round(filteredForecast[4].main.temp)}°C
    
    `
    
    
    })
