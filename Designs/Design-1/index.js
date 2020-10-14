const currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=742fe8feec76d1ec7cd8207fdf08fb30';
const fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=742fe8feec76d1ec7cd8207fdf08fb30';

const degree = document.getElementById("degree");
const city = document.getElementById("city");
const weather = document.getElementById("weather");
const feels = document.getElementById("feels");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const formatTime = (timestamp) => {
    let readableTime = new Date(timestamp * 1000);

    readableTime = readableTime.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    return readableTime;
}

fetch(currentUrl)
    .then((response) => {
        return response.json()
    })
    .then((json) => {        
        degree.innerHTML = Math.round(json.main.temp) + " °";
        city.innerHTML = json.name;

        json.weather.forEach(item => {
            weather.innerHTML = item.description
        })
        feels.innerHTML = ` Feels like : ${Math.round(json.main.feels_like)}` + " °";

        sunrise.innerHTML += `Sunrise <img class="image" src="sunrise.png" alt="sunrise"./> ${formatTime(json.sys.sunrise)}`;
        sunset.innerHTML = `Sunset  <img class="image" src="sunset.png" alt="sunset"./> ${formatTime(json.sys.sunset)}`;
    })

//5-days forcast //

const forecastContent = document.getElementById('main-forecast-data');
fetch(fiveDayUrl)
    .then((response) => {
        return response.json()
    })
    .then ((json) => {
        console.log(json)
        //Filters out forecast at 12:00 for coming 5 days
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));  //Creates array with data for coming 5 days
        filteredForecast.forEach((forecastDay) => {
            forecastContent.innerHTML += generateHTMLForForecast(forecastDay);
          });  
        })
       
        const generateHTMLForForecast = day => {
        
            //Get the weekday it is
            const weekdayInUnix = day.dt;  // Date in UNIX
            const weekdayLongFormat = new Date(weekdayInUnix * 1000);  // Convert to nice date format we can use
            const specificWeekday = weekdayLongFormat.toLocaleDateString('en-US', {weekday: 'long'}); 
          getElementBy
         
            //Weather description
            const descriptionFromAPI = day.weather[0].description; 
          
            //Min Max Temperatures
            const minTemp = day.main.feels_like.toFixed();
            const maxTemp = day.main.temp_max.toFixed();
          
            //Writing out through HTML
            let forecastHTML = '';
            forecastHTML += `<div class="forecast-container">`;
            forecastHTML += `<p class="forecast-day">${specificWeekday}</p>`;
            forecastHTML += `<p class="forecast-description">${descriptionFromAPI}</p>`;
            forecastHTML += `<p class="forecast-minmax">${maxTemp}°C / ${minTemp}°C</p>`;
            forecastHTML += `</div>`;
            return forecastHTML;
          };