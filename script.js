//////////////////////// DOM SELECTION /////////////////////////////

const forcastRightNow = document.getElementById('forcastRightNow')
const casualWeatherbox = document.getElementById('casualWeatherbox')
const weekdays = document.getElementById('weekdays')

/////////////////////// CALLING THE API /////////////////////////////

    // Calling the Url.

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=efd0845f5916e3c871d91fde63e9b949')

    // Saying we want the response in json

    .then((response) => {
        return response.json()
    })

    // Then we start using the material we need from the API and gets it with the ${materialweneed}
    // First of is the forcastRightNow-part

    /////////////////////// THIS IS THE WEATHER AT THE TOP/////////////////////////////

    .then((json) => {

    const sunriseTimeStamp = (json.sys.sunrise * 1000)
    const sunriseFormat = new Date(sunriseTimeStamp)
    const sunrise = sunriseFormat.getHours() + ":" + sunriseFormat.getMinutes();

    const sunsetTimeStamp = (json.sys.sunset * 1000)
    const sunsetFormat = new Date(sunsetTimeStamp)
    const sunset = sunsetFormat.getHours() + ":" + sunsetFormat.getMinutes();

    forcastRightNow.innerHTML = 
    `<h6>
    ${json.weather[0].main} |
    ${(Math.round(json.main.temp))}°C<br>
    Sunrise ${sunrise}<br>
    Sunset ${sunset}
    </h6>`

/////////////////////// WEATHERBOX (MESSAGE AND PICTURE = CASUAL WEATHER CENTENSE) /////////////////////////////

     casualWeatherBox.innerHTML = 
     `<h1>
     In ${json.name} there is ${json.weather[0].description} right now. 
     Wind is ${(Math.round(json.wind.speed))} m/s and the temperature is ${(Math.round(json.main.temp))}°C.
     </h1>`

    })

///////////////////////// WEEKDAYS //////////////////////////////////////////

    // And here we start with fetching the weekly forecast
    // you'll see that we only care about the array called list.

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=cc0aa000ffd02ae8117bc95ff6ed2d28')

    // Saying we want the weekly response in json

    .then((response) => {
        return response.json()
    })

    .then((json) => {

// This part makes the json show the temperature from 12:00 each day
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)
    filteredForecast.forEach((fiveDayForecast) => {
        weekdays.innerHTML += `
        <h3><span class='left'>${fiveDayForecast.dt_txt}</span><span class='right'>${(Math.round(fiveDayForecast.main.temp))}°C</span><hr></h3>`
    })
})