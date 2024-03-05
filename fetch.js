const apiKey = '3575626ed7c8ddf8baca764025081251';
const baseUrl1 = 'https://api.openweathermap.org/data/2.5';
const baseUrl2 = 'https://api.openweathermap.org/data/2.5';

function fetchWeather(city) {
  const apiUrl = `${baseUrl1}/weather?q=${city}&units=metric&APPID=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Update UI elements with the fetched data
      document.querySelector('.temp').textContent = `${Math.round(data.main.temp)}°`;
      document.querySelector('.city').textContent = data.name;
      document.querySelector('.description').textContent = data.weather[0].description;

      // Update weather icon
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
      document.querySelector('.Weather-icon').src = iconUrl;

      // Convert sunrise and sunset times from milliseconds to a readable format
      const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Update sunrise and sunset elements
      document.getElementById('sunrise').textContent = `Sunrise: ${sunriseTime}`;
      document.getElementById('sunset').textContent = `Sunset: ${sunsetTime}`;

      // Fetch weather forecast after current weather data is fetched
      fetchWeatherForecast(city);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

document.querySelector('.search button').addEventListener('click', function() {
  const input = document.querySelector('.search input').value;
  fetchWeather(input);
});

// You can also listen for the 'Enter' key press event to trigger the search
document.querySelector('.search input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    const input = document.querySelector('.search input').value;
    fetchWeather(input);
  }
});

// Initial fetch for default city (Stockholm)
fetchWeather('Stockholm');

function fetchWeatherForecast(city) {
  const apiUrl = `${baseUrl2}/forecast?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process the forecast data here
      const forecastList = data.list;

      // Filter forecast data to get weather for the next seven days
      const today = new Date();
      const sevenDaysFromNow = new Date(today);
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
      const filteredForecast = forecastList.filter(item => {
        const itemDate = new Date(item.dt * 1000);
        return itemDate <= sevenDaysFromNow;
      });
      
      // Display the forecast
      displayForecast(filteredForecast);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function displayForecast(forecastList) {
  const dayList = document.querySelector('.day-list');
  const temperatureList = document.querySelector('.temperature-list');
  
  // Clear previous forecast data
  dayList.innerHTML = '';
  temperatureList.innerHTML = '';

  let currentDay = null; // Variable to track the current day

  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const temperature = Math.round(item.main.temp);
    
    // Check if it's a new day
    if (day !== currentDay) {
      // Create list item for day of the week
      const dayListItem = document.createElement('li');
      dayListItem.textContent = day;
      dayList.appendChild(dayListItem);

      // Create list item for temperature
      const temperatureListItem = document.createElement('li');
      temperatureListItem.textContent = temperature + '°';
      temperatureList.appendChild(temperatureListItem);

      // Update current day
      currentDay = day;
    }
  });
}
