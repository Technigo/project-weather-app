//DOM elements
const root = document.documentElement;

const weatherDescAndTemp = document.getElementById('weather-desc-temp');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');
const weatherIcon = document.getElementById('weather-icon');
const weatherMessage = document.getElementById('weather-message');
const forecastContainer = document.getElementById('forecast-container');
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');

//API
//To be able to look for new cities everything is placed inside a function
//that gets invoked when the user clicks the search button
function fetchWeather(city) {
  const API_KEY = '2f40e0f749f089e24a9bc1d552feee83';
  const currentWeather = fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${API_KEY}`
  );
  const weatherForecast = fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=en&appid=${API_KEY}`
  );

  Promise.all([currentWeather, weatherForecast])
    .then(responses => {
      const arrayOfResponses = responses.map(res => res.json());
      return Promise.all(arrayOfResponses);
    })

    .then(json => {
      //CURRENT WEATHER – variables:
      let currentLocation = json[0].name;
      let currentWeatherId = json[0].weather[0].id;
      let currentWeatherDesc = json[0].weather[0].description;
      let currentTemp = Math.floor(json[0].main.temp);
      let currentSunrise = new Date(
        json[0].sys.sunrise * 1000
      ).toLocaleTimeString('en-GB', { timeStyle: 'short' });
      let currentSunset = new Date(
        json[0].sys.sunset * 1000
      ).toLocaleTimeString('en-GB', { timeStyle: 'short' });

      //CURRENT WEATHER – DOM rendering:
      weatherDescAndTemp.innerText = `${currentWeatherDesc} | ${currentTemp}ºC`;
      sunriseTime.innerText = `sunrise ${currentSunrise}`;
      sunsetTime.innerText = `sunset ${currentSunset}`;

      //CURRENT WEATHER – colors/icon/message
      if (currentWeatherId >= 200 && currentWeatherId <= 531) {
        root.style.setProperty('--bg-color', '#a3def7');
        root.style.setProperty('--text-color', '#164a68');
        weatherIcon.src = 'icons/noun_Umbrella_2030530.svg';
        weatherIcon.alt = 'Umbrella illustration';
        weatherMessage.innerText = `Don't forget your umbrella. It's wet in ${currentLocation} today.`;
      } else if (currentWeatherId == 800 || currentWeatherId == 801) {
        root.style.setProperty('--bg-color', '#f7e9b9');
        root.style.setProperty('--text-color', '#2a5510');
        weatherIcon.src = 'icons/noun_Sunglasses_2055147.svg';
        weatherIcon.alt = 'Sunglasses illustration';
        weatherMessage.innerText = `Get your sunnies on. ${currentLocation} is looking rather great today.`;
      } else {
        root.style.setProperty('--bg-color', '#f4f7f8');
        root.style.setProperty('--text-color', '#f47775');
        weatherIcon.src = 'icons/noun_Cloud_1188486.svg';
        weatherIcon.alt = 'Cloud illustration';
        weatherMessage.innerText = `Light a fire and get cosy. ${currentLocation} is looking grey today.`;
      }

      //WEATHER FORECAST

      //Filtering to get only 12:00 info for the next five days
      //and if not able to get 12:00 temp for day 5, take the latest available
      const forecastData = json[1].list;
      let today = forecastData.shift();

      let onlyNoons = forecastData.filter(point => {
        if (point.dt_txt.substr(0, 10) == today.dt_txt.substr(0, 10)) {
          return false;
        }

        if (point.dt_txt.substr(11, 2) == '12') {
          return true;
        }

        return false;
      });

      if (onlyNoons.length == 4) {
        onlyNoons.push(forecastData.pop());
      }

      //Looping through the onlyNoons array to get the dates and temperature
      //formatting the dates to get the weekday names and putting each of
      //the items in a <p> tag
      forecastContainer.innerHTML = '';
      onlyNoons.forEach(point => {
        forecastContainer.innerHTML += `
        <div class="fc-day-container">
          <p class="fc-day-temp">${new Date(point.dt_txt).toLocaleDateString(
            'en-GB',
            {
              weekday: 'short',
            }
          )}</p> <p class="fc-day-temp">${Math.floor(point.main.temp)}ºC</p>
          </div>`;
      });
    });
}

//To get weather for other cities the fetchWeather function
//is invoked whenever the user clicks the search button
//and the input value is being passed as a parameter
searchBtn.addEventListener('click', () => {
  fetchWeather(searchBar.value);
});

//Invoking the function when the app loads
fetchWeather('Malmo');
