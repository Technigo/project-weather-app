const API_KEY = '4a5f208af7519fd95c6f1faa53c2e7a7';

const API_CURRENT = `https://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=${API_KEY}`;
const API_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=${API_KEY}`;

const API_ONEFORALL = `https://api.openweathermap.org/data/2.5/onecall?lat={13}&lon={61}&exclude={alerts}&appid=${API_KEY}`
//change forecast q="inputValue" to match geolocation.//
// const inputValue = 

// // SET USER'S POSITION
// function setPosition(position){
//   let latitude = position.coords.latitude;
//   let longitude = position.coords.longitude;

//   getWeather(latitude, longitude);
// }
const currentTime = document.getElementById("location-time")
const weatherHeader = document.getElementById("location");
const container = document.getElementById("main");
const icon = document.getElementById("weather-icon")

const weather = document.getElementById("description");
const forecast = document.getElementById("forecast");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
// const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))


// convert times 
// const calculatingSun = (time) => {
//   const sunTime = new Date(time * 1000);

//   const sunTimeString = sunTime.toLocaleTimeString("sv-SE", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   });
//   return sunTimeString;
// };


let currentDate = new Date();


// GET WEATHER DATA FROM API PROVIDER

fetch(API_CURRENT)
  .then((response) => {
    return response.json();


  })
  .then((weatherToday) => {


    weatherHeader.innerHTML = `Weather in ${weatherToday.name}: `;
    document.getElementById("location-time").innerHTML = currentDate;

    icon.innerHTML = weatherToday.weather[0].icon;
    //function round(value, precision) or tofixed?
    container.innerHTML = `Temperature is ${weatherToday.main.temp.toFixed(1)}<span>°c</span> and feels like ${weatherToday.main.feels_like.toFixed(1)}<span>°c</span>`;

    // moment().format('MMMM Do YYYY, h:mm:ss a'); // September 25th 2020, 6:38:42 pm
    weather.innerHTML = `${weatherToday.weather[0].description} `;

    sunrise.innerHTML = `Sunrise: ${weatherToday.sys.sunrise}`;
    sunset.innerHTML = `Sunset: ${weatherToday.sys.sunset} `;

  });



//Wearther functions:
const fiveDays = document.getElementsByClassName(".five-day")



//FORECAST - TEMPERATURE MIN-MAX, PRESSURE//
fetchForecast(API_FORECAST)
  .then((response) => {
    return response.json();

  })
  .then((weatherForecast) => {


    const filteredForecast = weatherForecast.list.filter(item => weatherForecast.dt_txt.includes('00:00'));
  });



    // const fetchForecast = (API_FORECAST) => {
    //   fetch(API_FORECAST)
    //     .then(response => response.json())
    //     .then(data => {
    //       const newForecast = weatherForecast.list.map(item => {
    //         const tempMax = item.main.temp_max;
    //         const tempMin = item.main.temp_min;
    //         const descript = item.main.description;

    //         return { tempMax, tempMin, descript }
    //       });


    // const displayWeather ()

    //   const displayWeather = () => {
    //     icons.innerHTML = `< img src = "icons/${weather.iconId}.png/>`;
    //     location.innerHTML = `${weather.city}, ${weather.country}`;
    //     temperature.innerHTML = `${weather.temperature.value} <span>C</>`;
    //     description.innerHTML = weather.description;
    //   }


    // };



    // forecastData();








