
const apiKey = '8fa7c461aec946fde31f330992fce9d6';
const apiUrl = 'https://api.openweathermap.org/data/2.5';
const day = document.getElementById("forecast");
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const container = document.getElementById('sthweather');
const messageContainer = document.getElementById('message-text');


function fetchWeatherDataByCoordinates(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((json) => {
      const cityName = json.name;
      const temperature = json.main.temp.toFixed(1);
      const weatherDescription = json.weather[0].description;
      const sunsetTimestamp = json.sys.sunset * 1000;
      const sunriseTimestamp = json.sys.sunrise * 1000;
      const feelsLike = json.main.feels_like.toFixed(1);

      // Create Date objects for sunset and sunrise times
      const sunset = new Date(sunsetTimestamp);
      const sunrise = new Date(sunriseTimestamp);
      const sunsetTime = `${sunset.getHours()}:${sunset.getMinutes()}`;
      const sunriseTime = `${sunrise.getHours()}:${sunrise.getMinutes()}`;
      const currentDayOfWeek = new Date().getDay();

      function generateWeatherMessage(description) {
        let message = "";
        let iconUrl = "";

        if (description.includes("rain")) {
          message = `Don't forget your umbrella! ${cityName} is looking kind of rainy today!`;
          iconUrl = 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/rainy-weather/rainy-weather.json';
        } else if (description.includes("cloud")) {
          message = `${cityName} hoping for clear skies.`;
          iconUrl = 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/cloudy-weather/cloudy-weather.json';
        } else if (description.includes("clear sky")) {
          message = `Clear vision ahead. ${cityName} get ready for that BBQ.`;
          iconUrl = 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/sun-weather/sun-weather.json';
        } else if (description.includes("drizzle")) {
          message = `Better wear a jacket as ${cityName} isn't it's happiest today.`;
          iconUrl = 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/rain-cloud-weather/rain-cloud-weather.json';
        } else if (description.includes("thunderstorm")) {
          message = `When in ${cityName}, stay inside and cosy up. Today's a great day to watch your fav Netflix series.`;
          iconUrl = 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/stormy-weather/stormy-weather.json';
        } else if (description.includes("snow")) {
          message = `Get ready for the ${cityName} snowball championship!`;
          iconUrl = 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/snow-storm-weather/snow-storm-weather.json';
        } else {
          message = `${cityName} is looking a bit unstable today. Weather conditions may vary.`;
          iconUrl = 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/temperature-weather/temperature-weather.json';
        }

        return { message, iconUrl };
      }

      // Generate the weather message and get the icon URL based on the weather description
      const { message, iconUrl } = generateWeatherMessage(weatherDescription);

      // Set the weather theme based on weather conditions
      setWeatherTheme(weatherDescription);

      // Display the weather message
      messageContainer.innerHTML = `<h1>${message}</h1>`;

      container.innerHTML = `
        <h3>${weekdays[currentDayOfWeek]}</h3>
        <p>${weatherDescription} | ${temperature}°</p>
        <p>feels like | ${feelsLike}°</p>
        <p>sunrise: ${sunriseTime}</p> 
        <p>sunset: ${sunsetTime}</p> 
      `;

      function setWeatherTheme(weatherDescription) {
        const body = document.body; // Get the <body> element

        if (weatherDescription.includes("cold")) {
          body.style.backgroundColor = '#c0c0c0'; // Gray background for cold weather
          body.style.color = '#000'; // Black text color
        } else if (weatherDescription.includes("clear sky")) {
          body.style.backgroundColor = '#fff'; // White background for sunny weather
          body.style.color = '#ff9900'; // Orange text color
        } else if (weatherDescription.includes("cloud")) {
          body.style.backgroundColor = '#e0e0e0'; // Light gray background for cloudy weather
          body.style.color = '#333'; // Dark gray text color
        } else {
          // Handle other weather conditions or set a default theme
          body.style.backgroundColor = '#fff'; // Default background color
          body.style.color = '#000'; // Default text color
        }
      }

      // Load and play the Lottie animation based on the icon URL
      const weatherAnimation = document.getElementById("weather-animation");
      const animation = lottie.loadAnimation({
        container: weatherAnimation,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: iconUrl,
      });
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

fetchWeatherDataByCoordinates()


function fetchWeatherData() {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8fa7c461aec946fde31f330992fce9d6')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((json) => {
      // Filter and group forecast data by date for the next five days
      const today = new Date();
      const fiveDaysFromNow = new Date(today);
      fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);
      const groupedForecast = json.list.reduce((result, item) => {
        const date = new Date(item.dt * 1000);
        if (date <= fiveDaysFromNow) {
          const dateString = date.toISOString().split('T')[0];
          if (!result[dateString]) {
            result[dateString] = [];
          }
          result[dateString].push(item);
        }
        return result;
      }, {});

      // Display the forecast for each day
      for (const date in groupedForecast) {
        if (groupedForecast.hasOwnProperty(date)) {
          const forecastItems = groupedForecast[date];
          const morningItem = forecastItems.find((item) => item.dt_txt.includes("09:00"));
          const eveningItem = forecastItems.find((item) => item.dt_txt.includes("21:00"));

          if (morningItem && eveningItem) {
            const morningTemperature = morningItem.main.temp.toFixed(1); // Temp at 9 am
            const eveningTemperature = eveningItem.main.temp.toFixed(1); // Temp at 9 pm
            const morningFeelsLike = morningItem.main.feels_like.toFixed(1); // Feels like at 9 am
            const eveningFeelsLike = eveningItem.main.feels_like.toFixed(1); // Feels like at 9 pm
            const morningDescription = morningItem.weather[0].description; // Weather description at 9 am
            const eveningDescription = eveningItem.weather[0].description; // Weather description at 9 pm
            const morningHumidity = morningItem.main.humidity; // Humidity at 9 am
            const eveningHumidity = eveningItem.main.humidity; // Humidity at 9 pm

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

