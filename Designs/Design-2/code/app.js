//DOM elements
const weatherDescription = document.getElementById('weather-description');
const todaysTemp = document.getElementById('todays-temp');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');

const weatherIcon = document.getElementById('weather-icon');
const weatherMessage = document.getElementById('weather-message');

const forecastContainer = document.getElementById('forecast-container');
const forecastDay1 = document.getElementById('forecast-day-1');
const forecastDay2 = document.getElementById('forecast-day-2');
const forecastDay3 = document.getElementById('forecast-day-3');
const forecastDay4 = document.getElementById('forecast-day-4');
const forecastDay5 = document.getElementById('forecast-day-5');
const forecastTemp1 = document.getElementById('forecast-temp-1');
const forecastTemp2 = document.getElementById('forecast-temp-2');
const forecastTemp3 = document.getElementById('forecast-temp-3');
const forecastTemp4 = document.getElementById('forecast-temp-4');
const forecastTemp5 = document.getElementById('forecast-temp-5');

const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');

//Other global variables

//API
function fetchWeather(city) {
  const API_KEY = '2f40e0f749f089e24a9bc1d552feee83';
  const currentWeather = fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${API_KEY}`
  );
  const weatherForecast = fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=en&appid=${API_KEY}`
  );
  const findMyState = () => {
  const status = document.querySelector('.state');

  const success = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
  
    

    const geoApiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY}`

    fetch(geoApiUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      status.textContent.data
    })
  }

  const error = () => {
    status.textContent = 'Unable to find your location'
  }

  navigator.geolocation.getCurrentPosition(success, error)

}

document.querySelector('.find-state').addEventListener('click', findMyState);

  Promise.all([currentWeather, weatherForecast])
    .then(responses => {
      console.log(responses);
      const arrayOfResponses = responses.map(res => res.json());
      return Promise.all(arrayOfResponses);
    })

    .then(json => {
      console.log(json);

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
      weatherDescription.innerText = currentWeatherDesc;
      todaysTemp.innerText = currentTemp;
      sunriseTime.innerText = `Sunrise ${currentSunrise}`;
      sunsetTime.innerText = `Sunset ${currentSunset}`;

      //CURRENT WEATHER – icon/message
      if (currentWeatherId >= 200 && currentWeatherId <= 531) {
        weatherIcon.src = '/icons/noun_Umbrella_2030530.svg';
        weatherIcon.alt = 'Umbrella illustration';
        weatherMessage.innerText = `${currentLocation}`;
      } else if (currentWeatherId == 800 || currentWeatherId == 801) {
        weatherIcon.src = '/icons/noun_Sunglasses_2055417.svg';
        weatherIcon.alt = 'Sunglasses illustration';
        weatherMessage.innerText = `Get your sunnies on. ${currentLocation} is looking rather great today.`;
      } else {
        weatherIcon.src = '/icons/noun_Cloud_1188486.svg';
        weatherIcon.alt = 'Cloud illustration';
        weatherMessage.innerText = `${currentLocation}`;
      }

      //Five day weather forecast
      //Filtering to get only 12:00 info for the next five days
      const forecastData = json[1].list;
      let today = forecastData.shift();
      console.log(forecastData);

      let onlyNoons = forecastData.filter(point => {
        if (point.dt_txt.substr(0, 10) == today.dt_txt.substr(0, 10)) {
          return false;
        }

        if (point.dt_txt.substr(11, 2) == '12') {
          return true;
        }

        return false;
      });

      //If the data for 12:00 the fifth day isn't available yet, we're using the latest available:
      if (onlyNoons.length == 4) {
        onlyNoons.push(forecastData.pop());
      }
      console.log(onlyNoons);

      //Only the forecast days
      //formatting the dates to get the weekday names and storing them in an array
      //formatting the temperatures and storing them in another array
      const forecastDaysNames = [];
      const forecastDaysTemp = [];

      onlyNoons.forEach(point => {
        if (onlyNoons.length === 5) {
          forecastDaysNames.push(
            new Date(point.dt_txt).toLocaleDateString('en-GB', {
              weekday: 'short',
            })
          );
          forecastDaysTemp.push(Math.floor(point.main.temp));
        }
        return;
      });
      console.log(forecastDaysNames);
      console.log(forecastDaysTemp);

      // DOM rendering - Five day forecast
      forecastContainer.innerHTML = '';
      forecastDaysNames.forEach(day => {
        forecastContainer.innerHTML += `
          <p class="forecast-day">${forecastDaysNames[day]}</p>
          <p class="forecast-temp">${forecastDaysTemp[day]}</p> 
          `;
      });
    });
}
//
searchBtn.addEventListener('click', () => {
  fetchWeather(searchBar.value);
});

//Invoking the function when the app loads
fetchWeather('Malmo');
