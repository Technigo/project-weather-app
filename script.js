// TODAY'S FORECAST

const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=20216c09e09f267ccc58282554c77ecf';
const container = document.getElementById('main');
const weatherHeader = document.getElementById('weather-header');

const tempToday = document.getElementById('temp-today');
const descriptionToday = document.getElementById('description-today')
const sunriseToday = document.getElementById('sunrise-today')
const sunsetToday = document.getElementById('sunset-today')


fetch(apiUrl)
.then((response) => {
    return response.json()
})

.then((weatherObject) => {

    // Update weather in Stockholm from API
    weatherHeader.innerHTML = weatherObject.name;

    // Get temp and rounds up or down with 1 place decimal.
    tempToday.innerHTML = `${Math.round(weatherObject.main.temp * 10) / 10} °C`;
    descriptionToday.innerHTML = weatherObject.weather[0].description   
    
    // Create two variables that stores the API values
    const sunriseValue = weatherObject.sys.sunrise
    const sunsetValue = weatherObject.sys.sunset

    // Create two variables that take these stored API values and convert them from milliseconds
    const sunriseConverted = new Date (sunriseValue * 1000)
    const sunsetConverted = new Date (sunsetValue * 1000)

    // Create two variables that take the converted number and return the asked-for format
    const sunriseToLocaleString = sunriseConverted.toLocaleTimeString ('en-US', {hour: '2-digit', minute: '2-digit', hour12: false,})
    const sunsetToLocaleString = sunsetConverted.toLocaleTimeString ('en-US', {hour: '2-digit', minute: '2-digit', hour12: false,})

    // The values from the API - collected, stored in new variabales and converted - is returned to the html to be output in browser
    sunriseToday.innerHTML = `${sunriseToLocaleString}`
    sunsetToday.innerHTML = `${sunsetToLocaleString}`

});

// FIVE DAY FORECAST 

const apiUrlFiveDay = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=20216c09e09f267ccc58282554c77ecf';
const containerFiveDay = document.getElementById('container-five-day')
const forecastDay2 = document.getElementById('day2')
const forecastDay3 = document.getElementById('day3')
const forecastDay4 = document.getElementById('day4')
const forecastDay5 = document.getElementById('day5')
const forecastDay6 = document.getElementById('day6')

fetch(apiUrlFiveDay)
.then((response) => {
    return response.json()
})

.then((fiveDayArray) => {

        //Filters out forecast at 12:00 for coming 5 days
        const filteredForecast = fiveDayArray.list.filter(item => item.dt_txt.includes('12:00'));  //Creates array with data for coming 5 days
    
        filteredForecast.forEach((forecastDay) => {
            containerFiveDay.innerHTML += generateHTMLForForecast(forecastDay);
        });  
      })

      .catch((error) => {
        console.log(error);
      });

      const generateHTMLForForecast = day => {
          const weekdayInUnix = day.dt;
          const weekdayShortFormat = new Date(weekdayInUnix * 1000);
          const specificWeekday = weekdayShortFormat.toLocaleDateString('en-US', {weekday: 'short'}).toLowerCase();
          const dayTemp = `${Math.round(day.main.temp * 10) / 10}`;
        

    let forecastHTML = '';
        forecastHTML += `<div class="container-five-day">`;
        forecastHTML += `<p class="forecast-day">${specificWeekday}  ${dayTemp} °C</p>`;
        //forecastHTML += `<p class="forecast-minmax">${dayTemp} °C</p>`;
        forecastHTML += `</div>`;
        return forecastHTML;
    };


    /*
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




