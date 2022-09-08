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


//Sarah

  fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=9fcd313d36f7f6461ce56606e7e35c9c')
  //we can use lat & lon here if we want and have time (api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key})
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00', '00:00')); 
            filteredForecast.forEach(forecasteWeek => {
            forecastWrapper.innerHTML += `
            <div class="forecast-days"> ${json.list[0].dt_txt}</div>
            <div class="forecast-temp"> ${forecasteWeek.main.temp.toFixed(0)} ˚c</div>` 
            //something to fix the dates,
            // would be nice to have min and max per day
        }); //https://stackoverflow.com/c/technigo/questions/246 - look here for tips
    });


    //${forecasteWeek.list[0].dt_txt}

// you'll see that we only care about the array called list.

//const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00')) //from notion


    /*  `
    Can we use forEach eller map iställer för detta?
     <div class="monday">
     <p>monday</p>
     <img src="" alt="">
     <p>temperatur</p>
     ` */

