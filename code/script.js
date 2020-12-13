// API key: 607d94111f1f9c343f38c10112b16e3c
// REMOVE BEFORE SUBMISSION

let cityName = "Stockholm"

const city = document.getElementById("city");
const country = document.getElementById("country");
const localtime = document.getElementById("localtime");
const temperature = document.getElementById("temperature");
const tempFeelsLike = document.getElementById("tempfeelslike");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherType = document.getElementById("weathertype");

// This one toggles whether to show the city selector or not, by adding a display: none;
const toggleCountrySelector = () => {
  var citySelector = document.getElementById("citySelector");
  var inputCity = document.getElementById("inputCity")

  if (citySelector.style.display === "none") {
    citySelector.style.display = "block";
    inputCity.value = "";
    inputCity.select();
  } else {
    citySelector.style.display = "none";
  }
}

// formatTime() formats UNIX 10-digit timestamps to HH:MM format.
const formatTime = (timestamp) => {
  // Needed to add *1000 due to account for the absence of milliseconds in Unix timestamps. 
  let readableTime = new Date(timestamp * 1000);

  //Only use the HH:MM's of the readableTime
  readableTime = readableTime.toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  return readableTime;
}

// Function takes a Kelvin value, and returns a celsius value. 
const kelvinToCelsius = (temp) => {
  let celsius = Math.round(temp - 273.15);
  return celsius
}

// Returns the big weather image depending on the weather.
const fetchWeatherImage = (weather) => {
  // Purpose of this function should be to fetch an image and load it to the DOM, depending on the weather type.
  // Available: Clouds, Clear, Snow, Rain, Drizzle, Thunderstorm. (MIST IS MISSING)
  const image = document.getElementById("weatherImage");

  if (weather === 'Clouds') {
    console.log("It's cloudy today.");
    image.src = "./assets/img_cloud.svg";

  } else if (weather === 'Clear') {
    console.log("Sun's out!");
    image.src = "./assets/img_sun.svg";

  } else if (weather === 'Snow') {
    console.log("Brrr – snowy now.");
    image.src = "./assets/img_cloud.svg";

  } else if (weather === 'Rain') {
    console.log("Best bring an umbrella, son, cuz' it's pouring down.");
    image.src = "./assets/img_rain.svg";

  } else if (weather === 'Drizzle') {
    console.log("My rap name would be 'Young Drizzle'");
    image.src = "./assets/img_rain.svg";

  } else if (weather === 'Thunderstorm') {
    console.log("Oh hey, it's Thor! ⚡️");
    image.src = "./assets/img_rain.svg";

  } else {
    console.log("This... This is a weather type we've never seen before. Call the president.")
    image.src = "./assets/img_sun.svg";

  }
}

// Returns an image depending on the weather. Used in the forecast. Function is named after old purpose.
const fetchForecastEmojis = (weather) => {
  if (weather === 'Clouds') {
    // return "☁️";
    return "<img src='./assets/weather-icons/ic_16_cloud.svg'";

  } else if (weather === 'Clear') {
    // return "☀️";
    return "<img src='./assets/weather-icons/ic_16_sun.svg'";

  } else if (weather === 'Snow') {
    // return "❄️";
    return "<img src='./assets/weather-icons/ic_16_snow.svg'";

  } else if (weather === 'Rain') {
    // return "💦";
    return "<img src='./assets/weather-icons/ic_16_rain.svg'";

  } else if (weather === 'Drizzle') {
    // return "💧";
    return "<img src='./assets/weather-icons/ic_16_rain.svg'";

  } else if (weather === 'Thunderstorm') {
    // return "⚡️";
    return "<img src='./assets/weather-icons/ic_16_lightning.svg'";

  } else {
    return "🤯";
  }
}

// Function which fetches current weather data from a city, and populates the main objects in the DOM.
const fetchCurrentWeather = (cityName) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=607d94111f1f9c343f38c10112b16e3c`).then((response) => {
    return response.json();
  }).then((weatherObject) => {

    city.innerHTML = weatherObject.name;
    country.innerHTML = getCountryName(weatherObject.sys.country);
    temperature.innerHTML = Math.round(weatherObject.main.temp);
    tempFeelsLike.innerHTML = Math.round(weatherObject.main.feels_like) + "°";
    weatherType.innerHTML = weatherObject.weather[0].main;
    description.innerHTML = weatherObject.weather[0].description;
    sunrise.innerHTML = formatTime(weatherObject.sys.sunrise);
    sunset.innerHTML = formatTime(weatherObject.sys.sunset);

    fetchWeatherImage(weatherObject.weather[0].main);
  })
}

// 5-day forecast function. This one was hard.
const fetchForecast = (cityName) => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=607d94111f1f9c343f38c10112b16e3c`).then((response) => {
    return response.json();
  }).then((forecastObject) => {

    // Instead of an array of 40 objects, we want one object per day. Time ≈ the current time. Empty array creation time.
    const fiveDayList = [];

    // Get every 8th object from the forecastObject (since it's in 3-hour intervals), and push them into fiveDayList.
    for (let i = 7; i < forecastObject.list.length; i += 8) {
      fiveDayList.push(forecastObject.list[i]);
    }

    // Populate the DOM with data fetched. First, create a var for the section "forecastBox"
    const forecastBox = document.getElementById("forecastBox");

    // Need to clear the forecastBox, since otherwise switching cities won't work (since the forEach only *adds* stuff)
    forecastBox.innerHTML = ``
    console.log(fiveDayList);

    // For each element in the new array, extract the date, the temperature, and the weather. 
    fiveDayList.forEach(element => {
      const date = element.dt_txt.slice(0, 10);
      const temp = element.main.temp;
      const weather = element.weather[0].main;

      forecastBox.innerHTML += `
      <div id="forecastRow" class="forecast-row">
        <span class="forecast-date">${date}</span>
        <div class="forecast-temp">
          <span>${fetchForecastEmojis(weather)}</span>
          <span>${kelvinToCelsius(temp)}°</span>
        </div>
        <span class="forecast-weather">${weather}</span>        
        </div>`
    });
  })
}

// THIS IS WHERE THE MAGIC HAPPENS 👇.
const fetchWeather = (city) => {
  fetchForecast(city);
  fetchCurrentWeather(city);

  toggleCountrySelector();
}

fetchWeather(cityName);

// This line of code disables submitting through the enter key (since I did an ugly-hack for the city selector). Probably bad to re-route the submit function like this, but time was short.
// Modified it to call the fetchWeather function upon pressing Enter.
// https://stackoverflow.com/questions/5629805/disabling-enter-key-for-form/37241980
window.addEventListener('keydown', function (e) {
  if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
    if (e.target.nodeName == 'INPUT' && e.target.type == 'text') {
      fetchWeather(document.getElementById('inputCity').value);
      e.preventDefault();
      return false;
    }
  }
}, true);



