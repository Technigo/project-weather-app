// Global variables
const API_KEY = '4b089f476bd9961f1c727a0625472b1f'
// let city = “Stockholm”;
let weather = document.getElementById('weather');
let sunrise = document.getElementById('sunrise');
let sunset = document.getElementById('sunset');
const city = document.getElementById('city');

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json.name)
        console.log(json.name)
        console.log(json.main.temp)
        console.log(json.weather[0].main)
        console.log(json);
        city.innerHTML = `${json.name}`;
        weather.innerHTML = `${json.weather[0].main}`;
    })

    // .then((json) => {
    //     city.innerHTML = `${ json.name } `;
    // })