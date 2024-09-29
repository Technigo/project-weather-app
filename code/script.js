console.log('Vamos a la playa')

// https://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=f6ea1936f0499b177ea24494f76ba447

// https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=f6ea1936f0499b177ea24494f76ba447

const myCity = document.getElementById('cityWeather')
const theSun = document.getElementById('sunRiseSet')
const futureWeatherContainer = document.getElementById('futureWeather');

const weatherIcons = {
  '01d': 'https://openweathermap.org/img/wn/01d@2x.png', // clear sky, day
  '01n': 'https://openweathermap.org/img/wn/01n@2x.png', // clear sky, night
  '02d': 'https://openweathermap.org/img/wn/02d@2x.png', // few clouds, day
  '02n': 'https://openweathermap.org/img/wn/02n@2x.png', // few clouds, night
  '03d': 'https://openweathermap.org/img/wn/03d@2x.png', // scattered clouds, day
  '03n': 'https://openweathermap.org/img/wn/03n@2x.png', // scattered clouds, night
  '04d': 'https://openweathermap.org/img/wn/04d@2x.png', // broken clouds, day
  '04n': 'https://openweathermap.org/img/wn/04n@2x.png', // broken clouds, night
  '09d': 'https://openweathermap.org/img/wn/09d@2x.png', // shower rain, day
  '09n': 'https://openweathermap.org/img/wn/09n@2x.png', // shower rain, night
  '10d': 'https://openweathermap.org/img/wn/10d@2x.png', // rain, day
  '10n': 'https://openweathermap.org/img/wn/10n@2x.png', // rain, night
  '11d': 'https://openweathermap.org/img/wn/11d@2x.png', // thunderstorm, day
  '11n': 'https://openweathermap.org/img/wn/11n@2x.png', // thunderstorm, night
  '13d': 'https://openweathermap.org/img/wn/13d@2x.png', // snow, day
  '13n': 'https://openweathermap.org/img/wn/13n@2x.png', // snow, night
  '50d': 'https://openweathermap.org/img/wn/50d@2x.png', // mist, day
  '50n': 'https://openweathermap.org/img/wn/50n@2x.png', // mist, night
};

fetch('https://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=f6ea1936f0499b177ea24494f76ba447')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const temperature = json.main.temp; // Get the actual temperature
    const cityName = json.name;
    const weatherDescription = json.weather[0].description;
    const sunriseTimestamp = json.sys.sunrise;
    const sunsetTimestamp = json.sys.sunset;

    console.log(json)

    // Convert timestamps to date objects and format
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);
    const sunriseTime = sunriseDate.toLocaleTimeString('en-US',
      { timeStyle: 'short', hour12: false });
    const sunsetTime = sunsetDate.toLocaleTimeString('en-US', { timeStyle: 'short', hour12: false });



    const weatherIconCode = json.weather[0].icon;
    const iconUrl = weatherIcons[weatherIconCode] || 'https://openweathermap.org/img/wn/unknown.png'; // Default icon for unknown code

    cityWeather.innerHTML = `<h1>The temperature in ${cityName}, Sweden is ${temperature.toFixed(1)}°C.️</h1> <img class="l-icon" src="${iconUrl}" alt="${weatherDescription}"> <p>The weather is giving: ${weatherDescription}.</p>`;

    // Update the sunrise/sunset element
    theSun.innerHTML = `<p>Sunrise: ${sunriseTime}</p> <p>Sunset: ${sunsetTime}</p>`;
  })

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=f6ea1936f0499b177ea24494f76ba447')
  .then((response) => {
    return response.json();

  })
  .then((data) => {
    const today = new Date();

    // Find the closest noon forecast after the current time
    const noonForecasts = data.list.filter(forecast => {
      const forecastTime = new Date(forecast.dt_txt);
      return forecastTime.getHours() === 12 && forecastTime.getMinutes() === 0 && forecastTime > today;
    });

    if (noonForecasts.length > 0) {
      const futureWeatherDiv = document.getElementById('futureWeather');
      let htmlContent = '';

      // Show the next 4 noon forecasts
      for (let i = 0; i < Math.min(noonForecasts.length, 4); i++) {
        const forecast = noonForecasts[i];
        const forecastDate = new Date(forecast.dt_txt);
        const formattedDate = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });

        // Get weather icon code
        const weatherIconCode = forecast.weather[0].icon;

        // Get icon URL based on code or default
        const iconUrl = weatherIcons[weatherIconCode] || 'https://openweathermap.org/img/wn/unknown.png';

        htmlContent += `<ul>${formattedDate} <img class="s-icon" src="${iconUrl}" alt="${forecast.weather[0].description}">
          ${forecast.main.temp.toFixed(1)}°C</ul>`;
      }

      futureWeatherDiv.innerHTML = htmlContent;
    } else {
      console.log('No noon forecasts found for the next days');
    }
  })
  .catch((error) => {
    console.error('Error fetching weather data:', error);
  });