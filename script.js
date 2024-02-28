//fetch API
const weatherInfo = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=0a3f5beba05e6db2d5da18ddf3283c92')
    .then(response => response.json())
    .then(data => console.log(data))
}
weatherInfo()