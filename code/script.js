import { API_KEY } from './key.js';

const mainIcon = document.getElementById('main-icon');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    const mainIconID = json.weather[0].icon;
    mainIcon.src = `./assets/${mainIconID}.png`;

    cityName.innerText = `${json.name}`;
    temperature.innerText = `${Math.floor(json.main.temp)}°C`;
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
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
    .then((response) => {
      return response.json();
    })

    .then ((json) => {
      //Filters out forecast at 12:00 for coming 5 days
      const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));

      for (let i=0; i < filteredForecast.length; i++) {  //Loop to generate data to be shown for coming 5 days

        const unixDay = filteredForecast[i].dt;  // Date in UNIX
        const unixDayToMili = new Date(unixDay * 1000);  // Convert to nice date format we can use

        let weekday = unixDayToMili.getDay();  //getDay will return a number between 0-6, switch statement to return the date's name, not just a number
        switch (weekday) {
          case 0:
            weekday = "Sunday";
            break;
          case 1:
            weekday = "Monday";
            break;
          case 2:
            weekday = "Tuesday";
            break;
          case 3:
            weekday = "Wednesday";
            break;
          case 4:
            weekday = "Thursday";
            break;
          case 5:
            weekday = "Friday";
            break;
          case  6:
            weekday = "Saturday";
        };

        const dayElement = document.getElementById(`day${[i]}`);
        dayElement.innerText = `${weekday}`;
        
        const iconID = filteredForecast[i].weather[0].icon; //Gets icon code from API
        const iconElement = document.getElementById(`icon${[i]}`);
        iconElement.src = `./assets/${iconID}.png`;

        const minTemp = Math.floor(filteredForecast[i].main.temp_min); //Gets min and max temp from API and rounds it up
        const maxTemp = Math.floor(filteredForecast[i].main.temp_max);
        const minMaxTemp = document.getElementById(`minMax${[i]}`);
        minMaxTemp.innerText = `${minTemp}°C / ${maxTemp}°C`;

        const descriptionFromAPI = filteredForecast[i].weather[0].description; //Gets description from API
        const description = document.getElementById(`description${[i]}`);
        description.innerText = descriptionFromAPI;
      };
    })

    .catch((error) => {
      console.log(error);
    });

// Fetch to get Panama weather
fetch(`http://api.openweathermap.org/data/2.5/weather?q=Panama&units=metric&APPID=${API_KEY}`)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    const panamnaName = document.getElementById('panana-name');
    panamnaName.innerText = `${json.name}`;
    
    const panamaIcon = document.getElementById('panama-icon');
    const panamaIconID = json.weather[0].icon;
    panamaIcon.src = `./assets/${panamaIconID}.png`;

    const panamaTempElement = document.getElementById('panama-temp');
    const panamaTemp = json.main.temp;
    panamaTempElement.innerText = `${Math.floor(json.main.temp)}°C`;
  })

  .catch((error) => {
    console.log(error);
  });

// Fetch to get Seoul weather
fetch(`http://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&APPID=${API_KEY}`)
.then((response) => {
  return response.json();
})

.then((json) => {
  const seoulName = document.getElementById('seoul-name');
  seoulName.innerText = `${json.name}`;
  
  const seoulIcon = document.getElementById('seoul-icon');
  const seoulIconID = json.weather[0].icon;
  seoulIcon.src = `./assets/${seoulIconID}.png`;

  const seoulTempElement = document.getElementById('seoul-temp');
  const seoulTemp = json.main.temp;
  seoulTempElement.innerText = `${Math.floor(json.main.temp)}°C`;
})

.catch((error) => {
  console.log(error);
});

// Fetch to get Brussels weather
fetch(`http://api.openweathermap.org/data/2.5/weather?q=Brussels&units=metric&APPID=${API_KEY}`)
.then((response) => {
  return response.json();
})

.then((json) => {
  const brusselsName = document.getElementById('brussels-name');
  brusselsName.innerText = `${json.name}`;
  
  const brusselsIcon = document.getElementById('brussels-icon');
  const brusselsIconID = json.weather[0].icon;
  brusselsIcon.src = `./assets/${brusselsIconID}.png`;

  const brusselsTempElement = document.getElementById('brussels-temp');
  const brusselsTemp = json.main.temp;
  brusselsTempElement.innerText = `${Math.floor(json.main.temp)}°C`;
})

.catch((error) => {
  console.log(error);
});