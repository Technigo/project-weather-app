const forecast = document.getElementById("forecast");
const day = document.getElementById("day");
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const container = document.getElementById('sthweather');
const messageContainer = document.getElementById('message-text');
const apiKey = '8fa7c461aec946fde31f330992fce9d6';

function fetchWeatherDataByCoordinates(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((json) => {
      const cityName = json.name;
<<<<<<< HEAD
<<<<<<< HEAD
      const temperature = json.main.temp.toFixed(1); //removed all but one decimal
      const weatherDescription = json.weather[0].description;
      const sunsetTimestamp = json.sys.sunset * 1000;
      const sunriseTimestamp = json.sys.sunrise * 1000;
      const feelsLike = json.main.feels_like.toFixed(1); //removed all but one decimal
=======
      const temperature = json.main.temp;
      const weatherDescription = json.weather[0].description;
      const sunsetTimestamp = json.sys.sunset * 1000;
      const sunriseTimestamp = json.sys.sunrise * 1000;
      const feelsLike = json.main.feels_like;
>>>>>>> 93b875aadab9a792a4020758935981b6eae7a288
=======
      const temperature = json.main.temp.toFixed(1); //removed all but one decimal
      const weatherDescription = json.weather[0].description;
      const sunsetTimestamp = json.sys.sunset * 1000;
      const sunriseTimestamp = json.sys.sunrise * 1000;
      const feelsLike = json.main.feels_like.toFixed(1); //removed all but one decimal
>>>>>>> 017be4ee17f4dddb5882223d61d585cb7710a68c

      // Create Date objects for sunset and sunrise times
      const sunset = new Date(sunsetTimestamp);
      const sunrise = new Date(sunriseTimestamp);
<<<<<<< HEAD
<<<<<<< HEAD
      const sunsetTime = `${sunset.getHours()}:${sunset.getMinutes()}`; //removes seconds
      const sunriseTime = `${sunrise.getHours()}:${sunrise.getMinutes()}`; //removes seconds
=======
>>>>>>> 93b875aadab9a792a4020758935981b6eae7a288
=======
      const sunsetTime = `${sunset.getHours()}:${sunset.getMinutes()}`; //removes seconds
      const sunriseTime = `${sunrise.getHours()}:${sunrise.getMinutes()}`; //removes seconds
>>>>>>> 017be4ee17f4dddb5882223d61d585cb7710a68c
      const currentDayOfWeek = new Date().getDay();

      function generateWeatherMessage(description) {
        let message = "";

        if (description.includes("rain")) {
          message = "Don't forget your umbrella!";
        } else if (description.includes("cloud")) {
          message = "Here's hoping for a sunny sky later on";
        } else if (description.includes("clear sky")) {
          message = "Keep them sunglasses nearby";
        } else {
          message = "Weather conditions may vary.";
        }

        return message;
      }

      // Generate the weather message based on the weather description
      const message = generateWeatherMessage(weatherDescription);

      // Display the weather message
      messageContainer.innerHTML = `<h2>${message}</h2>`;

      container.innerHTML = `
        <h1>Here's the weather in ${cityName}<h1/> 
        <h3>${weekdays[currentDayOfWeek]}</h3>
        <p>Temperature: ${temperature}°C</p>
        <p>Weather: ${weatherDescription}</p>
<<<<<<< HEAD
<<<<<<< HEAD
        <p>Sunrise: ${sunriseTime}</p> 
        <p>Sunset: ${sunsetTime}</p> 
=======
        <p>Sunrise: ${sunrise.toLocaleTimeString()}</p>
        <p>Sunset: ${sunset.toLocaleTimeString()}</p>
>>>>>>> 93b875aadab9a792a4020758935981b6eae7a288
=======
        <p>Sunrise: ${sunriseTime}</p> 
        <p>Sunset: ${sunsetTime}</p> 
>>>>>>> 017be4ee17f4dddb5882223d61d585cb7710a68c
        <p>Weather feels like: ${feelsLike}°C</p>
      `;
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

function fetchWeatherDataBasedOnLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchWeatherDataByCoordinates(latitude, longitude);
      },
      (error) => {
        console.error('Error getting geolocation:', error);
        container.innerHTML = '<p>Error getting geolocation data</p>';
      }
    );
  } else {
    console.error('Geolocation is not supported by your browser');
    container.innerHTML = '<p>Geolocation is not supported</p>';
  }
}

