//DOM elements
const weatherToday = document.getElementById("weather-today");

//variables

// fetch basic weather data for Zurich
const weatherZurich = () => {
  fetch(
    // "http://api.openweathermap.org/geo/1.0/zip?zip=8045,CH&appid=bac28b010cea73460ead078a7d8aa965"
    "https://api.openweathermap.org/data/2.5/weather?q=Zurich,Switzerland&units=metric&APPID=bac28b010cea73460ead078a7d8aa965"
  )
    .then((response) => response.json())
    .then((data) => {
      //set the city name in HTML
      weatherToday.innerHTML = `<h1>${data.name}</h1><p>${data.main.temp}</p><p>${data.weather[0].description}</p>`;
      console.log(data);
    });
};
weatherZurich();
