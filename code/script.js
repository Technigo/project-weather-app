// const container = document.getElementById("weather");
const cityWeather = document.getElementById("city");
const weatherDescription = document.getElementById("description");
const weatherImage = document.getElementById("weather-image");

const sunRise = document.getElementById("sunRise");
const sunSet = document.getElementById("sunSet");

// const weatherForecast = document.getElementById("weather-5day");
const weatherForecastDay = document.getElementById("forecast-weekday");
const weatherForecastTemp = document.getElementById("forecast-temp");


// -------------- API link variables:
const weatherOneDayApi =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,se&units=metric&APPID=44527f8be39feab9d034d48604c6b81d&lang=en";
const weatherForecastApi =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,se&units=metric&APPID=44527f8be39feab9d034d48604c6b81d&lang=en";
// console.log(weatherForecast)
// -------------- 



fetch(weatherOneDayApi)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // console.log('checking first json', json) // checking the json from open weather
    // container.innerHTML = `${json.main.temp.toFixed(1)}°`;

    cityWeather.innerHTML = `${json.name} is a great city! We need some more text.`;

    json.weather.forEach(sky => {
      weatherDescription.innerHTML += `${sky.description} | ${json.main.temp.toFixed(1)}° `;
    });
    weatherImage.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="Weather Icon" />`;

    // console.log('check if image is picked up:', weatherImage)
    // -------------- 
    // Weather Icon
    /*
    const currentWeather = json.weather[0].icon
    console.log('icon:', currentWeather)
    if (json.weather[0].icon === '04d') {
      weatherImage.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="" />`;
    }
    */
    // -------------- 
    // sunStatus.innerHTML = `<h1>Sunrise: ${json.sys.sunrise} and Sunset: ${json.sys.sunset}</h1>`
    // console.log(weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    // console.log(weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    // -------------- 
    // Sunrise and Sunset:
    sunRise.innerHTML = weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {
      timeStyle: "short"
    });
    // console.log(sunRise.innerHTML)
    sunSet.innerHTML = weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {
      timeStyle: "short"
    });
    // -------------- 
  });




// the weatherForecast - Step 4 :

fetch(weatherForecastApi)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // console.log('forecast json object', json);
    // filtrerar ut alla "kl 12" och skapar en ny Array: **************
    const filteredForecast = json.list.filter(item => item.dt_txt.includes("12:00"));
    // console.log('filtered array', filteredForecast);
    /*
    filteredForecast.forEach((forecast) => {
      weatherForecast.innerHTML += `<h3>date: ${forecast.dt} / ${forecast.weather[0].description} / ${forecast.main.temp.toFixed(1)}°C `;
    });
   */
    filteredForecast.forEach(day => {
      const date = new Date(day.dt * 1000)
      // console.log('new date:', date)
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let dayOfWeek = weekdays[date.getDay()];
      weatherForecastDay.innerHTML += `<p> ${dayOfWeek}</p>`
      weatherForecastTemp.innerHTML += `<p> ${day.main.temp.toFixed(0)} °</p>`

    })
    // console.log(filteredForecast.toLocaleString(`en-US`)); 
    // console.log(weatherForecast);
    // console.log(filteredForecast.forecast.main.temp);
    // console.log(weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {timeStyle: "short"}))
  })


/*
const filteredForecast = json.list.filter(item => item.dt_txt.includes('03:00'));
containerFiveDays.innerHTML = "";

filteredForecast.forEach(day => {
 const date = new Date(day.dt * 1000)
 const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
 let dayOfWeek = weekdays[date.getDay()];
containerFiveDays.innerHTML += `<p> ${dayOfWeek} ${day.main.temp.toFixed(0)} °C </p>`
      })





*/








/*
   filteredForecast.forEach((forecast) => {
      // let daysName = forecast.dt_txt
      // console.log('daysName info:', daysName)
      // weatherForecast.innerHTML += `<h3>${forecast.dt} </h3>`;
      weatherForecast.innerHTML += `<h3>${forecast.dt} eller ${forecast.dt_txt} / ${forecast.weather[0].description} / ${forecast.main.temp.toFixed(1)}°C </h3>`;
    });


*/

// -------------- 
// Weather Icon - Works men behöver flera statements
/*
const currentWeather = json.weather[0].icon
console.log('icon:', currentWeather)
if (json.weather[0].icon === '04d') {
  weatherImage.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="" />`;
}
*/
// -------------- 