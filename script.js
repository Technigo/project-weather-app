const toggle = document.getElementById('theme-toggle');
const weatherCard = document.querySelector('.weather-card');

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        document.body.style.backgroundImage = "url('assets/design-1/day-sky.jpg')";
        weatherCard.classList.add('day-mode');
    } else {
        document.body.style.backgroundImage = "url('assets/design-1/night-sky.jpg')";
        weatherCard.classList.remove('day-mode');
    }
});

// API settings
const apiKey = "6f10170466235746161a1b24e2d289bd"; // API key
const lat = "25.276987"; // Dubai Latitude
const lon = "55.296249"; // Dubai Longitude

// Fetch weather data
const fetchWeather = () => {
  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      updateHtml(data); // Update the HTML with the fetched data
    })
    .catch((error) => console.error("Error when fetching the data:", error));
};

// Helper function to format timestamp to 24-hour time format
const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-hour format
  };
  return date.toLocaleTimeString([], options); // Locale string without seconds
};

// Function to update the HTML with weather data
const updateHtml = (data) => {
  const location = document.querySelector(".location h1");
  const currentTemp = document.querySelector(".current-temp h2");
  const details = document.querySelector(".details");

  const weatherData = data.list[0]; 

  // Update the location, temperature, and other details
  location.textContent = data.city.name;
  currentTemp.textContent = `${weatherData.main.temp.toFixed(1)}°C`; // Round to 1 decimal place

  // One-sentence weather description
  const description = document.createElement("p");
  const weatherCondition = weatherData.weather[0].main;
  switch (weatherCondition) {
    case "Clear":
      description.textContent = "A clear and sunny day ahead.";
      break;
    case "Clouds":
      description.textContent = "Clouds are covering the sky.";
      break;
    case "Rain":
      description.textContent = "Expect some rain showers.";
      break;
    case "Thunderstorm":
      description.textContent = "Thunderstorms expected, stay indoors!";
      break;
    default:
      description.textContent = "Weather conditions are changing.";
  }

  description.classList.add("weather-description"); 
  details.innerHTML = ""; 
  details.appendChild(description);

  const sunset = formatTime(data.city.sunset);
  const sunrise = formatTime(data.city.sunrise);
  
  details.innerHTML += `
    <p>Sunset: ${sunset}</p>
    <p>Sunrise: ${sunrise}</p>
  `;

  // Update weekly forecast dynamically
  updateWeeklyForecast(data.list);
};

// Function to update the weekly forecast (pick one entry per day)
const updateWeeklyForecast = (forecastList) => {
  const forecastItems = document.querySelectorAll(".forecast-item");

  // Filter to get one forecast per day (closest to 12:00 PM)
  const dailyForecast = forecastList.filter(forecast => {
    const forecastDate = new Date(forecast.dt * 1000);
    return forecastDate.getHours() === 12; // Picked 12:00 PM
  }).slice(0, 5); // Get the first 5 days

  dailyForecast.forEach((forecast, index) => {
    const forecastTemp = forecast.main.temp.toFixed(1); // Round to 1 decimal place
    const forecastWeather = forecast.weather[0].main;

    // Convert the timestamp to a day name
    const dayName = new Date(forecast.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });

    // Update the forecast item in the HTML
    forecastItems[index].querySelector("p:nth-of-type(1)").textContent = dayName;
    forecastItems[index].querySelector("p:nth-of-type(2)").textContent = `${forecastTemp}°C`;

    // Update the weather icon based on the weather condition
    const icon = forecastItems[index].querySelector("img");
    switch (forecastWeather) {
      case "Clear":
        icon.src = "assets/design-1/sunny.png";
        break;
      case "Clouds":
        icon.src = "assets/design-1/cloudy.png";
        break;
      case "Rain":
        icon.src = "assets/design-1/rain.png";
        break;
      case "Thunderstorm":
        icon.src = "assets/design-1/storm.png";
        break;
      default:
        icon.src = "assets/design-1/default.png"; // Add a default icon if needed
    }
  });
};

// Initial call to fetch weather data
fetchWeather();
