//DECLARATIONS

const apiUrlToday = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2faa65e280281f5043a14b9b24e7aea0';
const apiUrlWeekly = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2faa65e280281f5043a14b9b24e7aea0';
const temperaturHeader = document.getElementById('headerCelcius');
const locationHeader = document.getElementById('headerLocation');
const weatherHeader = document.getElementById('headerWeather');
const sunriseHeader = document.getElementById('headerSunrise');
const sunsetHeader = document.getElementById('headerSunset');
const weeklyWeather = document.getElementById('weeklyWeather');
const weatherBackground = document.getElementById('weatherBackground');

//FUNCTIONS 

//fetch the data from api & generate html - todays forecast
fetch(apiUrlToday)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    //retriving the temperature from json
    temperaturHeader.innerHTML = `${getNumberFormat(json.main.temp)}°C`
    //retriving the location from json
    locationHeader.innerHTML = `${json.name}, ${getCountryName(json.sys.country)}`
    //retriving the weather from json
    weatherHeader.innerHTML = `${json.weather[0].description}`
    //retriving the sunrise from json
    sunriseHeader.innerHTML = `${getTimeFormat(json.sys.sunrise)}`
    //retriving the sunset from json
    sunsetHeader.innerHTML = `${getTimeFormat(json.sys.sunset)}`
    //change background depending on weather
    backgroundChange(json);
  })
  .catch((error) => {
    console.log('Fetch Error', error)
  })

//fetch the data from api - weekly forecast
fetch(apiUrlWeekly)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    //filter only data from 12.00
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));
    console.log(filteredForecast);

    //add html content for weekly forecast
    filteredForecast.forEach((day) => {
      weeklyWeather.innerHTML += generateHTMLForDay(day);
    });
  })
  .catch((error) => {
    console.log('Fetch Error', error)
  })

// generate HTML for weekly forecast 
const generateHTMLForDay = (day) => {
  const weekDay = generateDayName(day.dt);
  const temperature = getNumberFormat(day.main.temp);
  const changeIcon = weatherIcon(day.weather[0].main);

  let dayHTML = '';
  dayHTML += `<div class ="weekly-forecast">`;
  dayHTML += `<p class="weekly-weather-day">${weekDay}</p>`;
  dayHTML += `<img class="forecast-icon" src="${changeIcon}" alt="picture of weather">`;
  dayHTML += `<p class="weekly-weather-temp">${temperature} °C</p>`;
  dayHTML += `</div>`;
  return dayHTML;
}

//function to convert temperature to 1 decimal
const getNumberFormat = (x) => {
  return Number.parseFloat(x).toFixed(0);
}

//function to convert country code to country name
const getCountryName = (countryCode) => {
  const isoCountries = {
    'SE' : 'Sweden',
  }
  if (isoCountries.hasOwnProperty(countryCode)) {
      return isoCountries[countryCode];
  } else {
      return countryCode;
  }
}

//function to convert sunrise/sunset time to readble format
const getTimeFormat = (time) => {
  const formatTime = new Date(time * 1000).toLocaleTimeString([],
  {hour: '2-digit', minute: '2-digit'});
    return formatTime;
}

//function to convert actual date to  weekday name
const generateDayName = (name) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
  const formatDay = new Date(name * 1000).getDay([]);
  const resultDay = days[formatDay];
    return resultDay;
}

//function to change background depending on temp 
const backgroundChange = (number) => { 
  if (number.main.temp <= 15) {
      weatherBackground.classList.add('header-weather-wrapper-cold')
  } else { 
      weatherBackground.classList.remove('header-weather-wrapper-cold')
  }
}

//function to change weather icon on forecast
const weatherIcon = (condition) => {
  if (condition === 'Clear') {
    return ('icons/clear-sky.png');
  } else if (condition === 'Clouds') {
    return ('icons/broken-clouds.png');
  } else if (condition === 'Rain') {
    return ('icons/shower-rain.png'); 
  } else if (condition === 'Drizzle') {
    return ('icons/rain.png');
  } else if (condition === 'Thunderstorm') {
    return ('icons/thunderstorm.png');
  } else if (condition === 'Snow') {
    return ('icons/snow.png');
  } else if (condition === 'Mist') {
    return ('icons/mist.png')
  }
} 

//function for hamburger menu
const menuToggle = () => {
  const x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

