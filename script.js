// DOM / API
const city = document.getElementById("city");
const weatherToday = document.getElementById("weatherToday");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const weatherIcon = document.querySelector('.icon');

const weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=515087c7fb02c4b2d4dca12b9e40bb14";


//TODAY'S WEATHER - CITY, TEMP
const getCurrentWeatherData = () => {

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=515087c7fb02c4b2d4dca12b9e40bb14')

  .then((response) => { 
  return response.json();
    })
  
  .then((data) => {
console.log(data);
temperature.textContent=data.main.temp
city.textContent=data.name
weatherToday.textContent=data.weather[0].description
weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`




// SUNRISE AND SUNSET SHOWING
sunrise.textContent=`Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})}`

sunset.textContent=`Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})}`

})
}

getCurrentWeatherData();

// 5 DAY WEATHER FORECAST WITH TEMPERETURE
const forecastFiveDayAndTemp = () => {
const forecastFiveDayAndTemp = document.getElementById("forecastFiveDayAndTemp");
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=515087c7fb02c4b2d4dca12b9e40bb14')
.then((response) => {
  return response.json();
})
  .then((json) => {
  const filteredForecast = json.list.filter(item =>
    item.dt_txt.includes('12:00'));
    console.log(filteredForecast);

    filteredForecast.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayName = date.toLocaleDateString("en-US", {
        weekday: "long"
      });

    const dayTemperature = item.main.temp.toFixed(1);
    console.log(date, dayName, dayTemperature);

    forecastFiveDayAndTemp.innerHTML+= `<h5>${dayName}: ${dayTemperature} &deg;C</h5>`
    })
})
}
forecastFiveDayAndTemp();
