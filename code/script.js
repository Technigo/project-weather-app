const currentWeather = document.getElementById("currentWeather")
const tempContainer = document.getElementById("temperature")
const city = document.getElementById("city")
const time = document.getElementById("time")
const weather = document.getElementById("weather")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")


const fetchStockholmWeather = () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=5660c7e2a75e2c204e4b057312e71c93")
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)

        const temperature = (json.main.temp);
        const roundedTemperature = temperature.toFixed(1); // This will round to one decimal place
        console.log(roundedTemperature);

        tempContainer.innerHTML = `${roundedTemperature}`
        city.innerHTML = `${json.name}`
        //time.innerHTML = `${}`
        
        const weatherDescription = (json.weather[0].description)
        weather.innerHTML = `${weatherDescription}`
        //sunrise.innerHTML = `${}`
        //sunset.innerHTML = `${}`
    })
}

fetchStockholmWeather()


// Stad, current location, temp