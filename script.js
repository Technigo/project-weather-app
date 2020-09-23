
const city = document.getElementById("city");
const weatherToday = document.getElementById("weatherToday");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1c055fa282f5d9954e97fd78b7cd3c03";


fetch(weatherAPI)
.then((response) => {
    return response.json()
    })
    .then((json) => {
    city.innerHTML += `<h2>${json.name}</h2>`;
    
    temperature.innerHTML += `<h1>${json.main.temp.toFixed(1)} °</h1>`;
    weatherToday.innerHTML += `<h3>${json.weather[0].description}</h3>`;

    const sunriseTime = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunrise.innerHTML += `<h4>Sunrise: ${sunriseTime}</h4>`;
    
    const sunsetTime = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunset.innerHTML += `<h4>Sunset: ${sunsetTime}</h4>`;
    })
