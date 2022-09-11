
const todaysWeather = document.getElementById('todays-weather');
const weatherCity = document.getElementById('weather-city');
const forecast = document.getElementById('forecast');
const weatherBody = document.getElementById('weather-body');



const fetchWeatherData = () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=072c88c2b7f1a1c7fb7704f9f847b690")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const weatherData = json;
        console.log(weatherData);

        //Changing colours and img depending on main weather 
        if (weatherData.weather[0].main === 'Clear') {
            weatherBody.style.backgroundColor = "#F7E9B9";
            weatherBody.style.color = "#2A5510";
            weatherCity.innerHTML = `
            <img src="./images/sun-glasses.png" alt="sun-glasses icon" class="icon"></img>
            <p> Get your sunnies on. ${weatherData.name} is looking rather great today
            </p>`;
        } else if (weatherData.weather[0].main === 'Clouds') {
            weatherBody.style.backgroundColor = "#F4F7F8";
            weatherBody.style.color = "#F47775";
            weatherCity.innerHTML = `
            <img src="./images/clouds.png" alt="cloud icon" class="icon"></img>
            <p>Light a fire and get cosy. ${weatherData.name} is looking rather grey today. 
            </p>`; 
        } else if (weatherData.weather[0].main === 'Rain' | 'Drizzle' | 'Thunderstorm') {
            weatherBody.style.backgroundColor = "#A3DEF7";
            weatherBody.style.color = "#164A68";
            weatherCity.innerHTML = `
            <img src="./images/umbrella.png" alt="umbrella icon" class="icon"></img>
            <p> Don't forget you umbrella. It's wet in ${weatherData.name} today. 
            </p>`; 
        } else {
            weatherBody.style.backgroundColor = "black";
            weatherBody.style.color = "white";
        }
                  //Add snow? or what should else be? There are other main weather. 

        //Should we have main (like the design) or should we stick with description (like the instructions?)        
        todaysWeather.innerHTML = `
          <p>
            ${(weatherData.weather[0].description).toLowerCase()} | ${Math.round(weatherData.main.temp * 10) / 10}°
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
      console.log(forecastData)
      const filteredForecast = forecastData.list.filter(item => item.dt_txt.includes('12:00'))
      console.log(filteredForecast);

      const getDay = (weekday) => {
        const dates = new Date(weekday * 1000); 
        return dates.toLocaleDateString('en', {weekday: 'short'});
        }

      // need to do some kind of map here 
      forecast.innerHTML = ` 
          <div class="forecast-row">
            <div class="forecast-item">
              ${getDay(filteredForecast[0].dt)}
            </div>
            <div class="forecast-item">
              ${Math.round(filteredForecast[0].main.temp * 10) / 10}°
            </div>
          </div>
          <div class="forecast-row">
            <div class="forecast-item">
              ${getDay(filteredForecast[1].dt)}
            </div>
            <div class="forecast-item">
              ${Math.round(filteredForecast[1].main.temp * 10) / 10}°
            </div>
          </div>
          <div class="forecast-row">
            <div class="forecast-item">
              ${getDay(filteredForecast[2].dt)}
            </div>
            <div class="forecast-item">
              ${Math.round(filteredForecast[2].main.temp * 10) / 10}°
            </div>
          </div>
          <div class="forecast-row">
            <div class="forecast-item">
              ${getDay(filteredForecast[3].dt)}
            </div>
            <div class="forecast-item">
              ${Math.round(filteredForecast[3].main.temp * 10) / 10}°
            </div>
          </div>
          <div class="forecast-row">
            <div class="forecast-item">
              ${getDay(filteredForecast[4].dt)}
            </div>
            <div class="forecast-item">
              ${Math.round(filteredForecast[4].main.temp * 10) / 10}°
            </div>
          </div>`
      });
      
  };

fetchForecastData();