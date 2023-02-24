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

    const sunriseTimeStamp = (json.sys.sunrise * 1000);
    const sunriseFormat = new Date(sunriseTimeStamp);
    const sunriseHours = sunriseFormat.getHours().toString().padStart(2, '0');
    const sunriseMinutes = sunriseFormat.getMinutes().toString().padStart(2, '0');
    const sunrise = sunriseHours + ":" + sunriseMinutes;

    const sunsetTimeStamp = (json.sys.sunset * 1000);
    const sunsetFormat = new Date(sunsetTimeStamp);
    const sunsetHours = sunsetFormat.getHours().toString().padStart(2, '0');
    const sunsetMinutes = sunsetFormat.getMinutes().toString().padStart(2, '0');
    const sunset = sunsetHours + ":" + sunsetMinutes;

    forcastRightNow.innerHTML = 
    `<h6>
    ${json.name}<br>
    <p>
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
    
    const todaysWeather = 'Clear'
    const changeWeather = (todaysWeather) => {

    if (todaysWeather === 'Clear') {

        document.body.style.backgroundColor = "LightBlue";
        casualWeatherBox.innerHTML =
        `<img src="./Designs/Design-2/icons/wi-day-sunny.svg" width="50px" height="50px"><br>
         <p style="color: Black;">Bring your shades. ${json.name} gives you ${(Math.round(json.main.temp))}°C and sun today.
         </p>`;
     }

    else if (todaysWeather === 'Clouds') {

        document.body.style.backgroundColor = "Orange";
        casualWeatherBox.innerHTML =
        `<img src="./Designs/Design-2/icons/wi-cloud.svg" width="50px" height="50px"><br> 
         <p style="color: Black;">Perfect day for doing the laundry. ${json.name} is grey today.
         </p>`;
    }

    else if (todaysWeather === 'Broken Clouds') {

        document.body.style.backgroundColor = "LightGrey";
        casualWeatherBox.innerHTML =
        `<img src="./Designs/Design-2/icons/wi-night-cloudy-high.svg" width="50px" height="50px"><br> 
         <p style="color: Black;">Perfect day for doing the laundry. ${json.name} is grey today.
         </p>`;
    }

    else if (todaysWeather === 'Rain') {

        document.body.style.backgroundColor = "LightGreen";
        casualWeatherBox.innerHTML =
        `<img src="./Designs/Design-2/icons/wi-rain.svg" width="50px" height="50px"><br> 
         <p>Don't forget your umbrella. It's raining in ${json.name} today..
         </p>`;
    }

    else if (todaysWeather === 'Snow') {

        document.body.style.backgroundColor = "LightYellow";
        casualWeatherBox.innerHTML =
        `<img src="./Designs/Design-2/icons/wi-snow.svg" width="50px" height="50px"><br> 
         <p>Bring your skis. It's snowing in ${json.name} today.
         </p>`;
    }

    else if (todaysWeather === 'Mist') {

        document.body.style.backgroundColor = "LightPink";
        casualWeatherBox.innerHTML =
        `<img src="./Designs/Design-2/icons/wi-fog.svg" width="50px" height="50px"><br> 
         <p>You can leave the binoculars at home. Theres mist in ${json.name} today.
         </p>`;
    }

    else {

        document.body.style.backgroundColor = "LightBrown";
        casualWeatherBox.innerHTML =
        `<img src="./Designs/Design-2/icons/wi-night-alt-cloudy-high.svg" width="50px" height="50px"><br>
        <p>Open that book you got for christmas. ${json.name} is not shining today and the wind is ${(Math.round(json.wind.speed))} m/s
        </p>`;

     }
}
changeWeather(todaysWeather)
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

    //get correct format for day 
    const dateFilteredForecast = new Date(fiveDayForecast.dt_txt)
    console.log(dateFilteredForecast)

    const options = { weekday: "long" };
    const weekdayFilteredForecast = new Intl.DateTimeFormat("en-UK", options).format(dateFilteredForecast)
    console.log(weekdayFilteredForecast)

    //print days & forecast 
    weekdays.innerHTML += 
    `<h3>
    <span class='left'>${weekdayFilteredForecast}</span>
    <span class='center'>${(filteredForecast[0].weather)[0].description}</span> 
    <span class='right'>${(Math.round(fiveDayForecast.main.temp))}°C</span>

    <hr>
    </h3>`
    })
})
