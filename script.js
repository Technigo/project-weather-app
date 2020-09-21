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
      const sunrise = weather.sys.sunrise;
      const sunset = weather.sys.sunset;
      const weatherContainer = document.getElementById('weather-container');

      weatherContainer.innerHTML = `${city} ${temp.toFixed(
        1
      )} ${description} Feels like: ${tempFeelsLike.toFixed(1)}`;

      console.log();
    });
};
fetchWeather();

//the data i want
//town
//sunrise
//sunset
//temp
//feels like
//description
