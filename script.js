
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = "c88d356312a64bb962632770e0bd8c0f"
const CITY = "Stockholm,Sweden"
const UNITS = "metric"

const URL = `${BASE_URL}?q=${CITY}&units=${UNITS}&APPID=${API_KEY}`
console.log(URL)

fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log("Data:", data)
        
    })
    