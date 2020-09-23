const fetchWeather = () => {
  const weatherData =
    'http://api.openweathermap.org/data/2.5/weather?q=Sollefteå,Sweden&units=metric&APPID=e91b147ba928204edc2b66bba9327d4c';

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

      weatherContainer.innerHTML = `<h1>${city}</h1>`;
      weatherContainer.innerHTML += `<h2>${temp.toFixed(
        1
      )} ${description}</h2>`; //get an icon here
      weatherContainer.innerHTML += `<p>Feels like: ${tempFeelsLike.toFixed(
        1
      )}</p>`;
      weatherContainer.innerHTML += `<p>Sunrise ${sunriseTime}</p>`;
      weatherContainer.innerHTML += `<p>Sunset ${sunsetTime}</p>`;
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
        const localDateString = date.toLocaleDateString('sv-SE', options);
        const forecastContainer = document.getElementById('weather-container');
        forecastContainer.innerHTML += `<p>${localDateString} ${temp.toFixed(
          1
        )}</p>`;

        console.log(day);
      });
    });
};

fetchWeather();
fetchFiveDayForecast();
