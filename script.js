console.log("🌻 Script connected")
//ea9a90c62aeaaa3811505087d195520e
//https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ea9a90c62aeaaa3811505087d195520e
// base URL + api key


//True constants (SNAKECASE)
const API_KEY = "ea9a90c62aeaaa3811505087d195520e"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID="

const URL = (`${BASE_URL}${API_KEY}`)

console.log (URL)