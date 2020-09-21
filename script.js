const fetchWeather = () => {
  const weatherData =
    'http://api.openweathermap.org/data/2.5/weather?q=Sollefteå,Sweden&units=metric&APPID=e91b147ba928204edc2b66bba9327d4c';

  fetch(weatherData)
    .then((response) => {
      return response.json();
    })
    .then((weather) => {
      console.log(weather);
    });
};
fetchWeather();
