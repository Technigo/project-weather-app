const weatherRightNow = document.getElementById('weather-right-now')
const SunsetSunrise = document.getElementById('sunset-sunrise')
const forecast = document.getElementById('forecast')
document.body.style.fontFamily = 'MyCustomFont, sans-serif';


// Weather in sthlm right now

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3492ebb354e19f61676ca7b4ced6d196')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const temperature = json.main.temp.toFixed(0);
        const description = json.weather[0].description;
        const sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timestamp = new Date(json.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        weatherRightNow.innerHTML = `<h1>${json.name}</h1>`;
        weatherRightNow.innerHTML += `<h2>${temperature}°C</h2>`;
        weatherRightNow.innerHTML += `<p>Time: ${timestamp}</p>`;
        weatherRightNow.innerHTML += `<h2>${description}</h2>`;
        weatherRightNow.innerHTML += `<p>Sunrise: ${sunrise} | Sunset: ${sunset}</p>`;
    })
    .catch((error) => {
        console.error('Error fetching weather data:', error);
    });


fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=3492ebb354e19f61676ca7b4ced6d196')
    .then(response => response.json())
    .then(data => {
        const forecast = document.getElementById('forecast');
        forecast.innerHTML = '';  // Töm tidigare innehåll

        // Filtrera ut prognoserna för idag och fyra dagar framåt
        const today = new Date().getDate();  // Dagens datum
        const dailyForecasts = [];

        data.list.forEach(item => {
            const itemDate = new Date(item.dt_txt).getDate();  // Datum för varje prognos

            // Vi vill bara hämta en prognos per dag, och se till att det är en ny dag
            if (!dailyForecasts.some(f => new Date(f.dt_txt).getDate() === itemDate)) {
                dailyForecasts.push(item);
            }
        });

        // Begränsa till idag + fyra dagar framåt
        const forecastDays = dailyForecasts.slice(1, 5);

        // Iterera över de valda dagarna och skriv ut prognosen
        forecastDays.forEach(item => {
            forecast.innerHTML += `
                <div class="forecast-day">
                    <p>${new Date(item.dt_txt).toLocaleDateString('sv-SE', { weekday: 'short' })}</p>
                    <p>${item.weather[0].description}</p>
                    <p>${item.main.temp.toFixed(0)}°C</p>
                    <p>${item.wind.speed} m/s</p>
                </div>
            `;
        });
    })
    .catch(error => console.log('Error fetching data:', error));



