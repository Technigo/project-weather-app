const summary = document.getElementById("summary");
const main = document.getElementById("main");
const forecast = document.getElementById("forecast");

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=a8803210b888f640e92f889b4be6e93f')
    .then((response) => {
    return response.json()
    })

    .then((json) => {
    console.log(json) // remove later

    // API sunrise and sunset times are given as UNIX time: the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970
    let sunrise = new Date(json.sys.sunrise * 1000); //multiply by 1000 to get milliseconds, as Unix timestamp in in seconds while JS Date() uses milliseconds
    let sunset = new Date(json.sys.sunset * 1000);
    
    summary.innerHTML = `
        <h1>${json.name}</h1>
        ${json.weather[0].description} |
        ${Math.round(json.main.temp)}°C 
        <p>sunrise ${sunrise.getHours()}:${sunrise.getMinutes()}</p>
        <p>sunset ${sunset.getHours()}:${sunset.getMinutes()} </p>
        ` 
    })
 
    //<p>${new Date()}</p>  Gives current date normally
    //<p>${Date.now()}</p>  Gives current date in milliseconds

    