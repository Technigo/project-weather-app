
const fetchWeatherCity = () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=072c88c2b7f1a1c7fb7704f9f847b690")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const weatherCity = json;
        console.log(weatherCity);
  
      });
  };
  
  fetchWeatherCity();