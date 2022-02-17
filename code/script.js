
const stockholmUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=59.33&lon=18.06&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d'
const bangkokUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=13.73&lon=100.31&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d'
const seattleUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=47.60&lon=-122.33&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d'
const torontoUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=43.65&lon=-79.34&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d'
const cityOptions= document.getElementById('city')

// populate currentWeather object with data from the current weather API
const formatCurrentWeather = (data) => {

    // create a template of current weather object which updates with data fetched from the api
    let currentWeather = {
        // this is the structure that the object will have once populated:
        condition: 'string',
        temp: '0° C',
        sunrise: '00:00',
        sunset: '00:00',
    }

    currentWeather.condition = data.current.weather[0].main;
    currentWeather.temp = Math.round(data.current.temp) + "° C"; // rounds to nearest integer

    let sunrise = new Date(data.current.sunrise * 1000); // converts unix timestamp to milliseconds
    let sunset = new Date(data.current.sunset * 1000); // converts unix timestamp to milliseconds
    currentWeather.sunrise = sunrise.toLocaleString("en-SE", {hour: "numeric", minute: "numeric", timeZone: data.timezone}) // displays HH:MM in the correct timezone
    currentWeather.sunset = sunset.toLocaleString("en-SE", {hour: "numeric", minute: "numeric", timeZone: data.timezone}) // displays HH:MM in the correct timezone

    // more values can be added here

    return currentWeather;
};

// populate forecast array with data from the current weather API
const formatForecast = (data) => {

    // template of forecast array of objects, will look like this for each day of the week
    // will get updated when data is fetched from api
    let forecast = [ 
        //{
        // start with empty array of objects, will look something like this
        // dayOfWeek: 'string',
        // lowTemp: '0° C',
        // highTemp: '0° C',
        //}
    ];

    let numberToDay = { // getDay() will return integer between 0-6, we'll want english names to replace with
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
    };

    data.daily.forEach((day) => {
        let dailyForecast = {
            dayOfWeek: numberToDay[new Date(day.dt * 1000).getDay()], // converts number to english name
            lowTemp: Math.round(day.temp.min) + "° C", // rounds to nearest integer
            highTemp: Math.round(day.temp.max) + "° C", // rounds to nearest integer
            // more values can be added here
        };
    forecast.push(dailyForecast) // adds object for each day to the forecast array
    });

    return forecast;
};
// I commented this part out for the welcome page to run first. We can discuss if we want to display Stockholm's weather as default.

// fetch(stockholmUrl)
//     .then((result) => {
//         return result.json(); // returns a promise that something will happen
//     })
//     .then((data) => {

//     let currentWeather = formatCurrentWeather(data); // calls function with the data the promise delivers
//     updateCurrentWeatherDisplay(currentWeather); // updates display when data is ready

//     let forecast = formatForecast(data); // calls function with the data the promise delivers
//     updateForecastDisplay(forecast); // updates display when data is ready

//     })
//     .catch((error) => {
//         console.log(error); // shows if something went wrong (ex. API key, json formatted incorrectly, etc)
//     });

/* ------------------------ START FROM HERE ------------------------*/

const currentWeatherCondition = document.getElementById('currentWeatherCondition')
const currentWeatherSunrise = document.getElementById('currentWeatherSunrise')
const currentWeatherSunset = document.getElementById('currentWeatherSunset')
const iconCloud = document.getElementById('iconCloud')
const iconUmbrella = document.getElementById('iconUmbrella')
const iconGlasses = document.getElementById('iconGlasses')
const styleChange = document.getElementsByTagName('body')
const fontColor = document.querySelectorAll('p')
const currentWeatherHeaderWrapper = document.getElementById('currentWeatherHeaderWrapper')
const headerMessage = document.getElementById('currentWeatherHeader')

