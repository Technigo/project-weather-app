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
      )} ${description}</h2>`;
      weatherContainer.innerHTML += `<p>Feels like: ${tempFeelsLike.toFixed(
        1
      )}</p>`;
      weatherContainer.innerHTML += `<p>Sunrise ${sunriseTime}</p>`;
      weatherContainer.innerHTML += `<p>Sunset ${sunsetTime}</p>`;
      console.log(weather);
    });
};
fetchWeather();
