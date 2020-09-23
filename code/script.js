// TODAY'S FORECAST

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=20216c09e09f267ccc58282554c77ecf';

const container = document.getElementById('main');
const weatherHeader = document.getElementById('weather-header');
const tempToday = document.getElementById('temp-today');
const descriptionToday = document.getElementById('description-today');
const sunriseToday = document.getElementById('sunrise-today');
const sunsetToday = document.getElementById('sunset-today');
const weatherImage = document.getElementById('weather-image')
fetch(apiUrl)
    .then((response) => {
        return response.json();
    })

    .then((weatherObject) => {

        // Update weather in Stockholm from API
        weatherHeader.innerHTML = `Today's weather in ${weatherObject.name}`

        // Get temp and rounds up or down with 1 place decimal.
        tempToday.innerHTML = `${Math.round(weatherObject.main.temp * 10) / 10}°`
        descriptionToday.innerHTML = weatherObject.weather[0].description  


        // HOW DO THIS?
        //const imageValue = weatherObject.weather[0].icon 
        //weatherImage.innerHTML = `icon ${imageValue}`

        
        // Create two variables that stores the API values
        const sunriseValue = weatherObject.sys.sunrise;
        const sunsetValue = weatherObject.sys.sunset;

        // Create two variables that take these stored API values and convert them from milliseconds
        const sunriseConverted = new Date (sunriseValue * 1000);
        const sunsetConverted = new Date (sunsetValue * 1000);

        // Create two variables that take the converted number and return the asked-for format
        const sunriseToLocaleString = sunriseConverted.toLocaleTimeString ('en-US', {hour: '2-digit', minute: '2-digit', hour12: false,});
        const sunsetToLocaleString = sunsetConverted.toLocaleTimeString ('en-US', {hour: '2-digit', minute: '2-digit', hour12: false,});

        // The values from the API - collected, stored in new variabales and converted - is returned to the html to be output in browser
        sunriseToday.innerHTML = `sunrise: ${sunriseToLocaleString}`;
        sunsetToday.innerHTML = `sunset: ${sunsetToLocaleString}`;
    });

// FIVE DAY FORECAST 

const apiUrlFiveDay = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=20216c09e09f267ccc58282554c77ecf';

// Connects javascript with html - allows data generated from the generateHTMLForForcast
//function to be outputted in browser
const containerFiveDay = document.getElementById('container-five-day');

fetch(apiUrlFiveDay)
    .then((response) => {
     return response.json();
    })

    .then((fiveDayArray) => {

        // Get forecast for coming 5 days with data only from 12:00 each day
        const filteredForecast = fiveDayArray.list.filter(item => item.dt_txt.includes('12:00'));  

        // The forEach() method calls the function generateHTMLForForecast once for each element in the filtered array, in order.
        // And executes and returns whatever is defined in this function
        filteredForecast.forEach((eachDay) => {
            containerFiveDay.innerHTML += generateHTMLForForecast(eachDay);
        });  
    });

// A function that retrieve and convert data from the API in a readable format.
const generateHTMLForForecast = day => {
    const weekdayUnix = day.dt;
    const weekdayLong = new Date(weekdayUnix * 1000);
    const weekdayName = weekdayLong.toLocaleDateString('en-US', {weekday: 'long'}).toLowerCase();
    const dayTemp = `${Math.round(day.main.temp * 10) / 10}`;

    // And creates HTML code that is returned
    let fiveDayForecastHTML = '';
    fiveDayForecastHTML += `<div class="container-five-day">`;
    fiveDayForecastHTML += `<p class="weekday-name">${weekdayName}</p>`;
    fiveDayForecastHTML += `<p class="day-temp">${dayTemp}°</p>`;
    fiveDayForecastHTML += `</div>`;
    return fiveDayForecastHTML;
};


    /*
    const forecastDay2 = document.getElementById('day2')
    const forecastDay3 = document.getElementById('day3')
    const forecastDay4 = document.getElementById('day4')
    const forecastDay5 = document.getElementById('day5')
    const forecastDay6 = document.getElementById('day6')
    
    forecastDay2.innerHTML = fiveDayArray.list[0].sys.dt_txt;
    forecastDay3.innerHTML = fiveDayArray.list[1].sys.dt_txt;
    forecastDay4.innerHTML = fiveDayArray.list[2].sys.dt_txt;
    forecastDay5.innerHTML = fiveDayArray.list[3].sys.dt_txt;
    forecastDay6.innerHTML = fiveDayArray.list[4].sys.dt_txt;

    forecastDay2.innerHTML = `${Math.round(fiveDayArray.list[0].main.temp * 10) / 10} °C`;
    forecastDay3.innerHTML = `${Math.round(fiveDayArray.list[1].main.temp * 10) / 10} °C`;
    forecastDay4.innerHTML = `${Math.round(fiveDayArray.list[2].main.temp * 10) / 10} °C`;
    forecastDay5.innerHTML = `${Math.round(fiveDayArray.list[3].main.temp * 10) / 10} °C`;
    forecastDay6.innerHTML = `${Math.round(fiveDayArray.list[4].main.temp * 10) / 10} °C`;
    */




