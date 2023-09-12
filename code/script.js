const city = document.getElementById("cityName");
const tempToday = document.getElementById("tempToday");
const weatherDescription = document.getElementById("weatherDiscription");

const apiKey = "a0251d9b53172abcbe6a9263f3d13544";
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`)
.then((response) => {
    return response.json();
})
.then((json) => {
    console.log(json);
    city.innerText = `${json.name}`;
    tempToday.innerText = `${json.main.temp.toFixed(1)}`;
    weatherDescription.innerText = `${json.weather[0].description}`;
})