const container = document.getElementById(`weather`);
const hamburgerMenu = document.getElementById("hamburger-menu");
const navMenu = document.getElementById("nav-menu");
const weatherIcon = document.getElementById("weather-icon");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b0bce0ead37d18acc13ad506864e75ac"
)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    console.log(json);
    const roundedTemperature = parseFloat(json.main.temp).toFixed(1);
    //const temperature = Math.round(json.main.temp);
    container.innerHTML += `
    <h1>${roundedTemperature} °C</h1>
    <h2>${json.name}</h2>
    <p>${json.weather[0].description}</p>
    <p>${json.weather[0].icon}<p/>
    `;

    // Fetch the weather icon mappings from JSON file
    fetch("weatherIcons.json")
      .then((response) => response.json())
      .then((iconMappings) => {
        const currentWeatherDescription = json.weather[0].description;
        const iconFileName =
          iconMappings[currentWeatherDescription] || iconMappings["Default"];
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

// Invoke the fetchWeatherData function to fetch and display weather data

hamburgerMenu.addEventListener("click", function () {
  console.log(`hamburger menu`);
  if (navMenu.style.display === "block") {
    navMenu.style.display = "none";
  } else {
    navMenu.style.display = "block";
  }
});
