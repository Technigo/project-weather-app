import { API_KEY } from './key.js';

const mainIcon = document.getElementById('main-icon');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

//Main fetch to get Stockholm weather
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&APPID=${API_KEY}`)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    const mainIconID = json.weather[0].icon;
    mainIcon.src = `./assets/${mainIconID}.png`;

    cityName.innerText = `${json.name}`;
    temperature.innerText = `${json.main.temp.toFixed()}°C`;
    description.innerText = `${json.weather[0].description.toUpperCase()}`;

    const sunriseValue = json.sys.sunrise; //Sunrise and Sunset times in UNIX
    const sunsetValue = json.sys.sunset;

    /* Multiply by 1000 because the data is given to us in UNIX which is in seconds, but Javascript uses milliseconds internally, this way we get the right date. */
    const sun = new Date(sunriseValue * 1000);
    const set = new Date(sunsetValue * 1000);
    const sunriseHour = sun.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});
    const sunsetHour = set.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});

    sunrise.innerText = `Sunrise: ${sunriseHour}`;
    sunset.innerText = `Sunset: ${sunsetHour}`;
  })

  .catch((error) => {
    console.log(error);
  });

// New Fetch for the 5 days Forecast
const forecastContent = document.getElementById('main-forecast-data');

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&appid=${API_KEY}`)
  .then((response) => {
    return response.json();
  })

  .then ((json) => {
    //Filters out forecast at 12:00 for coming 5 days
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));  //Creates array with data for coming 5 days
    filteredForecast.forEach((forecastDay) => {
      forecastContent.innerHTML += generateHTMLForForecast(forecastDay);
    });  
  })

  .catch((error) => {
    console.log(error);
  });

const generateHTMLForForecast = day => {
  //Get the weekday it is
  const weekdayInUnix = day.dt;  // Date in UNIX
  const weekdayLongFormat = new Date(weekdayInUnix * 1000);  // Convert to nice date format we can use
  const specificWeekday = weekdayLongFormat.toLocaleDateString('en-US', {weekday: 'long'}); 

  //Get image icon
  const iconID = day.weather[0].icon; //Gets icon code from API

  //Get description
  const descriptionFromAPI = day.weather[0].description; //Gets description from API

  //Get Min Max Temperatures
  const minTemp = day.main.feels_like.toFixed(); //Gets min and max temp from API and rounds it up
  const maxTemp = day.main.temp_max.toFixed();

  // Create dynamic HTML code to return
  let forecastHTML = '';
  forecastHTML += `<div class="forecast-container">`;
  forecastHTML += `<p class="forecast-day">${specificWeekday}</p>`;
  forecastHTML += `<img class="forecast-icon" src='./assets/${iconID}.png'>`;
  forecastHTML += `<p class="forecast-description">${descriptionFromAPI}</p>`;
  forecastHTML += `<p class="forecast-minmax">${maxTemp}°C / ${minTemp}°C</p>`;
  forecastHTML += `</div>`;
  return forecastHTML;
};

// Fetch to get Panama weather
const vacationContainer = document.getElementById('vacation-container');

fetch(`https://api.openweathermap.org/data/2.5/weather?q=Panama&units=metric&APPID=${API_KEY}`)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    vacationContainer.innerHTML += generateVacationHTML(json); //Calls generateVacationHTML to create data for vacation city
  })

  .catch((error) => {
    console.log(error);
  });

// Fetch to get Brussels weather
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Brussels&units=metric&APPID=${API_KEY}`)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    vacationContainer.innerHTML += generateVacationHTML(json); //Calls generateVacationHTML to create data for vacation city
  })

  .catch((error) => {
    console.log(error);
  });

// Fetch to get Seoul weather
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&APPID=${API_KEY}`)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    vacationContainer.innerHTML += generateVacationHTML(json); //Calls generateVacationHTML to create data for vacation city
  })

  .catch((error) => {
    console.log(error);
  });

//Function to get data for vacation cities
const generateVacationHTML = city => {
  //Get vacation city name
  const vacationCityName = city.name;

  //Get vacation city weather icon
  const vacationCityIcon = city.weather[0].icon;

  //Get vacation city temperature
  const vacationCityTemp = city.main.temp;

  // Create dynamic HTML code to return
  let vacationHTML = '';
  vacationHTML += `<div class="vacation-data-photo">`;  //created this extra div container for styling purposes: to create a flexbox
  vacationHTML += `<div class="vacation-city-container">`;
  vacationHTML += `<p>${vacationCityName}</p>`;
  vacationHTML += `<img class="vacation-city-icon" src='./assets/${vacationCityIcon}.png'>`;
  vacationHTML += `<p>${vacationCityTemp.toFixed()}°C</p>`;
  vacationHTML += `</div>`;
  vacationHTML += `<img class="vacation-city-photo" src='./assets/${vacationCityName}.jpg'>`;
  vacationHTML += `</div>`;
  return vacationHTML;
  };