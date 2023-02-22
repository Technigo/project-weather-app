// All the DOM selectors stored as variables
const header = document.querySelector(".today-summary")
const aboutWeather = document.querySelector(".about-weather")
const weatherForecast = document.querySelector(".weather-forecast")

// STEP 1 - Fetching the data from the API
fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8d66acab5dd718723a370e1b64f22f8c")
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

// STEP 3 - Features
/* Feature: Sunrise and sunset
Show the time for sunrise and sunset in a readable time format (Example: 13:00 or 1 PM).
You will have to format the date from milliseconds to a readable format. */












/* Feature: Weather forecast
Show a forecast for the next 5 days.
You can choose how to display the forecast - perhaps you want to show the min and max temperature for each day,
or perhaps you want to show the temperature from the middle of the day, or the humidity, what it feels like and so on. */









































// Feature: Styling
//Function to show different backgrounds, colors and pictures depening on what the weather is.
const filterWeather = () => {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8d66acab5dd718723a370e1b64f22f8c")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    if (json.list[0].weather[0].main == 'Clouds') {
      document.body.style.backgroundColor = "#F4F7F8";
      document.body.style.color = "#F47775";
      aboutWeather.innerHTML = `
      <img class="weather-img" src="./Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="cloud img">
      <h2>Light a fire and get cosy. ${json.city.name} is looking grey today.</h2>
      `
    } else if (json.list[0].weather[0].main == 'Rain') {
      document.body.style.backgroundColor = "A3DEF7";
      document.body.style.color = "#164A68";
      aboutWeather.innerHTML = `
      <img class="weather-img" src="./Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="umbrella icon">
      <h2>Don't forget your umbrella. It's wet in ${json.city.name} today.</h2>
      `
    } else {
      document.body.style.backgroundColor = "F7E9B9";
      document.body.style.color = "#2A5510";
      aboutWeather.innerHTML = `
      <img class="weather-img" src="./icons/noun_Sunglasses_2055147.svg" alt="sun-glasses icon">
      <h2>Get your sunnies on. ${json.city.name} is looking rather great today.</h2>
      `
    }
  })
}
filterWeather();