const apiKey = "15e8eef35aa52c93aeef1018b9732a74D";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=15e8eef35aa52c93aeef1018b9732a74";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=15e8eef35aa52c93aeef1018b9732a74";

async function checkWeather() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    console.log(data);

    document.getElementById("city").innerHTML = data.name;
    document.getElementById("temp").innerHTML = `${data.main.temp}°C`;
    
    // Convert UNIX timestamp to readable time
    document.getElementById("sunrise").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById("sunset").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkWeather();
});

//check forecast
async function getWeatherForecast() {
  try {
    const response = await fetch(forecastApiUrl);
    const forecastData = await response.json();
    
    // Filter to get the 12:00 PM forecast for each day
    const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

    // Display the forecast for the next 4 days
    displayForecast(dailyForecasts.slice(0, 4));
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

function displayForecast(dailyForecasts) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = ""; // Clear any previous content

  dailyForecasts.forEach(day => {
    const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });
    const tempMin = day.main.temp_min.toFixed(1);
    const tempMax = day.main.temp_max.toFixed(1);
    const icon = day.weather[0].icon;
    const description = day.weather[0].description;

    // Create forecast day card
    const forecastCard = `
      <div class="forecast-day">
        <div class="day">${date}</div>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
        <div class="temp">Min: ${tempMin}°C / Max: ${tempMax}°C</div>
        <div class="description">${description}</div>
      </div>
    `;
    
    // Append to forecast container
    forecastContainer.innerHTML += forecastCard;
  });
}

// Call the function to get the forecast
getWeatherForecast();

