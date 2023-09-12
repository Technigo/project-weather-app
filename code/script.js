const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=89d1a944a381d671e0d7eca3b8362f21";


let weatherObject;

const fetchWeather = () => {
    fetch(weatherURL)
        // gets raw data
        .then(response => response.json())
            // convert  Objekt to string
        .then(data => {
            console.log(data)
            weatherObject = data
            // console.log(weatherObject)
        })
};
fetchWeather();
setTimeout(() => console.log(weatherObject), 200);


const weatherData = document.getElementById('weather-container');

setTimeout(() => (weatherData.innerHTML =  `<p>${weatherObject.base}</p>`), 500);