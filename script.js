document.addEventListener("DOMContentLoaded", function () {
  // Your code here, including the fetchFiveDayForecast function

<<<<<<< HEAD
  const container = document.getElementById("weather-container");
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navMenu = document.getElementById("nav-menu");
  //const weatherIcon = document.getElementById("weather-icon");
  const sunriseTime = document.getElementById("sunrise-time");
  const sunsetTime = document.getElementById("sunset-time");

=======
  const searchButton = document.getElementById('search-button');
  const searchBar = document.getElementById('search-bar');
  const searchBarButton = document.getElementById('search-bar-button')
  const container = document.getElementById('weather-container');
  const weatherIcon = document.getElementById('weather-icon');
>>>>>>> stylingCaroL
  const forecastContainer = document.getElementById("weather-forecast");
  const searchIconElement = document.querySelector('.search-icon-class');
  const closeIconElement = document.querySelector('.close-icon-class');

  const city = "Stockholm,Sweden";
  const units = "metric";

  const fetchCurrentWeather = () => {
<<<<<<< HEAD
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=168451996f01476589314aaee8750993"
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        const roundedTemperature = parseFloat(json.main.temp).toFixed(1);

        container.innerHTML += `
        <div class="background-img">
    <h1>${roundedTemperature} °C</h1>
    <h2>${json.name}</h2>
    <p>${json.weather[0].main}</p>
    
    <div id="sunrise-time"><p>Sunrise: ${json.sunriseTime},</p></div>
    <div id="sunset-time"><p>Sunset: ${json.sunsetTime}</p></div> 
    </div>
  `;

        const weatherIcon = (iconID) => {
          let base_URL = `https://openweathermap.org/img/wn/`;
          let icon = iconID;
          let end_URL = `@2x.png`;

          return base_URL + icon + end_URL;
        };
        // Fetch the weather icon mappings from JSON file⁄⁄⁄⁄⁄⁄⁄⁄
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  fetchCurrentWeather();
=======
  
    fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=168451996f01476589314aaee8750993"
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    const roundedTemperature = parseFloat(json.main.temp).toFixed(1);
  
    container.innerHTML += `
    <h1>${roundedTemperature} °C</h1>
    <h2>${json.name}</h2>
    <p>${json.weather[0].main}</p>
    <div class="sunrise-time" id="sunrise-time"><p>Sunrise: ${json.sunriseTime},</p></div>
    <div class="sunset-time"id="sunset-time"><p>Sunset: ${json.sunsetTime}</p></div> 
  `;
  
//Construct the icon URL using the icon ID from the API response
const iconID = json.weather[0].icon;
const iconURL = `https://openweathermap.org/img/wn/${iconID}@2x.png`;

// Set the icon URL as the src attribute of the weatherIcon element
weatherIcon.src = iconURL;
weatherIcon.alt = json.weather[0].main;
})
.catch((error) => {
console.error("There was a problem with the fetch operation:", error);
});
};

fetchCurrentWeather();

      // Fetch the weather icon mappings from JSON file
  

>>>>>>> stylingCaroL

  const weatherIcon = (iconID) => {
    let base_URL = `https://openweathermap.org/img/wn/`;
    let icon = iconID;
    let end_URL = `@2x.png`;

    return base_URL + icon + end_URL;
  };
  weatherIcon();

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
        return item.dt_txt.includes("21:00:00");
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

<<<<<<< HEAD
  hamburgerMenu.addEventListener("click", function () {
    console.log(`hamburger menu`);
    if (navMenu.style.display === "block") {
      navMenu.style.display = "none";
=======
  
  
const displaySunriseSunset = (sunriseTimestamp, sunsetTimestamp) => {
  const sunriseDate = new Date(sunriseTimestamp * 1000); //shows the time in milliseconds
  const sunsetDate = new Date(sunsetTimestamp * 1000);

  const sunriseTime = `${sunriseDate.getHours()}:${sunriseDate.getMinutes().toString().padStart(2, '0')}`;
  const sunsetTime = `${sunsetDate.getHours()}:${sunsetDate.getMinutes().toString().padStart(2, '0')}`;

  
  console.log(`Sunrise: ${sunriseTime}, Sunset: ${sunsetTime}`);

  
  document.getElementById('sunrise-time').innerHTML = `<p>Sunrise: ${sunriseTime}</p>`;
  document.getElementById('sunset-time').innerHTML = `<p>Sunset: ${sunsetTime}</p>`;

}



fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=168451996f01476589314aaee8750993")
  .then(response => response.json())
  .then((json) => {
    if(json.sys) {
      displaySunriseSunset(json.sys.sunrise, json.sys.sunset);
>>>>>>> stylingCaroL
    } else {
      navMenu.style.display = "block";
    }
  });

<<<<<<< HEAD
  const displaySunriseSunset = (sunriseTimestamp, sunsetTimestamp) => {
    const sunriseDate = new Date(sunriseTimestamp * 1000); //shows the time in milliseconds
    const sunsetDate = new Date(sunsetTimestamp * 1000);

    const sunriseTime = `${sunriseDate.getHours()}:${sunriseDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const sunsetTime = `${sunsetDate.getHours()}:${sunsetDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    console.log(`Sunrise: ${sunriseTime}, Sunset: ${sunsetTime}`);

    document.getElementById(
      "sunrise-time"
    ).innerHTML = `<p>Sunrise: ${sunriseTime}</p>`;
    document.getElementById(
      "sunset-time"
    ).innerHTML = `<p>Sunset: ${sunsetTime}</p>`;
  };

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=168451996f01476589314aaee8750993"
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.sys) {
        displaySunriseSunset(json.sys.sunrise, json.sys.sunset);
      } else {
        console.error("sys property not found in the response:", json);
      }
    })
    .catch((error) => console.error("Error:", error));
=======


const toggleSearchBar = () => {
  
  if (searchBar.style.display === 'none' || searchBar.style.display === '') {
    searchBar.style.display = 'none';
    
    searchIconElement.classList.replace('search-icon', 'close-icon');
  } else {
    searchBar.style.display = 'none';
    
    closeIconElement.classList.replace('close-icon', 'search-icon');
  }
};

toggleSearchBar();

searchButton.addEventListener('click', () => {
  
  if (searchIconElement.style.display !== 'none') {
    searchIconElement.style.display = 'none';
    closeIconElement.style.display = 'block';
    searchBar.style.display = 'block';
  } else {
    searchIconElement.style.display = 'block';
    closeIconElement.style.display = 'none';
    searchBar.style.display = 'none';
  }
>>>>>>> stylingCaroL
});

});