// Call the function to fetch weather data based on user's location
fetchWeatherDataBasedOnLocation();

function fetchWeatherData() {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8fa7c461aec946fde31f330992fce9d6')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((json) => {
      // Filter and group forecast data by date
      const groupedForecast = json.list.reduce((result, item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!result[date]) {
          result[date] = [];
        }
        result[date].push(item);
        return result;
      }, {});

      // Calculate and display morning (9 AM) and evening (9 PM) temperatures for each day
      for (const date in groupedForecast) {
        if (groupedForecast.hasOwnProperty(date)) {
          const forecastItems = groupedForecast[date];
          const morningItem = forecastItems.find((item) => item.dt_txt.includes("09:00"));
          const eveningItem = forecastItems.find((item) => item.dt_txt.includes("21:00"));

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 017be4ee17f4dddb5882223d61d585cb7710a68c
         if (morningItem && eveningItem) {
              const morningTemperature = morningItem.main.temp.toFixed(1); // Temp at 9 am
              const eveningTemperature = eveningItem.main.temp.toFixed(1); // Temp at 9 pm
              const morningFeelsLike = morningItem.main.feels_like.toFixed(1); // Feels like at 9 am
              const eveningFeelsLike = eveningItem.main.feels_like.toFixed(1); //Feels like at 9 pm
            const morningDescription = morningItem.weather[0].description; // Weather description at 9 am
            const eveningDescription = eveningItem.weather[0].description; // Weather description at 9 pm
            const morningHumidity = morningItem.main.humidity; // Humidity at 9am
            const eveningHumidity = eveningItem.main.humidity; // Humidity at 9 pm
<<<<<<< HEAD
=======
          if (morningItem && eveningItem) {
            const morningTemperature = morningItem.main.temp; // Temperature at 9:00 AM
            const eveningTemperature = eveningItem.main.temp; // Temperature at 9:00 PM
            const morningFeelsLike = morningItem.main.feels_like; // "Feels like" temperature at 9:00 AM
            const eveningFeelsLike = eveningItem.main.feels_like; // "Feels like" temperature at 9:00 PM
            const morningDescription = morningItem.weather[0].description; // Weather description at 9:00 AM
            const eveningDescription = eveningItem.weather[0].description; // Weather description at 9:00 PM
            const morningHumidity = morningItem.main.humidity; // Humidity at 9:00 AM
            const eveningHumidity = eveningItem.main.humidity; // Humidity at 9:00 PM
>>>>>>> 93b875aadab9a792a4020758935981b6eae7a288
=======
>>>>>>> 017be4ee17f4dddb5882223d61d585cb7710a68c

            // Get the day of the week for the date
            const weekday = new Date(date).getDay();

            // Display the forecast for the day with time of day and "feels like" temperature
            day.innerHTML += `
              <div class="forecast-day">
                <h3>${weekdays[weekday]}</h3>
                <p>At 9 am</p>
                <p>Temperature: ${morningTemperature}°C (Feels like: ${morningFeelsLike}°C)</p>
                <p>Weather: ${morningDescription}</p>
                <p>Humidity: ${morningHumidity}%</p>
                <p>At 9 pm</p>
                <p>Temperature: ${eveningTemperature}°C (Feels like: ${eveningFeelsLike}°C)</p>
                <p>Weather: ${eveningDescription}</p>
                <p>Humidity: ${eveningHumidity}%</p>
              </div>
            `;
          }
        }
      }
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

fetchWeatherData();
