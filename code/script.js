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
            <h1>${json.list[0].main.temp.toFixed(0)}</h1>
        </div>
        <div class="info-sky" id="infoSky">
            <p>${json.list[0].weather[0].description}</p>
            <img class="weather-icon" id="weatherIcon" src="http://openweathermap.org/img/wn/${json.list[0].weather[0].icon}.png" alt="weather-icon">
        </div>
        <div class="info-city" id="infoCity">
            ${json.city.name}
        </div> 
        <div class="info-sun-position" id="infoSunPosition">
            <p class="text">sunrise ${sunriseTime.getHours()}:${sunriseTime.getMinutes()}</p>
            <p class="text">sunset ${sunsetTime.getHours()}:${sunsetTime.getMinutes()}</p>
        </div>
        
        `
        let myDate = json.list.dt_txt
        const dayName = new Date (myDate * 1000)
        const getDayName = (dayNumber) => {
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            return dayNames[dayNumber];
        }
        let filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));
        filteredForecast.forEach(forecasteWeek => {
            forecastWrapper.innerHTML += `
            <div class="forecast-row">
            <div class="for-day-temp"> ${getDayName(dayName.getDay())}</div>
            <img class="weather-icon" id="weatherIcon" src="http://openweathermap.org/img/wn/${json.list[0].weather[0].icon}.png" alt="weather-icon">
            <div class="for-day-temp"> ${forecasteWeek.main.temp_max.toFixed(0)} / ${forecasteWeek.main.temp_min.toFixed(0)}˚c</div>
            </div>
            `
        })
    })
.catch((err) => {
    console.log('caught error', err)
});
