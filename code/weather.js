const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=038843ef5b6fc0faa93abadfa0f18663'
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=038843ef5b6fc0faa93abadfa0f18663Y'
const container = document.getElementById('main');
const weatherHeader = document.getElementById('weatherHeader');

    fetch(apiUrl)
        .then((response) => {
            return response.json();
         })
        .then((weatherObjects) => {
        weatherHeader.innerHTML = weatherObjects.name + weatherObjects.weather[0].description + weatherObjects.main.temp
        });

        //Your task is to present the data: the city name, the temperature (rounded to 1 decimal place), and what type of weather it is (the "description" in the JSON)

        

