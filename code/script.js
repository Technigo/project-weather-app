const apiKey = '380f07f94efb48727a6ae5c8f7d15f5d';
const apiStockholm = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=380f07f94efb48727a6ae5c8f7d15f5d';
const apiFiveDaysForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=380f07f94efb48727a6ae5c8f7d15f5d';

//Weather Variables
const city = document.getElementById('city');
const weatherDescription = document.getElementById('weatherDescription');
// const sunrise = document.getElementById('sunrise');
// const sunset = document.getElementById('sunset');
const fiveDays = document.getElementById('fiveDays');
const temperatures = document.getElementById('temperatures');

fetch(apiStockholm)
    .then((response) => {
        return response.json();
})

.then((weatherObject) => {
    city.innerHTML = weatherObject.name;
    weatherDescription.innerHTML = weatherObject.weather[0].description.toUpperCase()
    temperatures.innerHTML = weatherObject.main.temp.toFixed(0.5)
    
    // I've tried to solve the sunrise/sunset to show hhh:mm but didn't suceed. 
    // Have googled, asked in group chat and read every question I could find on Stack without understanding.
    // Would very much like to get some help to understand this one.

const weatherSunrise = () => {
    const dateSunrise = new Date(json.sys.sunrise * 1000);
    const timeSunrise = dateSunrise.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  document.getElementById('sunrise').innerHTML = timeSunrise;
  };
    weatherSunrise();
})

// Don't know why I can't get the forecast "apifiveDaysForecast" to work. 
// I believe I have done it in the exactly same way as with "apiStockholm".

fetch(apiFiveDaysForecast)
    .then((response) => {
        return response.json();
})

// // Five days forecast

const filteredWeek = json.list.filter(item => item.dt_txt.includes('12:00'));