import { API_KEY } from "./api.js";

const API_URL_TODAY = `http://api.openweathermap.org/data/2.5/weather?q=Karlstad,Sweden&units=metric&appid=${API_KEY}`;
const API_URL_FORECAST = `http://api.openweathermap.org/data/2.5/forecast?q=Karlstad,Sweden&units=metric&appid=${API_KEY}`;

fetch(API_URL_TODAY)
.then((response) => {
    return response.json( )
})
.then((json) => {
    console.log(json)
    containerCity.innerHTML = `<p>Presenting the weather in ${json.name}</p>`;
    containerTemp.innerHTML = `<p>The temperature is ${json.main.temp} degrees Celsius</p>`;
    containerDescription.innerHTML = `<p>Description: ${json.weather[0].description}</p>`;

    const sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString('en-US', { timeStyle: "short" });
    containerSunrise.innerHTML = `<p>Sunrise at ${sunrise}</p>`;
    console.log(sunrise);
    let sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString('en-US', { timeStyle: "short" });
    containerSunset.innerHTML = `<p>Sunset at ${sunset}</p>`;
    console.log(sunset);
})

fetch(API_URL_FORECAST)
.then((response) => {
    return response.json( )
})
.then((json) => {
    console.log(json)
})


