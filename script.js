//Removed weatherContainer, didnt need it (EGA)
//Removed topContainer, didnt need it (EGA)
//Removed weatherForecast, didnt need it, the thing belov is what we need to show on app (EGA)
const todaysDate = document.getElementById('todaysDate')
const city = document.getElementById('city')
const temperature = document.getElementById('temperature')
const condition = document.getElementById('condition')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')


// This is the API key for OpenWeatherMap.org - Stockholm (YK)
// From Live-session: STEP 1/fetch "I have a present for you to fetch" (YK)
//.then = STEP 2 "I'm giving you the present but you don't know what's inside yet" (YK)
//.then = STEP 3 "I'm giving you the present so now you can take a look what's inside it" (YK)
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=bcc357d81ce23673e3a8e92322d840f2')
    //.then = Step 2 "I'm giving you the present but you don't know what's inside yet" (YK)
    .then((response) => {
        return response.json()
    })
    //.then = Step 3 "I'm giving you the present so now you can take a look what's inside it" (YK)
    .then((json) => {
        city.innerHTML = `<h1>This is the weather in ${json.name}</h1>`
        console.log(json) //Works this far, object loading on to console log. (EGA)

        //Added the temperature with some help from another students code (EGA)
        temperature.innerHTML = `<h3>The temperature is ${
            Math.round(json.main.temp * 10) / 10
          }°C in ${json.name}</h3>`;

        condition.innerHTML = `<h2>The weather is ${json.weather[0].description}</h2>`;
       
    })
    