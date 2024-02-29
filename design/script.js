//DOM
document.addEventListener("DOMContentLoaded", function () {
  const forecastContainer = document.getElementById("forecast");
  const sunriseSunsetDOM = {
    sunrise: document.getElementById("sunrise-time"),
    sunset: document.getElementById("sunset-time"),
  };

  //DOM querySelector make( that it can take a class and an id, class= "." id= "#" )
  const backImg = document.querySelector(".backimg");
  const container = document.getElementById("weather");

  // fetch the api from openweathermap
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=c8fa4668e358d868f3ce8d740d6137ec"
  )
    //then turning it in to a json
    .then((response) => {
      return response.json();
    })

    //then use the json, and do a function
    //go thru the json than ... than the new name
    .then((json) => {
      const sunriseTimeInMilliseconds = json.sys.sunrise * 1000;
      const sunsetTimeInMilliseconds = json.sys.sunset * 1000;

      //get the time in a read aboul way
      function formatTimeSwedish(milliseconds) {
        const date = new Date(milliseconds);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}: ${formattedMinutes}`;
      }

      //updats the html time
      sunriseSunsetDOM.sunrise.textContent = formatTimeSwedish(
        sunriseTimeInMilliseconds
      );
      sunriseSunsetDOM.sunset.textContent = formatTimeSwedish(
        sunsetTimeInMilliseconds
      );

      //make the "header" go
      const currentTime = new Date().getTime();
      let WeatherIcon;
      if (
        currentTime > sunsetTimeInMilliseconds ||
        currentTime < sunriseTimeInMilliseconds
      ) {
        // Night
        // and i put true on this one for the moon
        WeatherIcon = getWeatherIcon(json.weather[0].main, true);
        backImg.style.backgroundImage =
          "linear-gradient(to bottom right, #161955, #444891";
      } else {
        // Day
        WeatherIcon = getWeatherIcon(json.weather[0].main);
        backImg.style.backgroundImage =
          "linear-gradient(to bottom right, #8589FF, #E8E9FF)";
      }

      container.innerHTML = `
    <img src="${WeatherIcon}"
    <div class="text">
    <h1>${json.main.temp.toFixed(1)}°C</h1>
    <p>${json.name}</p>
    <p>${json.weather[0].description}</p>
    </div>
    `;
    })

    //error messages
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });

  //fetch value for forecast data
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=c8fa4668e358d868f3ce8d740d6137ec"
  )
    //then turning it in to a json
    .then((response) => {
      return response.json();
    })

    // Filter the forecast list to get information from the same time every day (12:00).
    .then((json) => {
      const dailyForecast = json.list.filter((forecast) => {
        const forecastDateTime = new Date(forecast.dt_txt);
        return forecastDateTime.getHours() === 12; // Filter only forecasts for 12:00 pm
      });

      // Loopa igenom varje dag i väderprognosen och skapa HTML för att visa väderuppgifterna
      dailyForecast.forEach((day) => {
        const date = new Date(day.dt * 1000); // Konvertera från sekunder till millisekunder
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        const temperature = `${day.main.temp.toFixed(1)}°C`;
        const weatherDescription = day.weather[0].description;
        const WeatherIcon = getWeatherIcon(day.weather[0].main);

        // Create the HTML to display the weather forecast for each day

        const forecastHTML = `
        <div class="forecast-item" onclick="troll()">
          <h1>${dayOfWeek}</h1>
          <img src="${WeatherIcon}">
          <p>${weatherDescription}</p>
          <p>${temperature}</p>
        </div>
      `;

        // Add the weather forecast to the container element
        forecastContainer.insertAdjacentHTML("beforeend", forecastHTML);
      });
    })

    //error messages
    .catch((error) => {
      console.error("Error fetching forecast data:", error);
    });

  /*Funktion för att visa vädret för den aktuella platsen*/
  /*försöker göra en funktion så man kan se var du är och en loading spinner
  function showWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const weatherAPIKey = "c8fa4668e358d868f3ce8d740d6137ec";
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherAPIKey}`;

    fetch(weatherURL)
      .then((response) => response.json())
      .then((data) => {
        // Hämta vädret för användarens plats och visa det på sidan
        const temperature = data.main.temp.toFixed(1);
        const location = data.name;
        const description = data.weather[0].description;
        const weatherIcon = getWeatherIcon(data.weather[0].main);

        // Uppdatera HTML-elementen för att visa vädret för användarens plats
        container.innerHTML = `
       <img src="${weatherIcon}">
       <div class="text">
         <h1>${temperature}°C</h1>
         <p>${location}</p>
         <p>${description}</p>
       </div>
       `;

        hideLoadingSpinner();
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }

    calling the getLocation()

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showWeather);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  

  function showLoadingSpinner() {
    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.style.display = "block";
  }
  function hideLoadingSpinner() {
    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.style.display = "none";
  }
  /calling the getLocation()
  getLocation();*/
  // a function to get the weather icons
  // and because i want to show the moon when it is night
  // i put moon = fales
  // if it is night it's going to put a moon up insted of "clouds"
  function getWeatherIcon(weatherDescription, moon = false) {
    console.log(weatherDescription);
    if (moon) {
      return "—Pngtree—grey moon free illustration_4452211.png";
    }
    if (weatherDescription === "Clouds") {
      return "decorative_7266228.png";
    } else if (
      weatherDescription === "Rain" ||
      weatherDescription === "Drizzle"
    ) {
      return "rain-png-45881.png";
    } else if (weatherDescription === "Clear") {
      return "sun-48190.png";
    }
  }

  /*to make the X for the menu*/
  function myFunction(x) {
    x.classList.toggle("change");
  }

  /*something funny then you click on the up comming weathers*/
  function troll() {
    console.log("troll");
    window.open("https://youtu.be/xvFZjo5PgG0?si=9AXihk5f-0zqF-8s");
  }
});
