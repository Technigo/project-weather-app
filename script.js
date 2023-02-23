//////////////////////// DOM SELECTION //////////////////////////////////////////////////////////////////////////////////////////

    const forcastRightNow = document.getElementById('forcastRightNow')
    const casualWeatherBox = document.getElementById('casualWeatherBox')
    const weekdays = document.getElementById('weekdays')

/////////////////////// CALLING THE API /////////////////////////////

    // Calling the Url.

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=efd0845f5916e3c871d91fde63e9b949')

    // Saying we want the response in json

    .then((response) => {
        return response.json()
 })

/////////////////////// THIS IS THE WEATHER AT THE TOP///////////////////////////////////////////////////////////////////////////

     // First of is the forcastRightNow-part

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

})
/////////////////////// WEATHERBOX (MESSAGE AND PICTURE = CASUAL WEATHER CENTENSE) ////////////////////////////////////////////

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=efd0845f5916e3c871d91fde63e9b949')

    .then((response) => {
        return response.json()
 })

    .then((json) => {
    
    const todaysWeather = json.weather[0].main
    const changeWeather = (todaysWeather) => {

    if (todaysWeather === 'Clear') {

        casualWeatherBox.innerHTML =
        `<img src="./Designs/Design-2/icons/noun_Sunglasses_2.svg" width="30px" height="30px"><br>
         <p>Bring your sunscreen. ${json.name} gives you ${(Math.round(json.main.temp))}°C and sun today.
         </p>`;
     }

    else if (todaysWeather === 'Cloud') {
 
        casualWeatherBox.innerHTML =
 
        `<img src="./Designs/Design-2/icons/noun_Cloud_1188486.svg" width="30px" height="30px"><br> 
         <p>Don't forget your umbrella. It's raining in ${json.name} today..
         </p>`;
    }

    else {
 
        casualWeatherBox.innerHTML =
        `<img src="./Designs/Design-2/icons/noun_Umbrella_2030530.svg" width="30px" height="30px"><br>
        <p>Open that book you got for christmas. ${json.name} is not shining today and the wind is ${(Math.round(json.wind.speed))} m/s
        </p>`;

     }
}
changeWeather()
})

///////////////////////// WEEKDAYS ////////////////////////////////////////////////////////////////////////////////////////////


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
    weekdays.innerHTML += 
    `<h3>
    <span class='left'>${fiveDayForecast.dt_txt}</span>
    <span class='right'>${(Math.round(fiveDayForecast.main.temp))}°C</span>
    <hr>
    </h3>`
    })
})