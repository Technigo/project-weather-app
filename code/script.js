
const todaysWeather = document.getElementById('todays-weather');
const weatherCity = document.getElementById('weather-city');
const forecast = document.getElementById('forecast');


const fetchWeatherData = () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=072c88c2b7f1a1c7fb7704f9f847b690")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const weatherData = json;
        console.log(weatherData);

        weatherCity.innerHTML = `${weatherData.name}`; 
        todaysWeather.innerHTML = `
          <p>
            ${(weatherData.weather[0].main).toLowerCase()} | ${Math.round(weatherData.main.temp * 10) / 10}°
          </p>
          <p>
            sunrise ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}
          </p>
          <p>
            sunset ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})}
          </p>
        `;
       
        });
      };
 
  fetchWeatherData();

  const fetchForecastData = () => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&APPID=072c88c2b7f1a1c7fb7704f9f847b690")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const forecastData = json; //not a neccessary step but we tried to be extra clear
        const filteredForecast = forecastData.list.filter(item => item.dt_txt.includes('12:00'))
        console.log(filteredForecast);

        forecast.innerHTML = `
          <div class="days">
            <div>${new Date(filteredForecast[0].dt).toLocaleDateString("en-US", {
              weekday: "short",
            })}
            
            </div>
          </div>
        `
      });
// continue with temp on line 48-ish
      

      
    };

fetchForecastData();