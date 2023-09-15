"use strict";
// does this work?
// DOM selectors ------------------------------------------
const weatherData = document.getElementById('weather-container');

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
// each span is a child of a parent with an id, so we can adress it as div#id/span[number of child]
const forecastDay1 = document.getElementById("day-one").children[0];
const forecastTem1 = document.getElementById("day-one").children
[1];
const forecastDay2 = document.getElementById("day-two").children[0];
const forecastTem2 = document.getElementById("day-two").children
[1];
const forecastDay3 = document.getElementById("day-three").children[0];
const forecastTem3 = document.getElementById("day-three").children
[1];
const forecastDay4 = document.getElementById("day-four").children[0];
const forecastTem4 = document.getElementById("day-four").children
[1];
const forecastDay5 = document.getElementById("day-five").children[0];
const forecastTem5 = document.getElementById("day-five").children
[1];

// Global variables ---------------------------------------

// complete link to data: const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=89d1a944a381d671e0d7eca3b8362f21"; 

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "89d1a944a381d671e0d7eca3b8362f21";
const city = "Stockholm,Sweden";

const URL = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`;

// https://api.openweathermap.org/data/2.5/weather?
// holding the weather data object from openweather.com
let weatherObject;

const pickWeathersymbol = "/design/design2/icons/noun_Umbrella_2030530.svg";
// need to define conditions when to use which symbol

const pickWeathertip = "Dont´t forget your umbrella. It´s wet in Stockholm today.";
// need to define conditions when to use which sentence.
// Get your sunnies on. Stockholm is looking rather great today.
// Light a fire and get cosy. Stockholm is looking grey today.


// Functions -------------------------------------------------


const fetchWeather = () => {
    fetch(URL)
        // gets raw data
        .then(response => response.json())
        // convert  Objekt to string
        .then(data => {
            console.log(data)
            weatherObject = data
            // console.log(weatherObject)
            setTimeout(() => { insertWeatherdata() }, 300);
        })
};

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
    forecastDay1.innerHTML = "1a";
    forecastTem1.innerHTML = "0 degree";
    forecastDay2.innerHTML = "2a";
    forecastTem2.innerHTML = "0 degree";
    forecastDay3.innerHTML = "3a";
    forecastTem3.innerHTML = "0 degree";
    forecastDay4.innerHTML = "4a";
    forecastTem4.innerHTML = "0 degree";
    forecastDay5.innerHTML = "5a";
    forecastTem5.innerHTML = "0 degree";
};



// Event listeners -----------------------------------------



// CODE STARTS HERE
fetchWeather();

//test if any data are received
setTimeout(() => {
     console.log(weatherObject);
     console.log(weatherObject.weather[0].description);
     console.log(weatherObject.main.temp);
     console.log(weatherObject.sys.sunrise*1000);
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
