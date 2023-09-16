"use strict";
// does this work?
// DOM selectors ------------------------------------------
// const weatherData = document.getElementById('weather-container');
// for initial test


const weatherDescription = document.getElementById("weather-description");

const mainTemperature = document.getElementById("main-temp");
// QUESTION: maintemperature or currenttemperature?

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const weatherIcon = document.getElementById("weather-icon");
// need to define conditions when to use which symbol. See global variables.



const dailyWeathertips = document.getElementById("daily-tips");

// need to define conditions when to use which sentence. See global variables.

// weather forecast values
// forecastContainer for 5 days
const forecastContainer = document.getElementById("forecast-container");

// [1];
// const forecastDay2 = document.getElementById("day-two").children[0];
// const forecastTem2 = document.getElementById("day-two").children
// [1];
// const forecastDay3 = document.getElementById("day-three").children[0];
// const forecastTem3 = document.getElementById("day-three").children
// [1];
// const forecastDay4 = document.getElementById("day-four").children[0];
// const forecastTem4 = document.getElementById("day-four").children
// [1];
// const forecastDay5 = document.getElementById("day-five").children[0];
// const forecastTem5 = document.getElementById("day-five").children
// [1];

// Global variables ---------------------------------------

// complete link to data: const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=89d1a944a381d671e0d7eca3b8362f21"; 

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "89d1a944a381d671e0d7eca3b8362f21";
const city = "Stockholm,Sweden";

const URL = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`;

// https://api.openweathermap.org/data/2.5/weather?
// holding the weather data object from openweather.com
let weatherObject;

// holding other data for forecast
let forecastURL = "";
let longitude = "";
let latitude = "";
let forecastObject = "";

const pickWeathersymbol = "/design/design2/icons/noun_Umbrella_2030530.svg";
// need to define conditions when to use which symbol

const pickWeathertip = "Dont´t forget your umbrella. It´s wet in Stockholm today.";
// need to define conditions when to use which sentence.
// Get your sunnies on. Stockholm is looking rather great today.
// Light a fire and get cosy. Stockholm is looking grey today.

let kelvinValue = "";
let celsiusValue = "";

// forecastvalues for weekday and temperature, can not be assigned now, because happens inside loop
let forecastDay = "";
let forecastTemp = "";


// Functions -------------------------------------------------


const fetchWeather = () => {
    fetch(URL)
        // gets raw data
        .then(response => response.json())
        // convert  Objekt to string
        .then(data => {
            console.log("weather data:");
            console.log(data);
            weatherObject = data;
            // console.log(weatherObject)
            longitude = weatherObject.coord.lon;
            latitude = weatherObject.coord.lat;
            forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
            console.log(forecastURL);
            setTimeout(() => { fetchForecast() }, 200);
        })
    setTimeout(() => { insertWeatherdata() }, 2000);
};

// import forecast data from other API
const fetchForecast = () => {
    fetch(forecastURL)
        // gets raw data
        .then(response => response.json())
        // convert  Objekt to string
        .then(data => {
            forecastObject = data;
            console.log("forecast data:");
            console.log(forecastObject);
            // console.log(weatherObject) 
            const forecastDataCollection = () => {
                forecastObject.forEach(() => {

                })
            }
        })
}

// 1.st try to retrieve data from api
// const retrieveWeatherdata = ()=>{
//     setTimeout(() => (weatherData.innerHTML =  `<p>${weatherObject.base}</p>`), 500);
// retrieveWeatherdescription();
// }

const insertWeatherdata = () => {
    // weatherDescription.innerHTML = `${weatherObject.weather[0].description}`;
    weatherDescription.innerHTML = weatherObject.weather[0].description;
    mainTemperature.innerHTML = (weatherObject.main.temp + "°C"); //Degrees Celsius
    sunrise.innerHTML = formatTimestamp(weatherObject.sys.sunrise); // NB! formatTimestamp is a function
    sunset.innerHTML = formatTimestamp(weatherObject.sys.sunset); // NB! formatTimestamp is a function  
    weatherIcon.setAttribute("src", pickWeathersymbol);
    dailyWeathertips.innerHTML = pickWeathertip;
    // creating forecast with 5 lines, injecting values
    for (let i = 0; i < 5; i++) {
        forecastContainer.innerHTML += `
    <div>
    <span class="weekday">day </span>
    <span class="forecastTemp">temperature</span>
    </div>
    `
        // forecastDay = document.getElementsByClassName("weekday")[i];
        forecastDay = document.getElementsByClassName("weekday")[i];
        forecastDay.innerHTML = i;
        forecastTemp = document.getElementsByClassName("forecastTemp")[i];
        forecastTemp.innerHTML = i;
    }
};

const convertToCelsius = (value) => {
    celsiusValue = kelvinValue - 273.15;
}

// Event listeners -----------------------------------------



// CODE STARTS HERE
fetchWeather();

//test if any data are received
setTimeout(() => {
    console.log(weatherObject);
    console.log(weatherObject.weather[0].description);
    console.log(weatherObject.main.temp);
    console.log(weatherObject.sys.sunrise * 1000);
}, 1000);


// Data formatting

// Formatting timestamp from unix to readable for people
const formatTimestamp = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    // Format the date using toLocaleString with options
    const formattedDate = date.toLocaleString("en-GB", {
        //year: 'numeric',
        //month: '2-digit',
        //day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
    return formattedDate;
}

// retrieving sunrise

setTimeout(() => {
    const weatherObject = {
        sys: {
            sunrise: (weatherObject.sys.sunrise)
        }
    };
    // Retrieving the sunrise timestamp from the weatherObject
    const sunriseTimestamp = weatherObject.sys.sunrise;
    // Calling the function with the sunrise timestamp from the weatherObject
    const formattedSunrise = formatTimestamp(sunriseTimestamp);
    // testing the formatted sunrise timestamp
    console.log(formattedSunrise);
}, 500);

// retrieving sunset

setTimeout(() => {
    const weatherObject = {
        sys: {
            sunset: (weatherObject.sys.sunset)
        }
    };

    // Retrieving the sunset timestamp from the weatherObject
    const sunsetTimestamp = weatherObject.sys.sunset;

    // Calling the function with the sunset timestamp from the weatherObject
    const formattedSunset = formatTimestamp(sunsetTimestamp);

    // testing the formatted sunset timestamp
    console.log(formattedSunset);

}, 500);
