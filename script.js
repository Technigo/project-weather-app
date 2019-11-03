// API Key
const apiKey = "79a5016dc063fba5a823f15d23b3fb1f";

//Months translation
const monthShortNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

//Geolocation functions
function locationRetrieved(pos) {
  let crd = pos.coords;
  city = `lat=${crd.latitude}&lon=${crd.longitude}`;
  return city;
}

function locationError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function inCaseOfError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById(
        "city"
      ).innerHTML = `ERROR!<p class="error-message">You denied our request for Geolocation.</p><img src="assets/error-geolocation.jpg" alt="Error message image"><p class="error-message-detail">Please allow geolocation for weather forecast of your location or type a city on the search bar.</p>`;
      document.getElementById("video").src = undefined;
      document.getElementById("main").style.background = "salmon";
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById(
        "city"
      ).innerHTML = `ERROR!<p class="error-message">Location information is unavailable.</p><img src="assets/error-geolocation.jpg" alt="Error message image"><p class="error-message-detail"> Please type a city on the search bar.</p>`;
      document.getElementById("video").src = undefined;
      document.getElementById("main").style.background = "salmon";
      break;
    case error.TIMEOUT:
      document.getElementById(
        "city"
      ).innerHTML = `ERROR!<p class="error-message">The request to get your location timed out.</p><img src="assets/error-geolocation.jpg" alt="Error message image"><p class="error-message-detail"> Please type a city on the search bar.</p>`;
      document.getElementById("video").src = undefined;
      document.getElementById("main").style.background = "salmon";
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById(
        "city"
      ).innerHTML = `ERROR!<p class="error-message">An unknown error occurred.</p><img src="assets/error-geolocation.jpg" alt="Error message image"><p class="error-message-detail"> Please type a city on the search bar.</p>`;
      document.getElementById("video").src = undefined;
      document.getElementById("main").style.background = "salmon";
      break;
  }
}

//Toggle functions for accordion menu
//It resizes the height of the content according to the accordion menu
//It adds 125px when detail open and removes it when collapsing detail
//It verifies if height is lower than client height to not remove more than it should
//It then rotates the icon depending on detail open or not
//OBS: Does not work in Safari for some reason
let accordion = 0;

function toggle() {
  this.classList.toggle("active");
  let height = document.getElementById("main").clientHeight;

  if (this.classList.contains("active")) {
    accordion += 1;
  } else {
    accordion -= 1;
  }
  height += accordion * 150;

  if (height > document.getElementById("main").clientHeight) {
    document.getElementById("video").style.height = `${height}px`;
  } else {
    document.getElementById("video").style.height = document.getElementById(
      "main"
    ).clientHeight;
  }

  switch (this.id) {
    case "section1":
      document.getElementById("arrow1").classList.toggle("rotate");
      break;
    case "section2":
      document.getElementById("arrow2").classList.toggle("rotate");
      break;
    case "section3":
      document.getElementById("arrow3").classList.toggle("rotate");
      break;
    case "section4":
      document.getElementById("arrow4").classList.toggle("rotate");
      break;
    case "section5":
      document.getElementById("arrow5").classList.toggle("rotate");
      break;
  }
}

//Function to clear containers before loading a new location
const clearData = () => {
  document.getElementById("main").style.background = "white";
  document.getElementById("city").innerHTML = "";
  document.getElementById("temperature").innerHTML = "";
  document.getElementById("description").innerHTML = "";
  document.getElementById("icon").style.display = "none";
  document.getElementById("forecast").innerHTML = "";
  document.getElementById("sunrise-sunset").innerHTML = "";
};

//Function that translates wind degrees to cardinal directions
const getWindDirection = degrees => {
  if (degrees < 45) {
    return "N";
  } else if (degrees < 90) {
    return "NE";
  } else if (degrees < 135) {
    return "E";
  } else if (degrees < 180) {
    return "SE";
  } else if (degrees < 225) {
    return "S";
  } else if (degrees < 270) {
    return "SW";
  } else if (degrees < 315) {
    return "W";
  } else if (degrees <= 360) {
    return "NW";
  }
};

//Function that returns backgroung according to weather id
const getBackgroundVideo = cod => {
  if (cod >= 200 && cod < 300) {
    return "thunderstorm";
  } else if (cod >= 300 && cod < 400) {
    return "drizzle";
  } else if (cod >= 500 && cod < 600) {
    return "rain";
  } else if (cod >= 600 && cod < 700) {
    return "snow";
  } else if (cod >= 700 && cod < 800) {
    return "fog";
  } else if (cod === 800) {
    return "clear";
  } else if (cod > 800) {
    return "cloudy";
  }
};

//Function that returns if current time is within sunrise and sunset or not.
//Used to choose from day or night backgrounds.
const isItNight = (time, sunrise, sunset) => {
  if (time >= sunrise && time <= sunset) {
    return "day";
  } else return "night";
};

