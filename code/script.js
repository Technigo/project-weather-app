// API key: 607d94111f1f9c343f38c10112b16e3c
// REMOVE BEFORE SUBMISSION

let cityName = "Stockholm"

const city = document.getElementById("city");
const country = document.getElementById("country");
const localtime = document.getElementById("localtime");
const temperature = document.getElementById("temperature");
const tempFeelsLike = document.getElementById("tempfeelslike");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherType = document.getElementById("weathertype");

const forecastDay1 = document.getElementById("day1");
const forecastDay2 = document.getElementById("day2");
const forecastDay3 = document.getElementById("day3");
const forecastDay4 = document.getElementById("day4");
const forecastDay5 = document.getElementById("day5");

// formatTime() formats UNIX 10-digit timestamps to HH:MM format.
const formatTime = (timestamp) => {
  // Needed to add *1000 due to account for the absence of milliseconds in Unix timestamps. 
  let readableTime = new Date(timestamp * 1000);

  //Only use the HH:MM's of the readableTime
  readableTime = readableTime.toLocaleTimeString('sv-SE', {
    hour: '2-digit', 
    minute:'2-digit',
    hour12: false
  });
  return readableTime;
}

const kelvinToCelsius = (temp) => {
  let celsius = Math.round(temp-273.15);
  return celsius
}

const fetchWeather = (city) => {
  fetchForecast(city);
  fetchCurrentWeather(city);
}

// Function which fetches current weather data from a city, and populates the main objects in the DOM.
const fetchCurrentWeather = (cityName) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=607d94111f1f9c343f38c10112b16e3c`).then((response) => {
    return response.json();
  }).then((weatherObject) => {

    city.innerHTML = weatherObject.name;
    country.innerHTML = getCountryName(weatherObject.sys.country);
    localtime.innerHTML = formatTime(weatherObject.dt);
    temperature.innerHTML = Math.round(weatherObject.main.temp)+"°";
    tempFeelsLike.innerHTML = Math.round(weatherObject.main.feels_like)+"°";
    weatherType.innerHTML = weatherObject.weather[0].main;
    description.innerHTML = weatherObject.weather[0].description;
    sunrise.innerHTML = formatTime(weatherObject.sys.sunrise);
    sunset.innerHTML = formatTime(weatherObject.sys.sunset);
  })
}

fetchCurrentWeather(cityName);


// 5-day forecast function
const fetchForecast = (cityName) => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=607d94111f1f9c343f38c10112b16e3c`).then((response) => {
    return response.json();
  }).then((forecastObject) => {
    // Instead of an array of 40 objects, we want one object per day. Time ≈ the current time. Empty array creation time.
    const fiveDayList = [];

    // Get every 8th object from the forecastObject (since it's in 3-hour intervals), and push them into fiveDayList.
    for (let i = 7; i<forecastObject.list.length; i+=8) {
      fiveDayList.push(forecastObject.list[i]);
    }

    // Populate the DOM with data fetched. First, create a var for the section "forecastBox"
    const forecastBox = document.getElementById("forecastBox");
    
    // Need to clear the forecastBox, since otherwise switching cities won't work (since the forEach only *adds* stuff)
    forecastBox.innerHTML = ``
    console.log(fiveDayList);
    fiveDayList.forEach(element => { 
      const date = element.dt_txt.slice(0,10);
      const temp = element.main.temp;
      const weather = element.weather[0].main;

      forecastBox.innerHTML += `
      <section id="forecastBox"></section>
      <div id="forecastRow" class="forecast-row">
        <span class="forecast-date">${date}</span>
        <div class="forecast-temp">
          <span>☀</span>
          <span>${kelvinToCelsius(temp)}°</span>
        </div>
        <span class="forecast-weather">${weather}</span>        
        </div>
      </section>`

    
    });

    
  })
}


fetchForecast(cityName);