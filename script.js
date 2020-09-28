import {API_KEY} from './api-key.js';

//--------------------------------General variables-------------------------------
const API_URL_CURRENT_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=${API_KEY}`
const API_URL_FORECAST_WEATHER = `https://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&appid=${API_KEY}`;
const currentWeatherInfo = document.querySelector('.weather-info-textbox');
const cityHeader = document.querySelector('.city');
const forecastInfo = document.querySelectorAll('.forecast-info-textbox');
const HTML = document.querySelector("html");


//---------------------------------Fetch API current weather---------------------
fetch(API_URL_CURRENT_WEATHER)
    .then((response) => {
        return response.json();
    })
    .then((current) => {
        const currentWeatherObject = generateCurrentWeatherInfo(current); //getting the data I want from the API to JS class and storing it
        currentWeatherInfo.innerHTML += generateHTMLForCurrentWeatherInfo(currentWeatherObject); //getting the data from the JS class to HTML for current day
        getWeatherColorIconTitle(currentWeatherObject.weatherDescription, current); //getting the colors of the page, the icon and the main title - these are weatherdependent
        cityHeader.innerHTML = current.name;    //displaying city in the title
    });

//---------------------Create weather info from response--------------------------
//-------------------------Template for weather info------------------------------
class WeatherTemplate {     //JavaScript class to collect data from both API's
   constructor(dateDay, weatherDescription, temperature, temperatureFeelsLike, sunriseTime, sunsetTime) { //these are the "variables" in the template
        this.dateDay = dateDay; 
        this.weatherDescription = weatherDescription;
        this.temperature = temperature;
        this.temperatureFeelsLike = temperatureFeelsLike;
        this.sunriseTime = sunriseTime;
        this.sunsetTime = sunsetTime;
    };
};

//-----------Function to generate HTML for current weather info on top of page----------
const generateCurrentWeatherInfo = current => {
    const currentWeatherObject = new WeatherTemplate(   //creating a new object with info from current day
        getDateDay(current.dt),                         //setting which data is the date in the current day weather object 
        current.weather[0].main,                        //setting which data is the weather description in the current day weather object 
        current.main.temp.toFixed(0),                   //setting which data is the temperature in the current day weather object 
        current.main.feels_like.toFixed(0),             //setting which data is the temperature feels like in the current day weather object - tried Math.round to round up/down but couldn't get it to worked, took a shortcut
        getSunOutTime(current.sys.sunrise),             //setting which data is sunrise time in the current day weather object and how it's calculated
        getSunOutTime(current.sys.sunset)               //setting which data is the sunset time for current day and how it's calculated
    );
    return currentWeatherObject;        //returning the weather template so it can be picked up
};
//------------------Function to generate wanted time from the API-------------------
const getSunOutTime = data => {
    const sunTime = new Date(data * 1000)           //calculating timestamp in milliseconds
    return sunTime.toLocaleTimeString('sv-SE', {        //setting how to display time from data
        timestyle: 'long',
        hour12: false,
        hour: '2-digit', 
        minute:'2-digit'
    });
};

//----------Function to change colors in HTML depending on current weather--------
const getWeatherColorIconTitle = (data, item) => {
    const weatherIcon = document.querySelector("#weatherIcon");     //getting the weathericon id from the DOM
    const weatherTitle = document.querySelector('.weather-info-main-title');    //getting the weathertitle-tag from the DOM
    if (data === "Rain" || data === "Drizzle") {        //if data is rain or drizzle....
        HTML.classList.add("rain");                     //...the class 'rain' is set to the html-tag, which changes the colors....
        weatherIcon.src = "./icons/rain.svg";           //...and the weathericon above the title is set to the rain icon...
        weatherTitle.innerText = `Don't forget your umbrella. It's wet in ${item.name} today.`  //...and the title changes to this
    } else if (data === "Clear") { //if data is clear...
        HTML.classList.add("sun"); //...the class 'sun' is set to the html-tag, which changes the colors...
        weatherIcon.src = "./icons/sun.svg"; //...and the weathericon above the title is set to the sun icon...
        weatherTitle.innerText = `Get your sunnies on. ${item.name} is looking rather great today.` //...and the title changes to this
    } else if (data === "Clouds") {  //if data is clouds....
        HTML.classList.add("clouds"); //...the class 'clouds' is set to the html-tag, which changes the colors...
        weatherIcon.src = "./icons/cloud.svg"; //...and the weathericon above the title is set to the cloud icon....
        weatherTitle.innerText = `Light a fire and get cosy. ${item.name} is looking grey today.` //....and the title changes to this
    };
};

