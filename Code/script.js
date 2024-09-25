//Stockholm current weather API
//URL current weather Stockholm + city + API key
// https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=959cb256f265cbbe5b4051e4a40be3af

// True constants
const API_KEY = "959cb256f265cbbe5b4051e4a40be3af";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

let city = "Stockholm";

const URL = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`;
console.log(URL)

fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data.weather)
  })




