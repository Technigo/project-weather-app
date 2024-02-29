// DOM-Selectors
const todaysTemperature = document.getElementById("todays-temperature");
const weatherLocation = document.getElementById("weather-location");
const todaysWeather = document.getElementById("todays-weather");
const todaysSunrise = document.getElementById("todays-sunrise");
const todaysSunset = document.getElementById("todays-sunset");
const todaysTimeOfDay = document.getElementById("todays-time-of-day");

// Creating parts of URL
const BASE_TODAY_URL = "https://api.openweathermap.org/data/2.5/weather?";
const city = "Lundsberg,Sweden";
const API_KEY = "ebcad7517d4d5102daa2078b4d1b8409";
const weatherTodayURL = `${BASE_TODAY_URL}q=${city}&units=metric&APPID=${API_KEY}`;

// Function to update the UI with todays weather information
const updateWeatherToday = (weatherTodayData) => {
  /* ............START OF created variables........... */
  // A varieble temperatureTodayRounded (todays temperature, 1 decimal)
  const temperatureTodayRounded = weatherTodayData.main.temp.toFixed(1);
  // Creating a weatherTodayLocation variable
  const weatherTodayLocation = weatherTodayData.name;
  // Creating a weatherTodayDescription with capital starting-letter
  const weatherTodayDescription = weatherTodayData.weather
    .map(
      (weather) =>
        `${weather.description
          .charAt(0)
          .toUpperCase()}${weather.description.slice(1)}`
    )
    .join("");

  // Converting sunrise date from unix timestamps to milliseconds
  const sunriseTimeMilliseconds = new Date(weatherTodayData.sys.sunrise * 1000);
  console.log(sunriseTimeMilliseconds);

  // Converting sunrise date from unix timestamps to milliseconds
  const sunsetTimeMilliseconds = new Date(weatherTodayData.sys.sunset * 1000);
  console.log(sunsetTimeMilliseconds);

  // Formating sunrisetime to a readable format in Swedish
  const sunriseTimeFormatted = sunriseTimeMilliseconds.toLocaleTimeString(
    "sv-SE",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  // Testing formatted sunrise-time
  console.log("Formatted sunrise time:", sunriseTimeFormatted);

  // Formating sunsettime to a readable format in Swedish
  const sunsetTimeFormatted = sunsetTimeMilliseconds.toLocaleTimeString(
    "sv-SE",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  console.log("Formatted sunset time:", sunsetTimeFormatted);

  // Convert the data timestamp to milliseconds and adjust for the timezone shift
  const dataTimestampMilliseconds =
    (weatherTodayData.dt + weatherTodayData.timezone) * 1000;

  // Create a Date object for the adjusted data timestamp
  const localTime = new Date(dataTimestampMilliseconds);

  //Adjust for the timezone offset considering potential daylight saving time adjustments
  const timezoneOffsetMilliseconds = localTime.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  const localTimeCorrected = new Date(
    localTime.getTime() + timezoneOffsetMilliseconds
  );

  //Format the corrected local time in Swedish locale
  const formattedLocalTime = localTimeCorrected.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log("Local time at specified location", formattedLocalTime);

  /* ............START OF INNER-HTML-additions........... */
  // Todays temperature
  todaysTemperature.innerHTML = `
   <p> ${temperatureTodayRounded} </p>
   <p> °C </p> `;

  // testing todaysTemperature
  console.log(`"todays temperature:", ${temperatureTodayRounded}`);

  // Todays weather-location
  weatherLocation.innerHTML = `
   <p> ${weatherTodayLocation} </p>`;

  // testing the weatherLocation-name
  console.log(`"name:", ${weatherTodayLocation}`);

  // Todays weather with description
  todaysWeather.innerHTML = `
    <p> ${weatherTodayDescription} </p>`;

  // testing the todaysWeather
  console.log(`"weather description:", ${weatherTodayDescription}`);

  console.log("Weatherdata:", weatherTodayData);

  sunrise.innerHTML = `
   <p> sunrise ${sunriseTimeFormatted} </p>`;

  sunset.innerHTML = `
   <p> sunset ${sunsetTimeFormatted} </p>`;

  // Applying different images/icons based on time of day
  if (
    formattedLocalTime >= sunriseTimeFormatted &&
    formattedLocalTime <= sunsetTimeFormatted
  ) {
    // Display sun image in html
    todaysTimeOfDay.innerHTML = `<img src="design/assets/Big-sun.png" alt="Big sun image">`;
  } else {
    // Display moon-image in html
    todaysTimeOfDay.innerHTML = `img scr="design/assets/Big-moon.png" alt="Big moon image"`;
  }
};

// The fetching-function
const fetchWeatherToday = () => {
  fetch(weatherTodayURL)
    .then((response) => {
      return response.json();
    })
    .then((weatherTodayData) => {
      return updateWeatherToday(weatherTodayData);
    });
};

fetchWeatherToday();


// weather-forecast-try to look at the data that comes back. 3hr forecast. You only want to show, you don't want to show all of the entrypoints(you need to filter out all the entries the are at 12 o'clock. Mid temperature could be ) the day, what kind of weather (the icon) & the temperature. Map-function
