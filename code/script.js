const weatherDescription = document.getElementById('weatherDescription');
const container = document.getElementById('container');
const header = document.getElementById('header');
const forecastItems = document.getElementById('forecastItems');
const getLocationButton = document.getElementById('getLocationButton');

const apiKey = 'c99419c3837c41928558edb5e7e76294';

const fetchWeatherByLocation = (latitude, longitude) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((json) => {
            const sunRise = new Date(json.sys.sunrise * 1000);
            let sunRiseHoursAndMinutes = String(sunRise.getHours()).padStart(2, '0') + ':' + String(sunRise.getMinutes()).padStart(2, '0');

            const sunSet = new Date(json.sys.sunset * 1000);
            let sunSetHoursAndMinutes = String(sunSet.getHours()).padStart(2, '0') + ':' + String(sunSet.getMinutes()).padStart(2, '0');

            const weathers = json.weather;
            weathers.map((weather) => {
                header.innerHTML = `
                    <h3>${weather.description} | ${(json.main.temp).toFixed(1)}°</h3>
                    <h3>sunrise ${sunRiseHoursAndMinutes}</h3>
                    <h3>sunset ${sunSetHoursAndMinutes}</h3>
                `;

                switch (weather.main) {
                    case 'Clouds':
                        document.body.style.backgroundColor = '#F4F7F8';
                        container.style.color = '#F47775';
                        weatherDescription.innerHTML = `
                            <img src="cloud.svg" alt="cloud"/>
                            <h1>The sky is grey in ${json.name}. Maybe go for a lil walk with a podcast! </h1>
                        `;
                        break;

                    case 'Rain':
                        document.body.style.backgroundColor = '#A3DEF7';
                        container.style.color = '#164A68';
                        weatherDescription.innerHTML = `
                            <img src="umbrella.svg" alt="umbrella"/>
                            <h1>It's raining in ${json.name}. Have a cup of tea, put on Netflix and stay inside! </h1>
                        `;
                        break;

                    default:
                        console.log('sunny');
                        document.body.style.backgroundColor = '#F7E9B9';
                        container.style.color = '#2A5510';
                        weatherDescription.innerHTML = `
                            <img src="shades.svg" alt="sunglasses"/>
                            <h1>The sky is crispy and clear in ${json.name}. Put on your best shades and don't forget SPF!</h1>
                        `;
                }
            });
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
};

const fetchAndDisplay5DayForecast = (latitude, longitude) => {
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=8&APPID=${apiKey}`;

    fetch(forecastApiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.list && data.list.length >= 5) {
                forecastItems.innerHTML = ''; // Clear previous forecast items
                const dailyForecasts = {};

                data.list.forEach((forecast) => {
                    const date = new Date(forecast.dt * 1000);
                    const dateKey = date.toDateString();

                    // Group forecasts by date
                    if (!dailyForecasts[dateKey]) {
                        dailyForecasts[dateKey] = forecast;
                    }
                });

                // Iterate over the daily forecasts
                for (const dateKey in dailyForecasts) {
                    const forecast = dailyForecasts[dateKey];
                    const date = new Date(forecast.dt * 1000);
                    const temperature = forecast.main.temp;
                    const weatherDescription = forecast.weather[0].description;

                    const forecastItem = document.createElement('div');
                    forecastItem.classList.add('forecast-item'); // Add a class to the forecast item
                    forecastItem.innerHTML = `
                        <p>${date.toDateString()}</p>
                        <p>${temperature.toFixed(1)}°</p>
                        <p>${weatherDescription}</p>
                    `;
                    forecastItems.appendChild(forecastItem);
                }
            } else {
                console.error('Error fetching 5-day forecast data');
            }
        })
        .catch((error) => {
            console.error('Error fetching 5-day forecast data:', error);
        });
};



getLocationButton.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                fetchWeatherByLocation(latitude, longitude);
                fetchAndDisplay5DayForecast(latitude, longitude);
            },
            (error) => {
                console.error('Geolocation error:', error);
            }
        );
    } else {
        console.error('Geolocation is not supported in this browser.');
    }
});