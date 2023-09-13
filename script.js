const container = document.getElementById(`weather`);
const hamburgerMenu = document.getElementById("hamburger-menu");
const navMenu = document.getElementById("nav-menu");
const weatherIcon = document.getElementById("weather-icon");



fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=168451996f01476589314aaee8750993"
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
    <p>Sunrise: ${json.sunriseTime}, Sunset: ${json.sunsetTime}</p>
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


fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=168451996f01476589314aaee8750993")
  .then(response => response.json())
  .then((json) => {
    /*if(json.sys) {
      displaySunriseSunset(json.sys.sunrise, json.sys.sunset);
    } else {
      console.error('sys property not found in the response:', json);
    }
  })
  .catch(error => console.error('Error:', error));*/

  const displaySunriseSunset = (sunriseTimestamp, sunsetTimestamp) => {
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);
  
    const sunriseTime = `${sunriseDate.getHours()}:${sunriseDate.getMinutes().toString().padStart(2, '0')}`;
    const sunsetTime = `${sunsetDate.getHours()}:${sunsetDate.getMinutes().toString().padStart(2, '0')}`;
  
    
    console.log(`Sunrise: ${sunriseTime}, Sunset: ${sunsetTime}`);

    document.getElementById('sunrise-time').textContent = sunriseTime;
    document.getElementById('sunset-time').textContent = sunsetTime;
  }





/*fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=168451996f01476589314aaee8750993")
.then(response => response.json())
.then((json) => {
  displaySunriseSunset(json.sys.sunrise, json.sys.sunset);
  
})
.catch(error => console.error('Error:', error));*/