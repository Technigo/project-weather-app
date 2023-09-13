const currentCity = document.getElementById('current-city');
const container = document.getElementById('weather');
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const swipeButton = document.getElementById('swipe-button');

const apiKey = '30497ceff63316bea65ec674ac0ba4c7';
//Fetch current data for when entering the page
function getWeatherData(city) {

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((currentWeatherJson) => {
            console.log(currentWeatherJson);

            // Display current weather information for the entered city
            container.innerHTML = `<h1>Current Weather in ${currentWeatherJson.name}, ${currentWeatherJson.sys.country}</h1>`;
            container.innerHTML += `<p>Temperature: ${currentWeatherJson.main.temp.toFixed(1)} °C</p>`;
            currentCity.innerHTML += `<img src="https://openweathermap.org/img/wn/${currentWeatherJson.weather[0].icon}@2x.png">`;
            container.innerHTML += `<p>Weather: ${currentWeatherJson.weather[0].description}</p>`;
        })
        .catch((error) => {
            console.log('Error', error)
        });
}

function weeklyForecast(city) {
    // Fetch current weather data for the entered city
    // Fetch 5-day weather forecast for the entered city
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    console.log(weeklyForecast)
    fetch(forecastUrl)
        .then((response) => response.json())
        .thesn((forecastJson) => {
            console.log(forecastJson);

            // Display the 5-day weather forecast for the entered city
            container.innerHTML += '<h2>5-Day Weather Forecast</h2>';


            const processedDates = []; //keep track of displayed dates just like with the dogs!!

            forecastJson.list.map((forecast) => {
                const dateTime = new Date(forecast.dt * 1000); // Convert timestamp to date
                const date = dateTime.toLocaleDateString(); // Format date

                // Display date, weather description, and temperature in Celsius
                if (!processedDates.includes(date)) {
                    container.innerHTML += `<p>Date: ${date}</p>`;
                    container.innerHTML += `<p>Weather: ${forecast.weather[0].description}</p>`;
                    container.innerHTML += `<p>Temperature: ${forecast.main.temp} °C</p>`;
                    container.innerHTML += `<p>Wind: ${forecast.wind.speed} m/s</p>`;
                    container.innerHTML += '<hr>'; // Add a horizontal line for separation

                    processedDates.push(date); // push method to array
                }
            });
        })
        .catch((error) => {
            console.error('Error', error)
        });
}

window.addEventListener('load', () => {
    getWeatherData('Stockholm');
    weeklyForecast('Stockholm');
});


//event listener for the searchbutton
searchButton.addEventListener('click', () => {
    const city = cityInput.value;

    // Ensure the user has entered a city name
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }


    getWeatherData(city);
    weeklyForecast(city);
});


