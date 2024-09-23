const apiKey = "0c5116ff347d8ce8d78e8d3c18029dd7"; // Your API key
const city = "Stockholm,Sweden"; // City you want to get the weather for
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`; // Full API URL with parameters

// Now that apiUrl is defined, we can use it in the fetch function
fetch(apiUrl)
  .then((response) => response.json()) // Convert response to JSON
  .then((data) => {
    // Extract data and update the DOM elements
    const cityName = data.name;
    const temperature = data.main.temp.toFixed(1); // Rounds to 1 decimal
    const description = data.weather[0].description;

    // Update the DOM elements with the fetched data
    document.getElementById("city").textContent = `City: ${cityName}`;
    document.getElementById(
      "temp"
    ).textContent = `Temperature: ${temperature}°C`;
    document.getElementById("desc").textContent = `Weather: ${description}`;

    // Extract sunrise and sunset times and update the DOM
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    );
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    document.getElementById("sunrise").textContent = `Sunrise: ${sunriseTime}`;
    document.getElementById("sunset").textContent = `Sunset: ${sunsetTime}`;
  })
  .catch((error) => console.log("Error:", error)); // Handle any errors
