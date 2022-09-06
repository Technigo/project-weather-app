/* const infoTemp = document.getElementById('infoTemp');
const infoCity = document.getElementById('infoCity');
const infoSky = document.getElementById('infoSky');
const infoSunPosition = document.getElementById('infoSunPosition');
 */
const infoWrapper = document.getElementById('infoWrapper');
const forecastWrapper = document.getElementById('forecastWrapper')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=9fcd313d36f7f6461ce56606e7e35c9c')
.then((response) => {
    return response.json() 
})
.then((json) => {
    console.log(json)
    infoWrapper.innerHTML += `
    <div class="info-temp" id="infoTemp">${json.main.temp.toFixed(0)}</div> 
    <div class="info-city" id="infoCity">${json.name}</div> 
    <div class="info-sky" id="infoSky">${json.weather[0].description}</div>
    <div class="info-sun-position" id="infoSunPosition">${json.sys.sunrise}</div>
    ` // DAVID - Behöver ändra till klockslag 
})
.catch((err) => {
    console.log('caught error', err)
});

console.log('test')
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

