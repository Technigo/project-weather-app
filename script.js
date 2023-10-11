const weatherIcons = {
  'clear sky': 'fas fa-sun',
  'few clouds': 'fas fa-cloud-sun',
  'scattered clouds': 'fas fa-cloud',
  'broken clouds': 'fas fa-cloud fa-fade',
  'overcast clouds': 'fas fa-cloud',
  'light rain': 'fas fa-cloud-showers-heavy',
  'moderate rain': 'fas fa-cloud-showers-heavy',
  'heavy rain': 'fas fa-cloud-showers-heavy',
  'light snow': 'fas fa-snowflake',
  'moderate snow': 'fas fa-snowflake',
  'heavy snow': 'fas fa-snowflake',
  'thunderstorm': 'fas fa-bolt',
  'mist': 'fas fa-smog',
  'fog': 'fas fa-smog',
  'smoke': 'fas fa-smog',
  'haze': 'fas fa-smog fa-fade',
  'dust': 'fas fa-smog',
  'sand': 'fas fa-smog',
  'tornado': 'fas fa-wind fa-beat',
  'squalls': 'fas fa-wind',
};

const api_weather_URL =
  'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=10f8230f6149903425e19587fdc548b8';
const api_forecast_URL =
  'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=10f8230f6149903425e19587fdc548b8';

async function fetchWeather() {
  try {
    const res = await fetch(api_weather_URL);
    const data = await res.json();
    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);

    // Check if the temperature is below 10 and add overlay class to main-container if true
    if (temperature <= 11) {
      document.querySelector('.overlay').style.display = 'block';
    }

    document.getElementById('temperature').textContent = `${temperature} °`;
    document.getElementById(
      'feelsLike'
    ).textContent = `( Feels like: ${feelsLike} ° )`;
    document.getElementById('city-name').textContent = data.name;

    return data;
  } catch (error) {
    console.log('Fetch error:', error);
  }
}

fetchWeather()
  .then((data) => {
    document.getElementById('temperature').textContent = `${Math.round(
      data.main.temp
    )} °C`;
    // Check if the temperature is below 15 and add overlay class to main-container if true
    if (temperature < 10) {
      document.querySelector('.main-container').classList.add('overlay');
    }
    document.getElementById('city-name').textContent = data.name;
    function updateTime() {
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes().toString().padStart(2, '0'); // Get minutes with leading zero
      document.getElementById('timezone').innerHTML = `Time: ${h}:${m}`;
    }
    const weatherDescription = data.weather[0].description;
    const capitalizedDescription =
      weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    const iconClass = weatherIcons[weatherDescription] || 'fas fa-question'; // Use the original lowercase weatherDescription here
    const iconElement = `<i class="weather-icon ${iconClass} fa-beat"></i>`;
    document.getElementById(
      'description'
    ).innerHTML = `<div class="des-container"><p>${capitalizedDescription}</p>${iconElement}</div>`; // Display capitalized description, use original lowercase weatherDescription for icon selection

    // Update the time initially
    updateTime();

    // Set up a timer to update the time every second (1000 milliseconds)
    setInterval(updateTime, 1000);

    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
      'en-US',
      { hour: 'numeric', minute: 'numeric', hour12: false }
    );
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString(
      'en-US',
      { hour: 'numeric', minute: 'numeric', hour12: false }
    );

    document.getElementById('sunrise').textContent = `Sunrise: ${sunriseTime}`;
    document.getElementById('sunset').textContent = `Sunset: ${sunsetTime}`;

    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

async function fetchForecast() {
  try {
    const res = await fetch(api_forecast_URL);
    const data = await res.json();
    // Display the current forecast data
    document.getElementById('city-name').textContent = data.city.name;

    // Clear any existing content in the forecast section
    const forecastSection = document.getElementById('forecast-section');
    forecastSection.innerHTML = '';

    // Get the current date
    const today = new Date();

    // Create the table element
    const forecastTable = document.createElement('table');

    // Filter forecast data for items with dt_txt containing "12:00:00"
    const filteredForecast = data.list.filter((forecastItem) =>
      forecastItem.dt_txt.includes('12:00:00')
    );

    // Loop through the filtered forecast data and display forecasts for the next four days starting from tomorrow
    let daysDisplayed = 0;
    filteredForecast.forEach((forecastItem_1) => {
      const date = new Date(forecastItem_1.dt * 1000);
      const tomorrow = new Date(); // Get a new date object for tomorrow
      tomorrow.setDate(tomorrow.getDate() + 1); // Set it to tomorrow
      tomorrow.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison

      // Check if the date is tomorrow or a future date
      if (date >= tomorrow && daysDisplayed < 4) {
        const row = forecastTable.insertRow(); // Create a new row for each forecast item

        const dayCell = row.insertCell();
        const dayName = new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
        }).format(date);
        dayCell.textContent = dayName; // Display the accurate day name

        const descriptionCell = row.insertCell();
        const weatherDescription = forecastItem_1.weather[0].description;
        const iconClass = weatherIcons[weatherDescription] || 'fas fa-question'; // Default icon for unknown weather
        descriptionCell.innerHTML = `<i class="weather-icon ${iconClass}"></i>`; // Add weather icon to the cell
        const temperatureCell = row.insertCell();
        const roundedTemperature = Math.round(forecastItem_1.main.temp); // Round the temperature
        temperatureCell.textContent = `${roundedTemperature} °C`;

        const windCell = row.insertCell();
        const roundedWind = forecastItem_1.wind.speed.toFixed(2); // Round and format to 2 decimal places
        windCell.textContent = `${roundedWind} m/s`;

        daysDisplayed++;
      }
    });

    // Append the table to the forecast section
    forecastSection.appendChild(forecastTable);

    console.log(data);
    return data;
  } catch (error) {
    console.log('Fetch error:', error);
  }
}

