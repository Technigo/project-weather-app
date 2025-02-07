const apiKey = '15e8eef35aa52c93aeef1018b9732a74';
const baseUrl = "https://api.openweathermap.org/data/2.5/";
const city = "Stockholm,Sweden";
const units = "metric";
const apiUrl = `${baseUrl}weather?q=${city}&units=${units}&APPID=${apiKey}`;
const forecastApiUrl = `${baseUrl}forecast?q=${city}&units=${units}&APPID=${apiKey}`;

function convertTo24HourTime(timestamp, timezoneOffset) {
  const utcTime = new Date(timestamp * 1000);

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Stockholm' 
  };

  return new Intl.DateTimeFormat('en-GB', options).format(utcTime);
}

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function checkWeather() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    
    console.log(data);

    document.getElementById('city').innerHTML = data.name;
    document.getElementById('temp').innerHTML = `${data.main.temp.toFixed(1)}°C`;
    
    document.getElementById('sunrise').innerHTML = convertTo24HourTime(data.sys.sunrise, data.timezone);
    document.getElementById('sunset').innerHTML = convertTo24HourTime(data.sys.sunset, data.timezone);
    document.getElementById('time').innerHTML = `Local Time: ${convertTo24HourTime(data.dt, data.timezone)}`;
  
    document.getElementById('weather-condition').innerHTML = capitalizeFirstLetter(data.weather[0].description);
    const weatherIcon = document.getElementById('weather-icon').querySelector('img');
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;  

  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkWeather();
  getWeatherForecast();
});

// Fetch and process the weather forecast
async function getWeatherForecast() {
  try {
    const response = await fetch(forecastApiUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const forecastData = await response.json();
    console.log('Forecast API Response:', forecastData);

    // Store daily forecast (only for 12:00 PM each day)
    const dailyForecasts = {};

    forecastData.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0]; // Extract YYYY-MM-DD
      const time = item.dt_txt.split(' ')[1]; // Extract HH:MM:SS
      
      // Only use forecast entries for 12:00 PM
      if (time === '12:00:00') {
        dailyForecasts[date] = {
          date: new Date(date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }),
          temp: item.main.temp.toFixed(1), // ✅ Only display temperature
          icon: item.weather[0].icon,
          description: capitalizeFirstLetter(item.weather[0].description) // Capitalize description
        };
      }
    });

    // Convert object to array and limit to the next 4 days
    const forecastArray = Object.values(dailyForecasts).slice(0, 4);
    console.log("Final 4-day forecast:", forecastArray); // ✅ Debugging step

    displayForecast(forecastArray);
  } catch (error) {
    console.error('Error fetching forecast data:', error);
  }
}

// Display the forecast data
function displayForecast(dailyForecasts) {
  const forecastContainer = document.getElementById('forecast');
  forecastContainer.innerHTML = ''; // Clear previous content

  const header = document.createElement('h3');
  header.textContent = 'Forecast at 12:00';
  forecastContainer.appendChild(header);

  dailyForecasts.forEach(day => {
    const forecastCard = document.createElement('div');
    forecastCard.classList.add('forecast-day');

    forecastCard.innerHTML = `
      <div class="day">${day.date}</div>
      <img src="http://openweathermap.org/img/wn/${day.icon}.png" alt="${day.description}">
      <div class="temp">${day.temp}°C</div> <!-- ✅ Only showing temperature -->
      <div class="description">${day.description}</div>
    `;

    forecastContainer.appendChild(forecastCard);
  });
}

// Call the function to get the forecast
getWeatherForecast();