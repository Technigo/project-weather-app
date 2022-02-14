
const weatherContainer = document.getElementById('weatherContainer');
const temperature = document.getElementById('temperature');
const city = document.getElementById('city');
const weatherDescription = document.getElementById('weatherDescription');
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c';

//v2 -Dynamic (based on user input value) fetch request

// movieSearchBar.addEventListener('change', (event)=>{

fetch(API_URL)//this is when we send something to BE

    .then((res) => res.json())//this is when we receive the data from BE
    .then((data) => {
        console.log('data', data);

        weatherContainer.innerHTML = `<h1 class="temperature" id="temperature">${data.main.temp}</h1>
        <h2 class="city" id="city">${data.name}</h2>
        <p  class="weather-description" id="weatherDescription">${data.weather[0].description}</p>`
;

        // data.Ratings.forEach(item => {
        //     movieContainer.innerHTML += `
        //     <div>
        //     <span>Source: ${item.Source}</span>
        //     <span>Value: ${item.Value}</span>
        //     </div>
        //     `
        // });
    });
