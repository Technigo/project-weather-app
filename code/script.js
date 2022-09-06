
const todaysWeather = document.getElementById('todays-weather');
const weatherCity = document.getElementById('weather-city');



const fetchWeatherData = () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=072c88c2b7f1a1c7fb7704f9f847b690")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const weatherData = json;
        console.log(weatherData);

        weatherCity.innerHTML = weatherData.name; 
        todaysWeather.innerHTML = `${weatherData.weather[0].description} | ${weatherData.main.temp.toFixed(1)}° `;
        //Check that it rounds corret way when the temp change - OK!!

        });
       
      };
 
  
  fetchWeatherData();
