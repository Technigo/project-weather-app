const city = document.getElementById("city");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weekdays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
];

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=25b3459d6eea6c3844f60f68deed9511")
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json);
        let sunRise = new Date (json.city.sunriese *1000);
        let sunSet = new Date (json.city.sunriese *1000);
        city.innerHTML = json.city.name;
    })