const API_TODAY = `
https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=7dee0e5a05b2c9d92a37a397279281ca
`;
const API_FORECAST = `
https://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&APPID=dfa433e7ce60074523483f09849d33d2
`;

const sectionToday = document.getElementById('today');
const sectionForecast = document.getElementById('forecast');

fetch(API_TODAY)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    sectionToday.innerHTML = `
    <p class="today-temp">clear | 23°</p>
    <p class="sunrise">sunrise 08.00</p>
    <p class="sunset">sunset 22.30</p>
    <img class="weather-icon" />
    <h1 class="today-title">Get your sunnies on. ${data.name} is looking rather great today.</h1>
    `;
  });

fetch(API_FORECAST)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    sectionForecast.innerHTML = `
    <div class="forecast-day-container">
     <p class="forecast-day">mon</p>
     <p class="forecast-day-temp">23°</p>
    </div>
    <div class="forecast-day-container">
     <p class="forecast-day">tue</p>
     <p class="forecast-day-temp">20°</p>
    </div>
    <div class="forecast-day-container">
     <p class="forecast-day">wed</p>
     <p class="forecast-day-temp">16°</p>
    </div>
    <div class="forecast-day-container">
     <p class="forecast-day">thu</p>
     <p class="forecast-day-temp">25°</p>
    </div>
    <div class="forecast-day-container">
     <p class="forecast-day">fri</p>
     <p class="forecast-day-temp">27°</p>
    </div>
    <div class="forecast-day-container">
     <p class="forecast-day">sat</p>
     <p class="forecast-day-temp">23°</p>
    </div>

    `;
  });
