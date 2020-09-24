const currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=742fe8feec76d1ec7cd8207fdf08fb30';
const fiveDayUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=742fe8feec76d1ec7cd8207fdf08fb30';

const degree = document.getElementById("degree");
const city = document.getElementById("city");
const weather = document.getElementById("weather");
const sunrise = document.getElementById("sunrise");

const sunset = document.getElementById("sunset");
const feels = document.getElementById("feels");

const dayOne = document.getElementById("dayOne");
const dayTwo = document.getElementById("dayTwo");
const dayThree = document.getElementById("dayThree");
const dayFour = document.getElementById("dayFour");
const dayFive = document.getElementById("dayFive");


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

        sunrise.innerHTML = `Sunrise ${formatTime(json.sys.sunrise)}`;
        sunset.innerHTML = `Sunset ${formatTime(json.sys.sunset)}`;
    })



//5-days forcast //

