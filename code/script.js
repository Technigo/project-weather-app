import { API_KEY } from "./api.js";

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Karlstad,Sweden&units=metric&appid=${API_KEY}`)
.then((response) => {
    return response.json( )
})
.then((json) => {
    console.log(json)
    containerCity.innerHTML = `<p>Presenting the weather in ${json.name}</p>`;
    containerTemp.innerHTML = `<p>The temperature is ${json.main.temp} degrees Celsius</p>`;
    containerDescription.innerHTML = `<p>Description: ${json.weather[0].description}</p>`;
})

fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Karlstad,Sweden&units=metric&appid=${API_KEY}`)
.then((response) => {
    return response.json( )
})
.then((json) => {
    console.log(json)
})
