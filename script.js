// const city = document.getElementById('city')
// const weather = document.getElementById('weather')
// const temperature = document.getElementById('temperature')
// const forecast = document.getElementById('forecast')
// const sunrise = document.getElementById('sunrise')
// const sunset = document.getElementById('sunset')

// const API_KEY = "b881032f7a405f3e6e05ebbfb98e3e49"

// let cityName = "Stockholm"
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;


// const fetchWeather = () => {
//     console.log(fetchWeather)
//     fetch(url)
//         .then((respons) => respons.json())
//         .then((data) => {
//             console.log(data)
//             city.innerHTML = `${data.name}`;
//             weather.innerHTML = `${data.weather[0].description}`;
//             temperature.innerHTML = `${data.main.temp.toFixed(1)}°C`;
//         })
//         .catch((error) => {
//             console.log('Error', error)
//         });

// }

// fetchWeather()

// const calculateSunrise = (data) => {
//     const unixTimestamp = data.sys.sunrise // seconds
//     const sunRiseTimestamp = unixTimestamp * 1000 //milliseconds
//     const sunriseDate = new Date(sunRiseTimestamp)
// }

// weatherData = () => {

//     currentCity.innerHTML = '';
//     const fetchWeather = () => {
//         fetch(url)
//             .then((respons) => respons.json())
//             .then((data) => {
//                 console.log(data)
//                 //
//                 city.innerHTML = `${data.name}`;
//                 weather.innerHTML = `${data.weather[0].description}`;
//                 temperature.innerHTML = `${data.main.temp}`;
//             })
//             .catch((error) => {
//                 console.log('Error', error)
//             });
//     }

const cityElement = document.getElementById('city');
const weatherElement = document.getElementById('weather');
const temperatureElement = document.getElementById('temperature');
const forecastElement = document.getElementById('forecast');
const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');

const API_KEY = "b881032f7a405f3e6e05ebbfb98e3e49";

let cityName = "Stockholm";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;

const fetchWeather = () => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            cityElement.innerHTML = `${data.name}`;
            weatherElement.innerHTML = `${data.weather[0].description}`;
            temperatureElement.innerHTML = `${data.main.temp.toFixed(1)}°C`;

            // Calculate and display sunrise time
            calculateSunrise(data.sys.sunrise);
        })
        .catch((error) => {
            console.log('Error', error);
        });
};

const calculateSunrise = (unixTimestamp) => {
    const sunRiseTimestamp = unixTimestamp * 1000; // milliseconds
    const sunriseDate = new Date(sunRiseTimestamp);

    const hours = sunriseDate.getHours().toString().padStart(2, '0');
    const minutes = sunriseDate.getMinutes().toString().padStart(2, '0');

    sunriseElement.innerHTML = `${hours}:${minutes}`;
};

fetchWeather();

const weeklyForecastElement = document.getElementById('weekly-forecast'); // Add an element in your HTML for displaying the weekly forecast

const fetchWeeklyForecast = () => {
    const weeklyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`;

    fetch(weeklyUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // Filter the data for the next 7 days (assuming daily data is available)
            const dailyForecasts = data.list.filter((forecast) => {
                const forecastDate = new Date(forecast.dt * 1000);
                const currentDate = new Date();
                return forecastDate.getDate() !== currentDate.getDate();
            });

            // Clear previous forecasts
            weeklyForecastElement.innerHTML = '';

            // Display the weekly forecast
            dailyForecasts.forEach((forecast) => {
                const forecastDate = new Date(forecast.dt * 1000);
                const dayOfWeek = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
                const temperature = forecast.main.temp.toFixed(1);
                const description = forecast.weather[0].description;

                const forecastItem = document.createElement('div');
                forecastItem.classList.add('forecast-item');
                forecastItem.innerHTML = `
                    <div class="day">${dayOfWeek}</div>
                    <div class="temperature">${temperature}°C</div>
                    <div class="description">${description}</div>
                `;
                weeklyForecastElement.appendChild(forecastItem);
            });
        })
        .catch((error) => {
            console.log('Error', error);
        });
};

// Call the fetchWeeklyForecast function to get the weekly forecast
fetchWeeklyForecast();

