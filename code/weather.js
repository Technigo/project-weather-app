//get location when page is loading

window.onload = () => getLocation();

//get location through browser

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCity);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

//change city by user input

const changeCity = () => {
  let city = document.getElementById("city-label").value;
  getLatLong(city);
};

//this function is just used for getting the city name (reverse geolocation) to show to the user when using "current position"

const getCity = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7d01b328e34c450986cb7faef032a771`
  )
    .then((response) => response.json())
    .then((forecast) => {
      document.getElementById("city").innerHTML = forecast.city.name;
      fetchForecast(lat, lon);
    })
    .catch((err) => console.error(err));
};

//get coordinates when user change city (using One Call API which only takes coordinates as parameter)

const getLatLong = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},Sweden&units=metric&APPID=7d01b328e34c450986cb7faef032a771`
  )
    .then((response) => response.json())
    .then((forecast) => {
      const lat = forecast.coord.lat;
      const lon = forecast.coord.lon;
      document.getElementById("city").innerHTML = forecast.name;
      fetchForecast(lat, lon);
    })
    .catch((err) => console.error(err));
};

//Main function for fetching forecast data

const fetchForecast = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&%20exclude=current,minutely,hourly&appid=7d01b328e34c450986cb7faef032a771&units=metric`
  )
    .then((response) => response.json())
    .catch((err) => console.error(err))
    .then((json) => {
      generateForecast(json);
    });
};

const getDayOfWeek = (dayOfWeek) => {
  return isNaN(dayOfWeek)
    ? null
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek];
};

//main function for generating the HTML

const generateForecast = (forecast) => {
  //get current temp
  const currentTemp = document.getElementById("current");
  currentTemp.innerHTML = `${Math.round(forecast.current.temp)}&#176`;

  //get current weather icon
  const currentIcon = document.getElementById("current-icon");
  currentIcon.src = `${forecast.current.weather[0].icon}@2x.png`;

  //get current weather
  const currentWeather = document.getElementById("current-weather");
  currentWeather.innerHTML = forecast.current.weather[0].description;

  //get sunrise/sunset
  const sunriseHTML = document.getElementById("sunrise");
  const sunsetHTML = document.getElementById("sunset");
  const sunrise = new Date(forecast.current.sunrise * 1000);
  const sunriseString = sunrise.toLocaleTimeString("en-US", {
    timestyle: "short",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(forecast.current.sunset * 1000);
  const sunsetString = sunset.toLocaleTimeString("en-US", {
    timestyle: "short",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  sunriseHTML.innerHTML = `Sunrise:  ${sunriseString}`;
  sunsetHTML.innerHTML = `Sunset:  ${sunsetString}`;

  //Get new array with forecast to map in new array
  const slicedForecast = forecast.daily.slice(0, 5);
  //get array for HTML elements to loop through
  const daysInForecast = document.getElementsByClassName("day");

  //loop through each day and set HTML
  slicedForecast.forEach((day, index) => {
    daysInForecast[index].querySelector(
      ".next-day"
    ).innerHTML = `${getDayOfWeek(new Date(day.dt * 1000).getDay())}`;
    daysInForecast[index].querySelector(
      ".day-temp"
    ).innerHTML = `<span class="wind-dir" style="transform: rotate(${day.wind_deg}deg)">&#8593</span>`;
    daysInForecast[index].querySelector(
      ".day-temp"
    ).innerHTML += `<span class="data-text, tablet">${Math.round(
      day.wind_speed
    )} m/s</span>`;
    daysInForecast[index].querySelector(
      ".day-temp"
    ).innerHTML += `<img src='${day.weather[0].icon}@2x.png'>   `;
    daysInForecast[index].querySelector(
      ".day-temp"
    ).innerHTML += `<span class="data-text">${Math.round(
      day.temp.min
    )}&#176 / ${Math.round(day.temp.max)}&#176</span>`;
  });
};
