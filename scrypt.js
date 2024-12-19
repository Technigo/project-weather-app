const apiKey = 'b96f5d1233fefd689026a287dc8fa6a9';

// Function to convert Unix time to hour time// Función para convertir tiempo Unix a formato de hora legible
function convertUnixTime(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

//Weather data function// Función para obtener el weather data
async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=b96f5d1233fefd689026a287dc8fa6a9`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if the response data get 'main' property// Verifica si la respuesta contiene la propiedad 'main'
        if (data.main) {
            document.getElementById('city-name').textContent = data.name;
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp.toFixed(1)} °C`;
            document.getElementById('weather-description').textContent = `Description: ${data.weather[0].description} `;

            // Get the icon weather code// Obtener el código del icono del clima
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            // Create or update the image icon on the DOM// Crear o actualizar la imagen del icono en el DOM
            const iconImg = document.getElementById('weather-icon');
            iconImg.src = iconUrl; // Establece la URL de la imagen
            iconImg.alt = data.weather[0].description; // Establece el texto alternativo

            document.getElementById('sunrise').textContent = `Sunrise: ${convertUnixTime(data.sys.sunrise)} `;
            document.getElementById('sunset').textContent = `Sunset: ${convertUnixTime(data.sys.sunset)} `;
        } else {
            console.error("Error: No se encontraron datos de clima para la ciudad especificada.");
            document.getElementById('temperature').textContent = 'No weather data available.';
        }
    } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
    }
}


// Function to get the 4 days forecast// Función para obtener el pronóstico de 4 días
async function getForecastData(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Delete former formcast// Limpiar pronóstico anterior

    // Filter to only get information from 12:00 each day// Filtrar para obtener solo la información de las 12:00 cada día
    const dailyForecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));

    dailyForecasts.slice(0, 4).forEach(forecast => {
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-day');
        forecastElement.innerHTML = `
            <p><strong>${new Date(forecast.dt * 1000).toLocaleDateString()}</strong></p>
            <p>Temp: ${forecast.main.temp.toFixed(1)} °C</p>
            <p>Min: ${forecast.main.temp_min.toFixed(1)} °C</p>
            <p>Max: ${forecast.main.temp_max.toFixed(1)} °C</p>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}

// Call functions on page load // Llamar a las funciones al cargar la página
getWeatherData('Stockholm,Sweden')
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

getForecastData('Stockholm,Sweden')
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

