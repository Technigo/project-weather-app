 // All the DOM selectors stored as variables
 const header = document.querySelector(".today-summary")
 const aboutWeather = document.querySelector(".about-weather")
 const weatherForecast = document.querySelector(".weather-forecast")

 // Global scope
 const api ="https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8d66acab5dd718723a370e1b64f22f8c"

 // STEP 1 - Fetching the data from the API
 const step1 = () => {
 fetch(api)
  .then((response) => {
     return response.json();
   })
/* STEP 2 - Present some data on your web app
    - the city name (h1)
    - the temperature (rounded to 1 decimal place) (h2)
    - and what type of weather it is (the "description" in the JSON) (h3) */
  .then((data) => {
    console.log(data);
    aboutWeather.innerHTML = `
    <h1>${data.name}</h1>
    <h2>${(Math.round(data.main.temp))}°C</h2>
    <h3>${data.weather[0].description}</h3>
    `
  })
}
step1();

// STEP 3 - Features
 /* Feature: Sunrise and sunset
 Show the time for sunrise and sunset in a readable time format (Example: 13:00 or 1 PM).
 You will have to format the date from milliseconds to a readable format. */








 


 /* Feature: Weather forecast
 Show a forecast for the next 5 days.
 You can choose how to display the forecast - perhaps you want to show the min and max temperature for each day,
 or perhaps you want to show the temperature from the middle of the day, or the humidity, what it feels like and so on. */









// Weather in Stockholm for the next five days.
const fiveForescastInStockholm = () => {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8d66acab5dd718723a370e1b64f22f8c")
  .then((response) => {
    return response.json();
  })
  .then((dataForTheNextFiveDay) => {
    console.log(dataForTheNextFiveDay);
    
  const filteredForecast = dataForTheNextFiveDay.list.filter(json => json.dt_txt.includes('12:00'))
  filteredForecast.forEach(json => {
    let temp = (json.main.temp).toFixed(0.5);
    console.log(temp)

    let fivedays = (new Date(json.dt * 1000)).toLocaleDateString("en-US", { weekday: "long" })
    console.log(fivedays)
    
    weatherForecast.innerHTML += `
    <p class="forecast">
    <span id="fiveday">${fivedays}</span>
    <span id="temp">${temp}ºC</span>
    </p>
    `
    });
  });
};
fiveForescastInStockholm();

