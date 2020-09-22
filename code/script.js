const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=380f07f94efb48727a6ae5c8f7d15f5d';
const container = document.getElementById("main");

fetch(apiUrl)
    .then((response) => {
        return response.json();
})
.then((weather) => {
    console.log(weather);
});

