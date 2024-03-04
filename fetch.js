const apiKey = '3575626ed7c8ddf8baca764025081251';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

function fetchWeather(city) {
  const apiUrl = `${baseUrl}/weather?q=${city}&units=metric&APPID=${apiKey}`;

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