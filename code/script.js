/* https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5373360ef0e1b72c0fef*/

const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4efc415dbf1df503974ec65e3563d721"

fetch(API_URL)
.then(res => res.json())
.then(data => console.log(data))
