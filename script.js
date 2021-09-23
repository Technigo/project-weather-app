console.log("Hello world!");
const API_KEY =
  "96cb0f55d34310e596ed4792c7800540"
const FORECAST_API =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&appid=96cb0f55d34310e596ed4792c7800540";
const WEATHER_API =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=96cb0f55d34310e596ed4792c7800540";
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const sunriseContainer = document.getElementById("sunrise");
const sunsetContainer = document.getElementById("sunset");
const mainContainer = document.getElementById('mainWeather')

const fetchData = () => {
  fetch(WEATHER_API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("This is data", data);
      console.log("This is data.main.temp", data.main.temp);

      const decimal = (data.main.temp).toFixed(1) // 

      // a variable for main images depending on the weather comes from JSON
      const idForMainImage = data.weather[0].main
      // to change the bg-image depending on the data weather
      mainContainer.style.backgroundImage = `url(./Designs/Design-1/mainImages/${idForMainImage}.png)`

      weatherContainer.innerHTML = `
          <h1>${decimal}°C</h1>
          <h2>${data.name}</h2>
          <h3>${data.weather[0].description}</h3>          
        `;

        const sunriseData = new Date(data.sys.sunrise * 1000) //Converts UNIX/EPOCH time to readable human time
        const sunsetData = new Date(data.sys.sunset * 1000) //Converts UNIX/EPOCH time to readable human time
        const sunriseString = sunriseData.toLocaleTimeString('en-SE', {hour: '2-digit', minute:'2-digit'}) //toLocaleTimeString reduces data to only show hh:mm
        const sunsetString = sunsetData.toLocaleTimeString('en-SE', {hour: '2-digit', minute:'2-digit'}) //toLocaleTimeString reduces data to only show hh:mm
  
        console.log(sunriseData, sunsetData)
  
        sunriseContainer.innerHTML = `
        <h3>Sunrise ${sunriseString}</h3>`
        sunsetContainer.innerHTML = `
        <h3>Sunset ${sunsetString}</h3>`
        
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

      // display the next 5 days  with filtered info (once a day at 12:00)
      const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
      console.log("THIS IS THE filter", filteredForecast)

      // forEach 5 days info for each days in the filtered array
      filteredForecast.forEach((object) => {

        const decimal = (object.main.temp).toFixed(0) // make the temperature integer

        const date = new Date(object.dt_txt); // full date with day month and year
        const days = date.toLocaleDateString('en-SE', {
          weekday: 'long'
        }); // display the day with the name only Tuesday,Wednesday,Monday etc.. 
        console.log("the next day is", days) // the next day is wednesday etc. 


        console.log("the next day is", object.weather[0].main)

        // 5 days name & temperature & description of the weather
        const idForIcons = object.weather[0].main
        forecastContainer.innerHTML += ` 
        <div class="forecast-days">
          <div>
          <h4 class="day"> ${days} </h4>
          </div>
          <div class="iconandtemp">
          <img id="iconID" class="icons" alt="" src="./Designs/Design-1/icons/${idForIcons}.png">
          <h4 class="temp"> ${decimal}°C</h4>
          </div>
        </div>
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