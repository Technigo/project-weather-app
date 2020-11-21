const apiKey = '380f07f94efb48727a6ae5c8f7d15f5d';
const apiStockholm = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=380f07f94efb48727a6ae5c8f7d15f5d';
const apiFiveDaysForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=380f07f94efb48727a6ae5c8f7d15f5d';

//Weather Variables
const city = document.getElementById('city');
const weatherDescription = document.getElementById('weatherDescription');

const fiveDays = document.getElementById('fiveDays');
const temperatures = document.getElementById('temperatures');

fetch(apiStockholm)
    .then((response) => {
        return response.json();
})

.then((weatherObject) => {
    city.innerHTML = weatherObject.name;
    weatherDescription.innerHTML = weatherObject.weather[0].description
    temperatures.innerHTML = weatherObject.main.temp.toFixed(0.5) + " °C"

const weatherSunrise = () => {
    const dateSunrise = new Date(weatherObject.sys.sunrise * 1000);
    const timeSunrise = dateSunrise.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    document.getElementById('sunrise').innerHTML = timeSunrise;
  };
    weatherSunrise();


const weatherSunset = () => {
  const dateSunset = new Date(weatherObject.sys.sunset * 1000);
  const timeSunset = dateSunset.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
document.getElementById('sunset').innerHTML = timeSunset;
};
  weatherSunset();
})

fetch(apiFiveDaysForecast)
  .then((response) => {
    return response.json();    
  })

  .then((weatherObject) => {

    const filteredWeek = weatherObject.list.filter(item => item.dt_txt.includes('12:00'));

    filteredWeek.forEach(weekday => {
      const date = new Date(weekday.dt * 1000);
      const dayName = date.toLocaleDateString('en-US', {
        weekday: 'short'}) + ":"

      const temperature = Math.round(weekday.main.temp) + " °C"

      fiveDays.innerHTML += `<p> ${dayName} ${temperature}</p>`
    })
  })