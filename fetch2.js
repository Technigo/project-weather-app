const apiKey = () => '3575626ed7c8ddf8baca764025081251';
const baseUrl1 = () => 'https://api.openweathermap.org/data/2.5';
const baseUrl2 = () => 'https://api.openweathermap.org/data/2.5';

const fetchWeather = (city) => {
  const apiUrl = `${baseUrl1()}/weather?q=${city}&units=metric&APPID=${apiKey()}`;

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
      document.querySelector('.city').textContent = ''; // Clear the city name

      let description = '';
      const cityName = data.name; 
      const weatherCode = data.weather[0].id;
      if (weatherCode >= 200 && weatherCode < 300) {
        description = `Get your sunnies on. It's looking rather great today in ${cityName}.`;
      } else if (weatherCode >= 300 && weatherCode < 600) {
        description = `Don’t forget your umbrella. It’s wet today in ${cityName}.`;
      } else if (weatherCode >= 600 && weatherCode < 700) {
        description = `Light a fire and get cosy. It’s looking grey today in ${cityName}.`;
      } else if (weatherCode >= 700 && weatherCode < 800) {
        description = `The air is a bit hazy. Take it easy in ${cityName}!`;
      } else if (weatherCode === 800) {
        description = `Clear skies ahead. Enjoy the sunshine in ${cityName}!`;
      } else if (weatherCode === 801) {
        description = `Partly cloudy today. It's a good day for outdoor activities in ${cityName}.`;
      } else if (weatherCode >= 802 && weatherCode <= 804) {
        description = `Cloudy skies. Perfect weather for a cozy indoor day in ${cityName}.`;
      } else {
        description = `Weather conditions are moderate. Enjoy your day in ${cityName}!`;
      }
      document.querySelector('.description').textContent = description;

      // Update weather icon
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
      document.querySelector('.Weather-icon').src = iconUrl;


      const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

      // sunrise and sunset elements
      document.getElementById('sunrise').textContent = `Sunrise: ${sunriseTime}`;
      document.getElementById('sunset').textContent = `Sunset: ${sunsetTime}`;

      // Fetch weather forecast after current weather data is fetched
      fetchWeatherForecast(cityName); // Pass cityName to the forecast function
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// You can also listen for the 'Enter' key press event to trigger the search
document.querySelector('.search input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const input = document.querySelector('.search input').value;
    fetchWeather(input);
  }
});

// Initial fetch for default city (Stockholm)
fetchWeather('Stockholm');

const fetchWeatherForecast = (city) => {
  const apiUrl = `${baseUrl2()}/forecast?q=${city}&units=metric&appid=${apiKey()}`;

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

      // Filter forecast data to get weather for the next four days
      const today = new Date();
      const fourDaysFromNow = new Date(today);
      fourDaysFromNow.setDate(fourDaysFromNow.getDate() + 3);
      const filteredForecast = forecastList.filter(item => {
        const itemDate = new Date(item.dt * 1000);
        return itemDate <= fourDaysFromNow;
      });
      
      // Display the forecast for four days
      displayForecast(filteredForecast);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

const displayForecast = (forecastList) => {
  const dayList = document.querySelector('.day-list');
  const temperatureList = document.querySelector('.temperature-list');
  
  // Clear previous forecast data
  dayList.innerHTML = '';
  temperatureList.innerHTML = '';

  let currentDay = null; // Variable to track the current day

  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const temperature = item.main.temp.toFixed(1); // Round temperature to 1 decimal place
    
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
