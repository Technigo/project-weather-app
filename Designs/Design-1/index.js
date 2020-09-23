const currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=742fe8feec76d1ec7cd8207fdf08fb30';
const fiveDayUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=742fe8feec76d1ec7cd8207fdf08fb30';

const degree = document.getElementById("degree");
const city = document.getElementById("city");
const country = document.getElementById("country");
const weather = document.getElementById("weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const feels = document.getElementById("feels");

const monday = document.getElementById("monday");

const today = document.getElementsByClassName("today");
console.log(today);

fetch(currentUrl)
.then((response) => {
    return response.json()
    })

.then((json) => {
   console.log(json);
    degree.innerHTML = Math.round(json.main.temp)+ " °";
    feels.innerHTML = Math.round(json.main.feels_like)+ " °";
    city.innerHTML = json.name;
    country.innerHTML = (json.sys.country);

    json.weather.forEach(item => {
        weather.innerHTML = item.description
    })
    
    sunrise.innerHTML = json.sys.sunrise;
    sunset.innerHTML = json.sys.sunset;
})


//5-days forcast //

  
fetch(fiveDayUrl)
.then((response) => {
    return response.json()
    })

.then((json) => {
    console.log(json);

    json.list.forEach(item => {
        date.innerHTML = item.dt_txt
        
    })
    json.list.forEach(item => {
        temp.innerHTML = (item.main.temp) + ` C °`;
        
    })
   
})