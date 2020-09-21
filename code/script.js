import { API_KEY } from "./api.js";

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Karlstad,Sweden&units=metric&appid=${API_KEY}`)
.then((response) => {
    return response.json( )
})
.then((json) => {
    console.log(json)
})

fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Karlstad,Sweden&units=metric&appid=${API_KEY}`)
.then((response) => {
    return response.json( )
})
.then((json) => {
    console.log(json)
})
