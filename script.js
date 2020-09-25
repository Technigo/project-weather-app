const fetchWeather = () => {
  const weatherData =
    'https://api.openweathermap.org/data/2.5/weather?q=Sollefteå,Sweden&units=metric&APPID=e91b147ba928204edc2b66bba9327d4c';

  fetch(weatherData)
    .then((response) => {
      return response.json();
    })
    .then((weather) => {
      const city = weather.name;
      const temp = weather.main.temp;
      const tempFeelsLike = weather.main.feels_like;
      const description = weather.weather[0].main;
      const sunrise = new Date(weather.sys.sunrise * 1000);
      const sunriseTime = sunrise.toLocaleTimeString([]);
      const sunset = new Date(weather.sys.sunset * 1000);
      const sunsetTime = sunset.toLocaleTimeString([]);
      const weatherContainer = document.getElementById('weather-container');
      const sunContainer = document.getElementById('sunrise-sunset-container');
      const bigWeatherIconContainer = document.getElementById(
        'todays-weather-icon'
      );
      const weatherIcon = weather.weather[0].icon;

      bigWeatherIconContainer.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png">`;

      weatherContainer.innerHTML += `<h1>${temp.toFixed(1)}&degC </h1>`;
      weatherContainer.innerHTML += `<h2>${city}</h2>`;
      weatherContainer.innerHTML += `<h3>${description}</h3>`;
      weatherContainer.innerHTML += `<p>Feels like: ${tempFeelsLike.toFixed(
        1
      )}</p>`;
      sunContainer.innerHTML += `<p>Sunrise ${sunriseTime}</p>`;
      sunContainer.innerHTML += `<p>Sunset ${sunsetTime}</p>`;

      console.log(weather);
    });
};

const fetchFiveDayForecast = () => {
  const fiveDaysWeather =
    'https://api.openweathermap.org/data/2.5/forecast?q=Sollefteå,Sweden&units=metric&APPID=e91b147ba928204edc2b66bba9327d4c';

  fetch(fiveDaysWeather)
    .then((response) => {
      return response.json();
    })
    .then((weatherForecast) => {
      const filterForecast = weatherForecast.list.filter((item) =>
        item.dt_txt.includes('12:00')
      );

      filterForecast.forEach((day) => {
        const temp = day.main.temp;
        const date = new Date(day.dt_txt);
        const options = { weekday: 'short' };
        const forecastIcon = day.weather[0].icon;
        const localDateString = date.toLocaleDateString('en-EN', options);
        const forecastDayContainer = document.getElementById('forecast-date');
        const forecastIconContainer = document.getElementById('forecast-icon');
        const forecastTempContainer = document.getElementById('forecast-temp');

        forecastDayContainer.innerHTML += `<p>${localDateString}</p>`;

        forecastIconContainer.innerHTML += `<img src="http://openweathermap.org/img/wn/${forecastIcon}@2x.png">`;
        forecastTempContainer.innerHTML += `<p>${temp.toFixed(1)}&degC</p>`;
      });
    });
};

fetchWeather();
fetchFiveDayForecast();
