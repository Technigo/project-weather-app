const currentCity = document.getElementById('current-city');
const container = document.getElementById('weather');
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const swipeButton = document.getElementById('swipe-button');
const weatherTableRow = document.getElementById('forecast-tr')

const apiKey = '30497ceff63316bea65ec674ac0ba4c7';

//Reusable functions:
//Convert a Unix timestamp into "hour:min" format
const formattedTime = (timestamp) => {
    sunStatusDate = new Date(timestamp * 1000);
    const hours = sunStatusDate.getHours();
    const minutes = sunStatusDate.getMinutes();
    const time = `
    ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return (time)
}


//----------------------  Part1  ------------------------------------------
//Fetch current data for when entering the page
getWeatherData = (city) => {

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((currentWeatherJson) => {
            console.log(currentWeatherJson);

            // Display current weather information for the entered city
            currentCity.innerHTML += `
            <h1>${currentWeatherJson.main.temp.toFixed(1)}°C </h1>
            `;
            currentCity.innerHTML += `
            <h2> ${currentWeatherJson.name}</h2>
            `;
            currentCity.innerHTML += `
            <h2>${formattedTime(currentWeatherJson.dt)}</h2>
            `
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

//--------------------Part 2  ---------------------------------
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
            weatherTableRow.innerHTML = ''; //clear content 

            const processedDates = []; //keep track of displayed dates just like with the dogs!!
            // weatherTable.innerHTML += `<tbody>`
            // weatherTableRow.innerHTML += `<tr>`
            forecastJson.list.map((forecast) => {
                const dateTime = new Date(forecast.dt * 1000); // Convert timestamp from seconds to ms adapted to Javascript
                const date = dateTime.toLocaleDateString(); // Formated date accordingly to the user's locale

                // Display date, weather description, and temperature in Celsius
                if (!processedDates.includes(date)) {//if the date is not in the processedDates array
                    weatherTableRow.innerHTML += `
                    <td>${date}</td>`;
                    weatherTableRow.innerHTML += `
                    <td> <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"> </td>`;
                    // container.innerHTML += `<p>${forecast.weather[0].description}</p>`;
                    weatherTableRow.innerHTML += `
                    <td>${forecast.main.temp.toFixed(1)} °C</td>`;
                    weatherTableRow.innerHTML += `
                    <td>${forecast.wind.speed} m/s</td>`;

                    processedDates.push(date); // push method to array
                }
            });
            // weatherTableRow.innerHTML += '</tr>';
            // weatherTable.innerHTML += '</tbody>';

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


