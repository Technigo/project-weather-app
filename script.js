document.addEventListener("DOMContentLoaded", function () {
  // Your code here, including the fetchFiveDayForecast function

  const container = document.getElementById(`weather`);
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navMenu = document.getElementById("nav-menu");
  const weatherIcon = document.getElementById("weather-icon");
  const forecastContainer = document.getElementById("weather-forecast");

  const city = "Stockholm,Sweden";
  const units = "metric";

  // Function to fetch and display the current weather
  const fetchCurrentWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&APPID=b0bce0ead37d18acc13ad506864e75ac`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const roundedTemperature = parseFloat(json.main.temp).toFixed(1);
        container.innerHTML = `
        <h1>${roundedTemperature} °C</h1>
        <h2>${json.name}</h2>
        
        <p>${json.weather[0].description}</p>
     
      `;

        // Fetch the weather icon mappings from JSON file
        fetch("weatherIcons.json")
          .then((response) => response.json())
          .then((iconMappings) => {
            const currentWeatherDescription = json.weather[0].description;
            const iconFileName =
              iconMappings[currentWeatherDescription] ||
              iconMappings["Default"];
            const iconURL = `images/${iconFileName}`;
            weatherIcon.src = iconURL;
            weatherIcon.alt = currentWeatherDescription;
          })
          .catch((error) => {
            console.error("Error fetching weatherIcons.json:", error);
          });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  fetchCurrentWeather();

  const apiKey = "b0bce0ead37d18acc13ad506864e75ac";
  // const city = "Stockholm,Sweden";
  const apiUrl5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  // Function to filter forecast data for 12:00 PM each day
  function filterForecastData(data) {
    console.log(data);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for comparison

    const filteredData = data.list.filter((item) => {
      const itemDate = new Date(item.dt * 1000); // Convert timestamp to date
      itemDate.setHours(0, 0, 0, 0); // Set the time of the forecast date to midnight for comparison

      // Check if the forecast date is greater than the current date
      if (itemDate > currentDate) {
        // Check if the timestamp is for 12:00 PM (noon)
        return item.dt_txt.includes("12:00:00");
      }
      return false;
    });
    return filteredData;
  }

  // Function to display the weather forecast
  function displayWeatherForecast(forecastData) {
    forecastData.forEach((item) => {
      const date = new Date(item.dt * 1000); // Convert timestamp to date
      const dayOfWeek = date.toLocaleDateString("en-SE", { weekday: "short" });
      const temperature = parseFloat(item.main.temp).toFixed(1);

      const weatherDescription = item.weather[0].description;

      const forecastElement = document.createElement("p");
      forecastElement.textContent = `${dayOfWeek}: ${temperature}°C, ${weatherDescription}`;

      // Append the paragraph element to the forecast container
      forecastContainer.appendChild(forecastElement);

      console.log(`${dayOfWeek}: ${temperature}°C, ${weatherDescription}`);
    });
  }

  // Fetch weather data and display the forecast
  fetch(apiUrl5Days)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const forecastData = filterForecastData(data);
      displayWeatherForecast(forecastData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  hamburgerMenu.addEventListener("click", function () {
    console.log(`hamburger menu`);
    if (navMenu.style.display === "block") {
      navMenu.style.display = "none";
    } else {
      navMenu.style.display = "block";
    }
  });
});
