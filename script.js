const currentCity = document.getElementById('current-city');
const container = document.getElementById('weather');
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const swipeButton = document.getElementById('swipe-button');

const apiKey = '30497ceff63316bea65ec674ac0ba4c7';
//Fetch current data for when entering the page
getWeatherData = (city) => {

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((currentWeatherJson) => {
            console.log(currentWeatherJson);

            //Convert a Unix timestamp into "hour:min" format
            const formattedTime = (timestamp) => {
                sunStatusDate = new Date(timestamp * 1000);
                const hours = sunStatusDate.getHours();
                const minutes = sunStatusDate.getMinutes();
                const time = `
                ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                return (time)
            }

            // Display current weather information for the entered city
            currentCity.innerHTML += `
            <h1>${currentWeatherJson.main.temp.toFixed(1)}°C </h1>
            `;
            currentCity.innerHTML += `
            `
            currentCity.innerHTML += `
            <h2> ${currentWeatherJson.name}</h2>
            `;
            currentCity.innerHTML += `
            <p> ${currentWeatherJson.weather[0].description}</p>
            `;
            currentCity.innerHTML += `
            <img src="https://openweathermap.org/img/wn/${currentWeatherJson.weather[0].icon}@2x.png">
            `;
            currentCity.innerHTML += `
            <p> sunrise ${formattedTime(currentWeatherJson.sys.sunrise)} / sunset ${formattedTime(currentWeatherJson.sys.sunset)}
            `

        })
        .catch((error) => {
            console.log('Error type:', error)
        });
}

weeklyForecast = (city) => {
    // Fetch current weather data for the entered city
    // Fetch 5-day weather forecast for the entered city
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    console.log(weeklyForecast)
    fetch(forecastUrl)
        .then((response) => response.json())
        .then((forecastJson) => {
            console.log(forecastJson);

            // Display the 5-day weather forecast for the entered city 
            container.innerHTML = ''; //clear content 

            const processedDates = []; //keep track of displayed dates just like with the dogs!!

            forecastJson.list.map((forecast) => {
                const dateTime = new Date(forecast.dt * 1000); // Convert timestamp from seconds to ms adapted to Javascript
                const date = dateTime.toLocaleDateString(); // Formated date accordingly to the user's locale

                // Display date, weather description, and temperature in Celsius
                if (!processedDates.includes(date)) {//if the date is not in the processedDates array
                    container.innerHTML += `<p>Date: ${date}</p>`;
                    container.innerHTML += `<img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">`;
                    container.innerHTML += `<p>${forecast.weather[0].description}</p>`;
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


