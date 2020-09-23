const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8b97619989976c72fc1e602d8c793890';


fetch(apiUrl).then((response) => {
    return response.json();
}).then((json) => {
    container.innerHTML += `<h1>In ${json.name} temperature is ${json.main.temp.toFixed(1)} celsius right now.</h1>`;
    //.toFixed(1) rounds the temperature to 1 decimal
    
    json.weather.forEach((weather) => {
    container.innerHTML += `<p>The weather is ${weather.description}</p>`
    });
    console.log(json)
});