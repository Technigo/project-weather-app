const container = document.getElementById('weather');

const latitude = 59.3293; // Replace with the latitude of location
const longitude = 18.0686; // Replace with the longitude of location
const limit = 1; // You can set the limit to 1 to get the closest result

const apiKey = '30497ceff63316bea65ec674ac0ba4c7';
const locationUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${apiKey}`;

fetch(locationUrl)
    .then((response) => response.json())
    .then((locationJson) => {
        console.log(locationJson);
        const locationName = locationJson[0].name; // Get the location name

        // Fetch 5-day weather forecast for the location
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&appid=${apiKey}`;

        return fetch(forecastUrl);
    })
    .then((response) => response.json())
    .then((forecastJson) => {


        // Display the location name
        container.innerHTML = `<h1>${forecastJson.city.name} Weather Forecast</h1>`;

        // Loop through the forecast data to display weather for the next 5 days
        for (let i = 0; i < forecastJson.list.length; i++) {
            const forecast = forecastJson.list[i];
            const dateTime = new Date(forecast.dt * 1000); // Convert timestamp to date
            const date = dateTime.toLocaleDateString(); // Format date

            // Display date, weather description, and temperature
            container.innerHTML += `<p>Date: ${date}</p>`;
            container.innerHTML += `<p>Weather: ${forecast.weather[0].description}</p>`;
            container.innerHTML += `<p>Temperature: ${forecast.main.temp} K</p>`;
            container.innerHTML += '<hr>'; // Add a horizontal line for separation
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });