//DOM

const forecastContainer = document.getElementById("forecast");
const sunriseSunsetDOM = {
  sunrise: document.getElementById("sunrise-time"),
  sunset: document.getElementById("sunset-time"),
};

//DOM querySelector (can take Class and Id,
// Class= "." Id= "#" )
const backImg = document.querySelector(".backimg");
const container = document.getElementById("weather");
const hamburger = document.getElementById("hamburger");
const dropdown = document.getElementById("dropdown");
const dinPlats = document.getElementById("din-plats");
const stockholm = document.getElementById("stockholm");

///------------------------ first weather fetch for today in stockholm ------------------------///

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
  //sunrise * (gånger) 1000 = 1sec
  //sunset * (gånger) 1000 = 1sec
  .then((json) => {
    const sunriseTimeInSec = json.sys.sunrise * 1000;
    const sunsetTimeInSec = json.sys.sunset * 1000;

    //get the time in a read aboul way
    function formatTimeSwedish(sec) {
      const date = new Date(sec);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      //gör tiden läsbart, allt under 10 får en 0 framför sig så 08 ist för 8
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}: ${formattedMinutes}`;
    }

    //updats the html time
    sunriseSunsetDOM.sunrise.textContent = formatTimeSwedish(sunriseTimeInSec);
    sunriseSunsetDOM.sunset.textContent = formatTimeSwedish(sunsetTimeInSec);

    //make the "header" go
    // söka runt på new date o gettime
    const currentTime = new Date().getTime();
    let WeatherIcon;
    if (currentTime > sunsetTimeInSec || currentTime < sunriseTimeInSec) {
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

///------------------------ second weather fetch for the upcoming week ------------------------///

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
      const date = new Date(day.dt * 1000); // Konvertera från millesekunder till sekunder
      const dayOfWeek = date.toLocaleDateString("sv-SE", { weekday: "long" });
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

///---------------try location---------------///
function fetchWeatherDataBasedOnLocation() {
  if (navigator.geolocation) {
    // Get user's current position
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      //makes the dropdown list diseper efter the side have loaded
      dropdown.style.display = "none";

      // Fetch weather data based on user's location
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=c8fa4668e358d868f3ce8d740d6137ec`
      )
        .then((response) => response.json())
        .then((data) => {
          const temperature = `${data.main.temp.toFixed(1)} °C`;
          const weatherDescription = data.weather[0].description;
          const weatherIcon = getWeatherIcon(data.weather[0].main);
          const cityName = data.name;

          container.innerHTML = `
              <img src="${weatherIcon}">
              <h1>${temperature}</h1>
              <P>${cityName}</p>
              <p>${weatherDescription}</p>
          `;
        })

        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });

      fetchWeatherForecastForLocation(latitude, longitude);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function fetchWeatherForecastForLocation(latitude, longitude) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=c8fa4668e358d868f3ce8d740d6137ec`
  )
    .then((response) => response.json())
    .then((data) => {
      const dailyForecast = data.list.filter((forecast) => {
        const forecastDateTime = new Date(forecast.dt_txt);
        return forecastDateTime.getHours() === 12; // Filter only forecasts for 12:00 pm
      });
      // Hantera väderprognosdata och uppdatera användargränssnittet

      // Implementera kod för att visa väderprognosen i användargränssnittet
      forecastContainer.innerHTML = "";

      dailyForecast.forEach((forecast) => {
        // Extrahera relevant information för varje prognosdag
        const date = new Date(forecast.dt * 1000); // Omvandla från sekunder till millisekunder
        const dayOfWeek = date.toLocaleDateString("sv-SE", { weekday: "long" });
        const temperature = `${forecast.main.temp.toFixed(1)} °C`;
        const weatherDescription = forecast.weather[0].description;
        const weatherIcon = getWeatherIcon(forecast.weather[0].main);

        const forecastHTML = `
        <div class="forecast-item" onclick="troll()">
          <h1>${dayOfWeek}</h1>
          <img src="${weatherIcon}">
          <p>${temperature}</p>
          <p>${weatherDescription}</p>
        </div>
      `;
        forecastContainer.insertAdjacentHTML("beforeend", forecastHTML);
      });
    })

    .catch((error) => {
      console.error("Error fetching forecast data:", error);
    });
}

dinPlats.addEventListener("click", function (event) {
  event.preventDefault();

  fetchWeatherDataBasedOnLocation();
});

///------------------------ functions(icon,menu,video) ------------------------///

// 1.
// a function to get the weather icons
// and because i want to show the moon when it is night
// i put moon = fales
// if it is night it's going to put a moon up insted of "clouds"
function getWeatherIcon(weatherDescription, moon = false) {
  console.log(weatherDescription);
  if (moon) {
    return "—Pngtree—grey moon free illustration_4452211.png";
  }
  if (weatherDescription === "Clouds" || weatherDescription === "Snow") {
    return "decorative_7266228.png";
  } else if (
    weatherDescription === "Rain" ||
    weatherDescription === "Drizzle"
  ) {
    return "rain-png-45881.png";
  } else if (weatherDescription === "Clear") {
    return "sun-48190.png";
  } else if (weatherDescription === "Mist") {
    return "—Pngtree—water mist circling the smoke_5770596.png";
  }
}

// 2.
/*menu*/
hamburger.addEventListener("click", function () {
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
});

/* ett annat sätt att skriva if satser på funkar bara om de e två alltså if else
  const displayStyle = dropdown.style.display === "block" ? "none" : "block";
  dropdown.style.display = displayStyle;*/

// 3.
/*something funny then you click on the up comming weathers*/
function troll() {
  console.log("troll");
  window.open("https://youtu.be/xvFZjo5PgG0?si=9AXihk5f-0zqF-8s");
}
