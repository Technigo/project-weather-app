function tryFetch() {
  return fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=10f8230f6149903425e19587fdc548b8"
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("Fetch error:", error);
    });
}

tryFetch()
  .then((data) => {
    document.getElementById("city-name").textContent = data.name;
    document.getElementById(
      "temperature"
    ).textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById(
      "description"
    ).textContent = `Description: ${data.weather[0].description}`;
    document.getElementById(
      "timezone"
    ).textContent = `Timezone: ${data.timezone}`;

    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById("sunrise").textContent = `Sunrise: ${sunriseTime}`;
    document.getElementById("sunset").textContent = `Sunset: ${sunsetTime}`;

    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

function fetchForecast() {
  return fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=10f8230f6149903425e19587fdc548b8"
  )
    .then((res) => res.json())
    .then((data) => {
      // Display the current forecast data
      document.getElementById("city-name").textContent = data.city.name;

      // Clear any existing content in the forecast section
      const forecastSection = document.getElementById("forecast-section");
      forecastSection.innerHTML = "";

      // Get the current date
      const today = new Date();

      // Filter forecast data for items with dt_txt containing "12:00:00"
      const filteredForecast = data.list.filter((forecastItem) =>
        forecastItem.dt_txt.includes("12:00:00")
      );

      // Loop through the filtered forecast data and display forecasts for the next five days
      let daysDisplayed = 0;
      filteredForecast.forEach((forecastItem) => {
        const date = new Date(forecastItem.dt * 1000);

        // Check if the date is in the future (after today)
        if (date > today) {
          const forecastDiv = document.createElement("div");
          forecastDiv.classList.add("forecast-item");

          const dateElement = document.createElement("p");
          dateElement.textContent = date.toLocaleDateString();

          const temperatureElement = document.createElement("p");
          temperatureElement.textContent = `Temperature: ${forecastItem.main.temp} °C`;

          const descriptionElement = document.createElement("p");
          descriptionElement.textContent = `Description: ${forecastItem.weather[0].description}`;

          // Append elements to the forecast div
          forecastDiv.appendChild(dateElement);
          forecastDiv.appendChild(temperatureElement);
          forecastDiv.appendChild(descriptionElement);

          // Append the forecast div to the forecast section
          forecastSection.appendChild(forecastDiv);

          daysDisplayed++;
          if (daysDisplayed >= 5) {
            // Display data for the next five days
            return;
          }
        }
      });

      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log("Fetch error:", error);
    });
}

fetchForecast();
