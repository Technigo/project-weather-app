/* const infoTemp = document.getElementById('infoTemp');
const infoCity = document.getElementById('infoCity');
const infoSky = document.getElementById('infoSky');
const infoSunPosition = document.getElementById('infoSunPosition');
 */
const infoWrapper = document.getElementById('infoWrapper');
const forecastWrapper = document.getElementById('forecastWrapper')
const icon = document.getElementById('data-result-icon')


fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae')
.then((response) => {
    return response.json() 
})
.then((json) => {
    console.log(json)

    let unixSunriseTime = json.city.sunrise
    let unixSunsetTime = json.city.sunset
    const sunriseTime = new Date(unixSunriseTime * 1000)
    const sunsetTime = new Date(unixSunsetTime * 1000)
    
    infoWrapper.innerHTML += `
    <div class="info-temp" id="infoTemp">
        <p>${json.list[0].main.temp.toFixed(0)}°C</p>
    </div>
    <div class="info-city" id="infoCity">
        ${json.city.name}
    </div> 
    <div class="info-sky" id="infoSky">
        <p>${json.list[0].weather[0].description}</p>
        <img class="weather-icon" id="weatherIcon" src="http://openweathermap.org/img/wn/${json.list[0].weather[0].icon}.png" alt="weather-icon">
    </div>
    <div class="info-sun-position" id="infoSunPosition">
        <p>sunrise ${sunriseTime.getHours()}:${sunriseTime.getMinutes()} </p>
        <p>sunset ${sunsetTime.getHours()}:${sunsetTime.getMinutes()}</p>
    </div>
    `
})
.catch((err) => {
    console.log('caught error', err)
});

/* ${icon.src = "http://openweathermap.org/img/wn/${json.list[0].weather[0].icon}.png"  */

//Sarah
//const forecast = () => {
    //fetch
    forecastWrapper.innerHTML += `
     <div class="monday">
     <p>monday</p>
     <img src="" alt="">
     <p>temperatur</p>
     `
 
//}

