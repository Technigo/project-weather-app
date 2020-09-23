//DECLARATIONS

const apiUrlToday = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2faa65e280281f5043a14b9b24e7aea0';
const apiUrlWeekly = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2faa65e280281f5043a14b9b24e7aea0';
const temperaturHeader = document.getElementById('headerCelcius');
const locationHeader = document.getElementById('headerLocation');
const weatherHeader = document.getElementById('headerWeather');
const sunriseHeader = document.getElementById('headerSunrise');
const sunsetHeader = document.getElementById('headerSunset');
const containerDay = document.getElementById('weeklyWeatherDay');
const containerTemp = document.getElementById('weeklyWeatherTemp');

const isoCountries = {
  'SE' : 'Sweden',
}

//FUNCTIONS 

//fetch the data from api - todays forecast
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

    filteredForecast.forEach((day) => {
      containerDay.innerHTML += `<p class="weekly-weather-day">${generateDayName(day.dt)}</p>`
    });

    filteredForecast.forEach((temp) => {
      containerTemp.innerHTML += `<p class="weekly-weather-temp">${getNumberFormat(temp.main.temp)} °C</p>`
    });
  })

//function to convert temperature to 1 decimal
const getNumberFormat = (x) => {
  return Number.parseFloat(x).toFixed(1);
}

//function to convert country code to country name
const getCountryName = (countryCode) => {
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

//function to convert actual date to short weekday name
const generateDayName = (name) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
  const formatDay = new Date(name * 1000).getDay([]);
  const resultDay = days[formatDay];
    return resultDay;
}


/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
const myFunction = () => {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

