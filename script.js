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
    
    
    `;
  });
/*
const fetchWeatherData = () => {
  // ... your fetch and data processing code ...

  // Use the weather description to set the weather icon
  const iconFileName = weatherIcons[currentWeatherDescription];
  if (iconFileName) {
    // Set the src attribute with the relative path to the image
    weatherIcon.src = `images/${iconFileName}`;
    weatherIcon.alt = currentWeatherDescription;
  } else {
    // If the weather description is not in the mapping, use a default icon
    weatherIcon.src = "images/default.png";
    weatherIcon.alt = "Default Icon";
  }
};

// Invoke the fetchWeatherData function to fetch and display weather data
fetchWeatherData();
*/
hamburgerMenu.addEventListener("click", function () {
  console.log(`hamburger menu`);
  if (navMenu.style.display === "block") {
    navMenu.style.display = "none";
  } else {
    navMenu.style.display = "block";
  }
});
