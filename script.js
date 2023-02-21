// http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=775b6d69e24fcb088a070bee66d05057
const weatherHeader = document.getElementById("weather-header");
const mainSection = document.getElementById("main-section");
const weatherIcon = document.getElementById("weather-icon");
const weatherText = document.getElementById("weather-text");
const weekdays = document.getElementById("weekdays");
const temperature = document.getElementById("temperature");

fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=775b6d69e24fcb088a070bee66d05057"
)
  .then((present) => {
    console.log(present);
    return present.json();
  })
  .then((unwrappedPresent) => {
    console.log(unwrappedPresent);
    return unwrappedPresent;
  });
