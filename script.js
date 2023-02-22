//////////////////////// DOM SELECTION /////////////////////////////

const forcastRightNow = document.getElementById('forcastRightNow')
const casualWeatherbox = document.getElementById('casualWeatherbox')
const weekdays = document.getElementById('weekdays')

/////////////////////// CALLING THE API /////////////////////////////

// Calling the Url.
fetch('http://api.openweathermap.org/data/2.5/weather?q=Milan,IT&units=metric&APPID=efd0845f5916e3c871d91fde63e9b949')

// Saying we want the response in json
    .then((response) => {
        return response.json()
    })

// Converting the unix timestamps to date objects
    //const sunrise = new Date(json.sys.sunrise * 1000);
    //const sunset = new Date(json.sys.sunset * 1000);

// Then we start using the material we need from the API and gets it with the ${materialweneed}
// First of is the forcastRightNow-part
    .then((json) => {
        forcastRightNow.innerHTML = 
        `<h6>
        ${json.main.humidity} 
        ${json.main.temp}°C<br>
        sunrise ${json.sys.sunrise}<br>
        sunset ${json.sys.sunset}
        </h6>`

// And here is the casualWeatherBox-part
        casualWeatherBox.innerHTML = 
        `<h1>
        In Milan there is ${json.weather[0].description} right now. 
        Windspeed is ${json.wind.speed} m/s and the temperature is ${(Math.round(json.main.temp))}°C.
        </h1>`

    })

// And here we start with fetching the weekly forecast