// this function is called when the data is available 
const updateCurrentWeatherDisplay = (currentWeather) => {
    console.log(currentWeather);// checks to see what it looks like
    // TO-DO use currentWeather object to update values in the html elements
    currentWeatherCondition.innerHTML = `${currentWeather.condition} | ${currentWeather.temp}`
    currentWeatherSunrise.innerHTML = `sunrise ${currentWeather.sunrise}`
    currentWeatherSunset.innerHTML = `sunset ${currentWeather.sunset}`

    if (currentWeather.condition === 'Clouds') {
        iconCloud.style.display = 'block'
        iconUmbrella.style.display = 'none'
        document.body.style.backgroundColor = "#F4F7F8"
        currentWeatherCondition.style.color = "#F47775"
        currentWeatherSunrise.style.color = "#F47775"
        currentWeatherSunset.style.color = "#F47775"
        currentWeatherHeader.style.color =  "#F47775"
        headerMessage.innerText = "It's cloudy"
    } else if (currentWeather.condition === 'Rain') {
        iconCloud.style.display = 'none'
        iconUmbrella.style.display = 'block'
        document.body.style.backgroundColor = "#A3DEF7"
        currentWeatherCondition.style.color = "#164A68"
        currentWeatherSunrise.style.color = "#164A68"
        currentWeatherSunset.style.color = "#164A68"
        currentWeatherHeader.style.color =  "#164A68"
        headerMessage.innerText = "Don't forget your umbrella :)"
        
    } else if (currentWeather.condition === 'Clear'){
        iconGlasses.style.display = 'block'
        iconCloud.style.display = 'none'
        iconUmbrella.style.display = 'none'
        headerMessage.innerText = "Time to put on a nice pair of sunglasses!"
    } else {
        console.log("I have no icons left! Hope it doesn't snow!!!")
    }
}



// Cities 

const stockholm = () => {
    fetch(stockholmUrl)
        .then((result) => {
            return result.json(); // returns a promise that something will happen
        })
        .then((data) => {
    
        let currentWeather = formatCurrentWeather(data); // calls function with the data the promise delivers
        updateCurrentWeatherDisplay(currentWeather); // updates display when data is ready
    
        let forecast = formatForecast(data); // calls function with the data the promise delivers
        updateForecastDisplay(forecast); // updates display when data is ready
    
        })
        .catch((error) => {
            console.log(error); // shows if something went wrong (ex. API key, json formatted incorrectly, etc)
        });
    }

const bangkok = () => {
    fetch(bangkokUrl)
    .then((result) => {
        return result.json()
    })
  .then((data) => {

    let currentWeather = formatCurrentWeather(data); // calls function with the data the promise delivers
    updateCurrentWeatherDisplay(currentWeather); // updates display when data is ready

    let forecast = formatForecast(data); // calls function with the data the promise delivers
    updateForecastDisplay(forecast); // updates display when data is ready

    })
}

const seattle= () => {
    fetch(seattleUrl)
    .then((result) => {
        return result.json()
    })
  .then((data) => {

    let currentWeather = formatCurrentWeather(data); // calls function with the data the promise delivers
    updateCurrentWeatherDisplay(currentWeather); // updates display when data is ready

    let forecast = formatForecast(data); // calls function with the data the promise delivers
    updateForecastDisplay(forecast); // updates display when data is ready

    })
}


const toronto= () => {
    fetch(torontoUrl)
    .then((result) => {
        return result.json()
    })
  .then((data) => {

    let currentWeather = formatCurrentWeather(data); // calls function with the data the promise delivers
    updateCurrentWeatherDisplay(currentWeather); // updates display when data is ready

    let forecast = formatForecast(data); // calls function with the data the promise delivers
    updateForecastDisplay(forecast); // updates display when data is ready

    })
}

cityOptions.addEventListener('change', () => { 
    if(cityOptions.value == "bangkok") {
        bangkok()
    } else if (cityOptions.value == "seattle") {
        seattle()
    } else if (cityOptions.value == "toronto"){
       toronto()
    } else {
        stockholm()
    }
} ) 

// this function is called when the data is available 

const forecastWrapper = document.getElementById('forecastWrapper') //Jacob  

const updateForecastDisplay = (forecast) => { //Jacob
    forecast.forEach((day) => {
        forecastWrapper.innerHTML += `
        <div class="forecast-wrapper">
        <div class="row">
            <p>${day.dayOfWeek}</p>
            <p>${day.highTemp}</p>
            </div>
        </div>
    `});
     // checks to see what it looks like
    // TO-DO loop through forecast array to create html elements inside forecastWrapper and populate values
}
