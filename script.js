console.log("Hello world!");
const API_KEY = 
  "96cb0f55d34310e596ed4792c7800540"
const FORECAST_API = 
    "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&appid=96cb0f55d34310e596ed4792c7800540";
const WEATHER_API =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=96cb0f55d34310e596ed4792c7800540";
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");

const fetchData = () => {
  fetch(WEATHER_API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("This is data", data);
      console.log("This is data.main.temp", data.main.temp);

      // const decimal = Math.round(data.main.temp * 10) / 10;
      const decimal = num.toFixed(1); 
    

      weatherContainer.innerHTML = `
          <h2> City: ${data.name}</h2>
          <h3> Hello, the tempature is ${decimal}&#176 Celsius </h3>
          <h3> Type of weather: ${data.weather[0].description}</h3>
        `;
    })
    .catch((error) => {
      console.error("caught error", error);
    })
    .finally(() => {
      console.log("finished");
    });
};

fetchData();

const fetchForecastData = () => {
  fetch(FORECAST_API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      
      const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
      console.log("THIS IS THE filter", filteredForecast)

      filteredForecast.forEach((object) =>{
        console.log("This is the forecast data", filteredForecast[0].main.temp);
        console.log("this is the date", data.list[0].dt_txt)
  
         const decimal = Math.round((data.list[0].main.temp * 1) / 1);
         
        const date = new Date(data.list[0].dt_txt)
        const tomorrow = date.getDay();
        const forecastDay = tomorrow - 1
        console.log ("this is the day",tomorrow)
        console.log("this is dayx", forecastDay)
        console.log (date)
        
  
        var weekday=new Array(7);
          weekday[0]="Monday";
          weekday[1]="Tuesday";
          weekday[2]="Wednesday";
          weekday[3]="Thursday";
          weekday[4]="Friday";
          weekday[5]="Saturday";
          weekday[6]="Sunday";
         
       console.log(`Today is ${weekday[forecastDay]}`);
        
        forecastContainer.innerHTML += `
          <h3> Today is ${weekday[forecastDay]} </h3>
          <h3> the tempature is ${decimal}&#176 Celsius </h3>
        `;

      })
     




       
    })
    .catch((error) => {
      console.error("caught error", error);
    })
    .finally(() => {
      console.log("finished");
    });
};

fetchForecastData();