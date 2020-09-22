const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8b97619989976c72fc1e602d8c793890';

fetch(apiUrl).then((response) => {
    return response.json();
}).then((weather) => {
    container.innerHTML += `<h1>In ${weather.name} we have ${weather.main.temp} celsius right now. Clouds = ${weather.clouds.all}.</h1>`;
    console.log(weather)
});