//Gets current weather from API.
//Sets background accordingly to weather id (using getBackgroundVideo and isItNight).
//Fills city, summary, sunrise-sunset and icon elements
//Prints error message if 404 message is retrieved from API
const getActualWeather = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${city}&units=metric&APPID=${apiKey}`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      if (json.cod === 200) {
        let sunrise = new Date((json.sys.sunrise + json.timezone) * 1000);
        let sunset = new Date((json.sys.sunset + json.timezone) * 1000);
        let currentTime = new Date((json.dt + json.timezone) * 1000);

        document
          .getElementById("video")
          .setAttribute(
            "src",
            `assets/${isItNight(
              json.dt,
              json.sys.sunrise,
              json.sys.sunset
            )}_${getBackgroundVideo(json.weather[0].id)}.mp4`
          );

        document.getElementById(
          "city"
        ).innerHTML = `${json.name}, ${json.sys.country}`;
        document.getElementById(
          "temperature"
        ).innerHTML = `${json.main.temp.toFixed(1)}°`;

        document.getElementById(
          "description"
        ).innerHTML += `${json.weather[0].main.toLowerCase()}`;
        document.getElementById("icon").style.display = "inline";
        document.getElementById(
          "icon"
        ).src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;

        document.getElementById(
          "sunrise-sunset"
        ).innerHTML = `<p>current time: ${(
          "0" + currentTime.getUTCHours()
        ).slice(-2)}:${("0" + currentTime.getUTCMinutes()).slice(
          -2
        )}</p>sunrise: ${("0" + sunrise.getUTCHours()).slice(-2)}:${(
          "0" + sunrise.getUTCMinutes()
        ).slice(-2)} | sunset: ${("0" + sunset.getUTCHours()).slice(-2)}:${(
          "0" + sunset.getUTCMinutes()
        ).slice(-2)}`;
      } else if (json.cod === "404") {
        document.getElementById(
          "city"
        ).innerHTML = `ERROR!<p class="error-message">Location not found.</p><img src="assets/error.jpg" alt="Error message image"><p class="error-message-detail">Please check if you typed it correctly.</p>`;
        document.getElementById("video").src = undefined;
        document.getElementById("main").style.background = "salmon";
      } else {
        document.getElementById(
          "city"
        ).innerHTML = `ERROR!<p class="error-message">Location not found.</p><img src="assets/error.jpg" alt="Error message image"><p class="error-message-detail">Please check if you typed it correctly.</p>`;
      }
    })
    .catch(err => {
      return err;
    });
};

//This functions gets the forecast for the next 15 hours in intervals of 3 hours.
//With help from a forEach loop the function goes through the 5 indexs of the array.
//It prints day and month, temperature and icon.
//On the accordion detail is prints weather description, wind speed and direction, pressure and humidity.
//It also calls toggle functions for showing/hidding the accordion menu detail and rotate the icon.
const getNextHoursForecast = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?${city}&cnt=5&units=metric&APPID=${apiKey}`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      index = 1;
      json.list.forEach(weather => {
        let dt = new Date(weather.dt * 1000);

        document.getElementById(
          "forecast"
        ).innerHTML += `<div class="main-forecast" id="section${index}"><div>${dt.getDate()} ${
          monthShortNames[dt.getMonth()]
        } ${("0" + dt.getUTCHours()).slice(-2)}:${(
          "0" + dt.getUTCMinutes()
        ).slice(
          -2
        )}</div><div class="forecast-info">${weather.main.temp.toFixed(
          1
        )}°<img src="https://openweathermap.org/img/wn/${
          weather.weather[0].icon
        }.png" alt="Weather representation"><span id="arrow${index}">&#x25B6;</span></div></div>
        <div class="detail">
        <p><b>Weather description:</b> ${weather.weather[0].description}</p>
        <p><b>Wind speed (m/s):</b> ${weather.wind.speed.toFixed(0)}</p>
        <p><b>Wind direction:</b> ${getWindDirection(weather.wind.deg)}</p>
        <p><b>Atmospheric pressure (hPa):</b> ${weather.main.pressure}</p>
        <p><b>Humidity (%):</b> ${weather.main.humidity}</p></div>`;

        index++;
      });

      document.getElementById("section1").onclick = toggle;
      document.getElementById("section2").onclick = toggle;
      document.getElementById("section3").onclick = toggle;
      document.getElementById("section4").onclick = toggle;
      document.getElementById("section5").onclick = toggle;
    })
    .catch(err => {
      console.log("caught error", err);
    });
};

//Function called when the search bar button is clicked.
//It verifies the text input is not empty and if not:
//1. clears the data from the DOM.
//2. invokes refreshWeather with the content from the search bar.
//3. resets the content of text input field
//OBS: the position contains "q=" as the search query differs from the geolocation one.
const getWeather = () => {
  if (document.getElementById("location").value === "") {
    alert("Please type in a city.");
  } else {
    let position = `q=${document.getElementById("location").value}`;
    clearData();
    refreshWeather(position);
    document.getElementById("search-bar").reset();
  }
};

//Main function to be called.
//1. validates if position is either a string or an object.
//2.1 if object then var city is built with lat and lon
//2.2 if string it must have been invoked from getWeather and keeps it as it is
//3. calls API for actualWeather and NextHoursForecast
const refreshWeather = position => {
  if (typeof position === "object") {
    city = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
  } else if (typeof position === "string") {
    city = position;
  }

  clearData();

  getActualWeather();

  getNextHoursForecast();
};

//Validates if geolocation is available and calls function accordingly
navigator.geolocation.getCurrentPosition(refreshWeather, inCaseOfError);
