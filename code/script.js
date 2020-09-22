const tempToday = document.getElementById("temperatureToday");
const city = document.getElementById("city");
const description = document.getElementById("description");



fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e3f7767c281ddc6599588c383f72962d")
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        updateWeatherToday(json);
    });


const updateWeatherToday = (json) => {
    tempToday.innerHTML = json.main.temp.toFixed(1);
    city.innerHTML = json.name;
    description.innerHTML = json.weather[0].description;
}