fetchForecast();

const searchIcon = document.querySelector('.search-icon');
const searchBarInput = document.querySelector('#search-input'); // Updated selector to use ID
const searchClose = document.querySelector('.search-close');
const searchBtn = document.querySelector('#search-button');

// Initially hide the search bar and close icon
searchIcon.style.display = 'block';
searchBarInput.style.display = 'none'; // Hide the search input initially
searchClose.style.display = 'none';
searchBtn.style.display = 'none';

searchIcon.addEventListener('click', () => {
  searchIcon.style.display = 'none'; // Hide the magnifying glass icon
  searchClose.style.display = 'block'; // Show the close icon
  searchBarInput.style.display = 'block'; // Show the search bar
  searchBtn.style.display = 'block';
});

searchClose.addEventListener('click', () => {
  searchIcon.style.display = 'block'; // Show the magnifying glass icon
  searchClose.style.display = 'none'; // Hide the close icon
  searchBarInput.style.display = 'none'; // Hide the search bar
  searchBtn.style.display = 'none';
});

const api_search_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function fetchSearchWeather(cityName) {
  try {
    const encodedCityName = encodeURIComponent(cityName);
    const res = await fetch(
      `${api_search_URL}?q=${encodedCityName}&units=metric&APPID=10f8230f6149903425e19587fdc548b8`
    );
    const data = await res.json();

    // Check if the response contains the expected properties
    if (data.main && data.weather && data.weather[0]) {
      const temperature = Math.round(data.main.temp);
      const weatherDescription = data.weather[0].description;

      document.getElementById('temperature').textContent = `${temperature} °C`;
      document.getElementById('feelsLike').textContent = `( Feels like: ${temperature} °C )`;
      document.getElementById('city-name').textContent = data.name;

      const capitalizedDescription =
        weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
      const iconClass = weatherIcons[weatherDescription] || 'fas fa-question';
      const iconElement = `<i class="weather-icon ${iconClass} fa-beat"></i>`;
      document.getElementById(
        'description'
      ).innerHTML = `<div class="des-container"><p>${capitalizedDescription}</p>${iconElement}</div>`;

      // Handle sunrise and sunset times if available in the response
      if (data.sys && data.sys.sunrise && data.sys.sunset) {
        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        });
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        });

        document.getElementById('sunrise').textContent = `Sunrise: ${sunriseTime}`;
        document.getElementById('sunset').textContent = `Sunset: ${sunsetTime}`;
      }

      console.log('search weather data', data);
    } else {
      console.log('Invalid API response:', data);
    }
  } catch (error) {
    console.log('Fetch error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('API Error Data:', error.response.data);
      console.log('API Error Status:', error.response.status);
      console.log('API Error Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error during request setup:', error.message);
    }
  }
}

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

searchButton.addEventListener('click', async () => {
  try {
    const cityName = searchInput.value;
    if (cityName) {
      // Call the fetchSearchWeather function with the entered city name
      fetchSearchWeather(cityName);
    } else {
      console.log('Please enter a city name.');
    }
  } catch (error) {
    console.log('Fetch error:', error);
  }
});

// Call the initial weather fetch function with a default city 
fetchSearchWeather('Stockholm');
