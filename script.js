const apiKey = '8b5546cda6f5f19b75c0a17daab06b19';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weeklyForecast = document.getElementById('weeklyForecast');


searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetch(`${apiUrl}?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                cityName.textContent = data.name;
                weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">`;
                temperature.textContent = `${(data.main.temp - 273.15).toFixed(1)}°C`;
                description.textContent = data.weather[0].description;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetch(`${apiUrl}?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                // ... Previous code ...

                // Fetch and display the weekly forecast
                fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
                    .then(response => response.json())
                    .then(forecastData => {
                        const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));
                        weeklyForecast.innerHTML = '';
                        dailyForecasts.forEach(forecast => {
                            const date = new Date(forecast.dt * 1000);
                            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
                            const icon = forecast.weather[0].icon;
                            const temp = (forecast.main.temp - 273.15).toFixed(1);
                            const description = forecast.weather[0].description;
                            const forecastItem = `
                                <div class="forecast-item">
                                    <p>${day}</p>
                                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
                                    <p>${temp}°C</p>
                                    <p>${description}</p>
                                </div>
                            `;
                            weeklyForecast.innerHTML += forecastItem;
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching weekly forecast data:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching current weather data:', error);
            });
    }
});

