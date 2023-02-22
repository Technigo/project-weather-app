
const city = document.getElementById("city");
const weatherToday = document.getElementById("weatherToday");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=515087c7fb02c4b2d4dca12b9e40bb14";


//Today's weather: city, temp, sunset and sunrise
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


// Weather 5 days 
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
        weekday: "short"
      });

      const dayTemperature = item.main.temp.toFixed(1);

      forecastFiveDayAndTemp.innerHTML= `<h5>${dayName}: ${dayTemperature} °C</h5>`
    })
})
}


forecastFiveDayAndTemp();


//https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=f60c361b4571fb70c85f29bbd856c13f
