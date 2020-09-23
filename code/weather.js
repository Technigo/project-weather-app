//DECLARATIONS

const apiUrlToday = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2faa65e280281f5043a14b9b24e7aea0';
const apiUrlWeekly = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2faa65e280281f5043a14b9b24e7aea0';
const temperaturHeader = document.getElementById('headerCelcius');
const locationHeader = document.getElementById('headerLocation');
const weatherHeader = document.getElementById('headerWeather');
const sunriseHeader = document.getElementById('headerSunrise');
const sunsetHeader = document.getElementById('headerSunset');

const isoCountries = {
  'SE' : 'Sweden',
}

//FUNCTIONS 

//fetch the data from api
fetch(apiUrlToday)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    //retriving the temperature from json
    temperaturHeader.innerHTML = `${financial(json.main.temp)}°`
    //retriving the location from json
    locationHeader.innerHTML = `${json.name}, ${getCountryName(json.sys.country)}`
    //retriving the weather from json
    weatherHeader.innerHTML = `${json.weather[0].description}`
    //retriving the sunrise from json
    sunriseHeader.innerHTML = `sunrise: ${getTimeFormat(json.sys.sunrise)}`
    //retriving the sunset from json
    sunsetHeader.innerHTML = `sunset: ${getTimeFormat(json.sys.sunset)}`

})

//function to convert temperature to 1 decimal
function financial (x) {
  return Number.parseFloat(x).toFixed(1);
}

//function to convert country code to country name
function getCountryName (countryCode) {
  if (isoCountries.hasOwnProperty(countryCode)) {
      return isoCountries[countryCode];
  } else {
      return countryCode;
  }
}

//function to convert sunrise/sunset to readble format
const getTimeFormat = (time) => {
  const formatTime = new Date(time * 1000).toLocaleTimeString([],
  {hour: '2-digit', minute: '2-digit'});
  return formatTime;
}

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

