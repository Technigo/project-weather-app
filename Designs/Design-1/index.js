const currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=742fe8feec76d1ec7cd8207fdf08fb30';
const fiveDayUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=742fe8feec76d1ec7cd8207fdf08fb30';

const degree = document.getElementById("degree");
const city = document.getElementById("city");
const country = document.getElementById("country");
const weather = document.getElementById("weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const feels = document.getElementById("feels");

const today = document.getElementsByClassName("today");
console.log(today);

fetch(currentUrl)
.then((response) => {
    return response.json()
    })

.then((json) => {
   console.log(json);
    degree.innerHTML = (json.main.temp) + ` C °`;
    feels.innerHTML = (json.main.feels_like) + ` C °`;
    city.innerHTML = json.name;
    country.innerHTML = json.sys.country;

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
    monday.innerHTML = (json.main.temp) + ` C °`;
})