//-----------------------Data consuming approach, doing it anyway-----------------------
const generateHTMLForCurrentWeatherInfo = currentWeatherObject => {
    let currentWeatherInfoHTML = '';
    currentWeatherInfoHTML += `<h5 class="weather-info-title">${currentWeatherObject.weatherDescription}</h5>`; //Sets weather description for current day in HTML
    currentWeatherInfoHTML += `<h5 class="weather-info-title">${currentWeatherObject.temperature}°</h5>`; //Sets temperature for current day in HTML
    currentWeatherInfoHTML += `<p class="weather-info-text">feels like ${currentWeatherObject.temperatureFeelsLike}°</p>`; //Sets what temperature feels like for current day in HTML
    currentWeatherInfoHTML += `<p class="weather-info-text">sunrise ${currentWeatherObject.sunriseTime}</p>`; //Sets sunrise time for current day in HTML
    currentWeatherInfoHTML += `<p class="weather-info-text">sunset ${currentWeatherObject.sunsetTime}</p>`; //Sets sunset time for current day in HTML
    return currentWeatherInfoHTML;
};
//-------------------------------Fetch API forecast weather-------------------------------
fetch(API_URL_FORECAST_WEATHER)
    .then((response) => {
        return response.json();
    })
    .then(forecastResponse => {
        const forecasts = generateForecastWeatherInfo(forecastResponse);    //getting forecast templates
        forecastInfo.innerHTML += generateHTMLForForecastWeatherInfo(forecasts);    //getting info to display on page
    });

//-----------------------Function to generate wanted date from the API-----------------------
const getDateDay = data => {
    const dateDay = new Date(data * 1000)   //Timestamp to milliseconds
    return dateDay.toLocaleDateString('en-GB', {    //Setting how to show day
        weekday: 'short'
    });
};

//----Function to generate an array of objects for the filtered forecast info using the WeatherTemplate class----
const generateForecastWeatherInfo = forecast => {
    const filteredForecast = forecast.list.filter(item => 
        item.dt_txt.includes('12:00'));  // filtering forecast API to array with data from 12:00 each day.
    const forecastTemplates = filteredForecast.map(item => {        //Mapping through filtered array....
        return new WeatherTemplate(                  //...to return one weathertemplate object per item
            getDateDay(item.dt),            //setting which data is the date in the forecast day weather item 
            item.weather[0].main,           //setting which data is the weather description in the forecast day weather item 
            item.main.temp.toFixed(1),      //setting which data is the temperature in the forecast day weather item  
            item.main.feels_like.toFixed(1), //setting which data is the temperature feels like in the forecast day weather item 
            null,                             //no sunrise time in forecast API, setting to null
            null,                              //no sunset time in forecast API, setting to null
        );
    });
    return forecastTemplates; //returns forecastTemplates
};

//---------------------------Function go generate HTML forecast info----------------------------
const generateHTMLForForecastWeatherInfo = forecasts => {
    for (const [index, item] of forecasts.entries()) {      //for of loop to loop each forecast weathertemplate and display requested info on the page
        forecastInfo[index].querySelector('.forecast-info-day').innerText = item.dateDay;   //displays date for forecasts
        forecastInfo[index].querySelector('.forecast-info-temp').innerText = `${item.temperature}°`;    //displays temperature for forecasts
        forecastInfo[index].querySelector('.forecast-info-feels-like').innerText = `${item.temperatureFeelsLike}°`;     //displays what temperature feels like for forecasts
        forecastInfo[index].querySelector('.forecast-info-icon').src = getWeatherIcons(item.weatherDescription) //displays an icon depending on weather description
    };
}

//-----------------------------Function to get forecast info icon---------------
const getWeatherIcons = (weather) => {
        if (weather === "Rain" || weather === "Drizzle") {  //if the description on the weathertemplate is rain or drizzle...
            return "./icons/rain.svg"                       //...the function returns the source of the rain weather icon
        } else if (weather === "Clear") {                   // or else if the description on the weathertemplate is clear....
            return "./icons/sun.svg"                        //...the function returns the source of the sun weather icon
        } else if (weather === "Clouds") {                  //or else if the description on the weathertemplate is clouds....
            return "./icons/cloud.svg"                      ////...the function returns the source of the cloud weather icon
        };
    };