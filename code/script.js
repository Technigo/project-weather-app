const tempToday = document.getElementById("temperatureToday");
const city = document.getElementById("city");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunriseTime");
const sunset = document.getElementById("sunsetTime");



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

    const sunriseMillSeconds = new Date(json.sys.sunrise * 1000);
    const sunriseProperTime = sunriseMillSeconds.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"});
    sunrise.innerHTML = sunriseProperTime;

    const sunsetMillSeconds = new Date(json.sys.sunset * 1000);
    const sunsetProperTime = sunsetMillSeconds.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    sunset.innerHTML = sunsetProperTime;
};