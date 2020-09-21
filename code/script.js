
const city = document.getElementById('city');
const currentTemperature = document.getElementById('currentTemperature');
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7d8d53e0c0365a01e3359eb496ea9fef';

fetch(apiUrl)
.then(response => {
    return response.json();
})
.then((weatherObject) => {
    console.log(weatherObject);
    console.log(weatherObject.main);
    console.log(weatherObject.main.humidity);
    console.log(weatherObject.wind.speed);
    console.log(weatherObject.main.feels_like);
    console.log(weatherObject.main.temp_min);
    console.log(weatherObject.main.temp_max);
    console.log(weatherObject.sys.sunrise);
    console.log(weatherObject.sys.sunset);
    city.innerHTML = weatherObject.name;
    currentTemperature.innerHTML = weatherObject.main.temp;
    console.log(weatherObject.weather[0]); //check how to access weather description

    
})