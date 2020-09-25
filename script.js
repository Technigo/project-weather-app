const API_KEY = `4a5f208af7519fd95c6f1faa53c2e7a7`;

const API_CURRENT = `https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=${API_KEY}`;
const API_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=${API_KEY}`;

const API_ONEFORALL = `https://api.openweathermap.org/data/2.5/onecall?lat={13}&lon={61}&exclude={alerts}&appid=${API_CURRENT}`;



const container = document.getElementById("main")
const weather = document.getElementById("description");
const forecast = document.getElementById("forecast");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");


//CURRENT MMX//

fetch(API_CURRENT)
  .then((response) => {
    return response.json();


  })
  .then((weatherToday) => {
    // console.log(weatherToday);

    weather.innerHTML = `Weather today is ${weatherToday.weather[0].description}`;

    sunrise.innerHTML = `Sunrise: ${weatherToday.sys.sunrise}`;
    sunset.innerHTML = `Sunset: ${weatherToday.sys.sunset}`;





  });