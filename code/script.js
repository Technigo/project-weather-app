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

const pickWeathertip = (weatherTip) => {
    if (weatherObject.weather[0].description.includes('clear sky')) {
        let weatherTip = "Get your sunnies on. Stockholm is looking rather great today.";
        document.querySelector('body').style.backgroundColor = "#Faedc8";
        document.querySelector('body').style.color = "#Eeb50e";
        return weatherTip;
    } else if (weatherObject.weather[0].description.includes('rain')) {
        weatherTip = "Don't forget your umbrella. It's pouring!";
        document.querySelector('body').style.backgroundColor = "#a2def6";
        document.querySelector('body').style.color = "#1b4961";
        return weatherTip;
    } else if (weatherObject.weather[0].description.includes('snow')) {
        weatherTip = "Brr, baby it's cold outside! Grab your warmest coat.";
        document.querySelector('body').style.backgroundColor = "white";
        document.querySelector('body').style.color = "#1b4961";
        return weatherTip;
    } else if (weatherObject.weather[0].description.includes('cloud')) {
        weatherTip = "Time for cloud-gazing! Which shapes can you find today?";
        document.querySelector('body').style.backgroundColor = "#D6e8ee";
        document.querySelector('body').style.color = "#28afdc";
        return weatherTip;
    } else if (weatherObject.weather[0].description.includes('thunderstorm')) {
        weatherTip = "Be careful out there. There's a storm ahead!";
        document.querySelector('body').style.backgroundColor = "grey";
        document.querySelector('body').style.color = "black";
        return weatherTip;
    } else {
        weatherTip = "Rainy, sunny, cloudy... today the weather seems unpredictable!";
        return weatherTip;
    }
}

// need to define conditions when to use which sentence.
// Get your sunnies on. Stockholm is looking rather great today.
// Light a fire and get cosy. Stockholm is looking grey today.

let kelvinValue = "";
let celsiusValue = "";

let timeshiftFromUTC = "";
// forecastvalues for weekday and temperature, can not be assigned now, because happens inside loop
let forecastDay = "";
let forecastTemp = "";
const forecastDataCollection = [];

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
    dailyWeathertips.innerHTML = pickWeathertip();
    // finding only 12 o´clock values in 5-day forecast
    filterDataForForecast();
    // creating forecast with 5 lines, filling array forecastDataCollection, injecting values
    for (let i = 0; i < 5; i++) {
        forecastContainer.innerHTML += `
    <div class="forecast-item">
    <span class="weekday">day </span>
    <span class="forecastTemp">temperature</span>
    </div>
    `
        forecastDay = document.getElementsByClassName("weekday")[i];
        let dayvalue = forecastDataCollection[i].dt;
        let daydataWeekday = convertToWeekday(dayvalue);
        forecastDay.innerHTML = daydataWeekday;

        forecastTemp = document.getElementsByClassName("forecastTemp")[i];
        kelvinValue = forecastDataCollection[i].main.temp;
        celsiusValue = convertToCelsius(kelvinValue);
        forecastTemp.innerHTML = (celsiusValue + ` °C`);
    }
};

// functions for weather-forecast-------------------------
const filterDataForForecast = () => {
    // put array with only temp objects in allTempDatasets
    const allTempDatasets = forecastObject.list;
    // console.log(allTempDatasets);
    allTempDatasets.forEach((i) => {
        let dataItem = i.dt + timeshiftFromUTC;
        let formattedDateOfDataitem = formatForecastDay(dataItem);
        // console.log(formattedDateOfDataitem);
        //  -> all dates converted
        //  now filtering for the 5 datasets around noon, its not always 12!, times shifting;
        if (formattedDateOfDataitem.includes("11:00:00") || formattedDateOfDataitem.includes("12:00:00") || formattedDateOfDataitem.includes("13:00:00")) {
            forecastDataCollection.push(i);
        } else {

        }
    });
    // console.log(forecastDataCollection);
}

const formatForecastDay = (unixtimeStamp) => {
    timeshiftFromUTC = forecastObject.city.timezone;
    // adds time to UTC-value for city
    unixtimeStamp += timeshiftFromUTC;
    const date = new Date(unixtimeStamp * 1000);
    // Format the date to weekday using toLocaleString with options
    const formattedDate = date.toLocaleString("en-GB",);
    return formattedDate;
}

const convertToWeekday = (unixtimeStamp) => {
    const date = new Date(unixtimeStamp * 1000);
    // Format the date to weekday using toLocaleString with options
    const formattedDate = date.toLocaleString("en-GB", { weekday: "short" });
    return formattedDate;
}

const convertToCelsius = (value) => {
    let result = value - 273.15;
    result = parseInt(result);
    return result;
}
// end of functions for weather-forecast-------------------------


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
