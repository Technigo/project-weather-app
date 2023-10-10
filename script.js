//FETCH API

const URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=231ff309be8ceb223aff125da6bf7bb2';
let weatherData = [];

fetch(URL)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        weatherData = json;
        console.log(weatherData);
    })
    .catch((err) => {
        console.log('caught error', err);
    });