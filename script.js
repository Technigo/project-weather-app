function tryFetch() {
  return fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=10f8230f6149903425e19587fdc548b8'
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log('Fetch error:', error);
    });
}

tryFetch()
  .then((data) => {
    document.getElementById('temperature').textContent = `${Math.round(
      data.main.temp
    )} °C`;
    document.getElementById('city-name').textContent = data.name;
    function updateTime() {
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes().toString().padStart(2, '0'); // Get minutes with leading zero
      document.getElementById('timezone').innerHTML = `Time: ${h}:${m}`;
    }
    document.getElementById(
      'description'
    ).textContent = `${data.weather[0].description}`;

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

function fetchForecast() {
  return fetch(
    'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=10f8230f6149903425e19587fdc548b8'
  )
    .then((res) => res.json())
    .then((data) => {
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
      filteredForecast.forEach((forecastItem) => {
        const date = new Date(forecastItem.dt * 1000);
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
          
          
                    const weatherIcons = {
                      'clear sky': 'fas fa-sun',
                      'few clouds': 'fas fa-cloud-sun',
                      'scattered clouds': 'fas fa-cloud',
                      'broken clouds': 'fas fa-cloud',
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
                      'haze': 'fas fa-smog',
                      'dust': 'fas fa-smog',
                      'sand': 'fas fa-smog',
                      'tornado': 'fas fa-wind',
                      'squalls': 'fas fa-wind',
                    };
                    console.log(weatherIcons.haze)
          
                    const descriptionCell = row.insertCell();
                    const weatherDescription = forecastItem.weather[0].description;
                    const iconClass = weatherIcons[weatherDescription] || 'fas fa-question'; // Default icon for unknown weather
                    descriptionCell.innerHTML = `<i class="weather-icon ${iconClass}"></i>`; // Add weather icon to the cell
          const temperatureCell = row.insertCell();
          const roundedTemperature = Math.round(forecastItem.main.temp); // Round the temperature
          temperatureCell.textContent = `${roundedTemperature} °C`;

          const windCell = row.insertCell();
          const roundedWind = forecastItem.wind.speed.toFixed(2); // Round and format to 2 decimal places
          windCell.textContent = `${roundedWind} m/s`;

          daysDisplayed++;
        }
      });

      // Append the table to the forecast section
      forecastSection.appendChild(forecastTable);

      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log('Fetch error:', error);
    });
}

fetchForecast();
