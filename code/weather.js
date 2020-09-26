const containerWeather = document.getElementById("weather");
const containerToday = document.getElementById("weatherToday");
const containerForecast = document.getElementById("weatherForecast");
let citySearched = "Ösmo";

// Function to fetch weather today
const fetchWeatherToday = (citySearched) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=metric&APPID=bb01c6104c60aa55995fd66eb0340647`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherToday) => {
      containerToday.innerHTML = "";
      containerToday.innerHTML += generatedHTMLForWeatherToday(weatherToday);
    });
};
fetchWeatherToday(citySearched);

// Function to invoke already created functions and manipulate the DOM
const generatedHTMLForWeatherToday = (weatherToday) => {
  const temperature = calculatedTemperature(weatherToday.main.temp);
  const timeInCity = calculatingTime(weatherToday.dt);
  const sunrise = calculatingTime(weatherToday.sys.sunrise);
  const sunset = calculatingTime(weatherToday.sys.sunset);
  const iconToday = iconDependingOnWeather(weatherToday.weather[0].main);
  const description = weatherToday.weather[0].description;
  weatherBackgroundColor(weatherToday.main.temp);

  // Separate and build up the HTML tree
  let weatherTodayHTML = "";
  weatherTodayHTML += ` <img src='${iconToday}'>`;
  weatherTodayHTML += `<div class="location-information">`;
  weatherTodayHTML += `<p class="temp-today"> ${temperature}\xB0 </p>`;
  weatherTodayHTML += `<p class="location"> ${weatherToday.name} </p>`;
  weatherTodayHTML += `<p class="description"> ${description} </p>`;
  weatherTodayHTML += `<p class="local-time"> ${timeInCity} </p>`;
  weatherTodayHTML += `</div>`;

  weatherTodayHTML += `<div class="sun-information">`;
  weatherTodayHTML += `<p class="sunrise"> Sunrise ${sunrise}</p>`;
  weatherTodayHTML += `<p class="sunset"> Sunset ${sunset}</p>`;
  weatherTodayHTML += `</div>`;
  return weatherTodayHTML;
};

// Function to fetch weather forcast of 5-days
const fetchWeatherForcast = (citySearched) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${citySearched}&units=metric&APPID=bb01c6104c60aa55995fd66eb0340647`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherForcast) => {
      containerForecast.innerHTML = "";
      const filteredForcast = weatherForcast.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );

      filteredForcast.forEach((forcast) => {
        containerForecast.innerHTML += generatedHTMLForWeatherForcast(forcast);
      });
    });
};
fetchWeatherForcast(citySearched);

// Function to invoke already created functions and manipulate the DOM
const generatedHTMLForWeatherForcast = (filteredForcast) => {
  const weekday = printDay(filteredForcast.dt_txt);
  const dailyTemp = calculatedTemperature(filteredForcast.main.temp);
  const tempFeelsLike = calculatedTemperature(filteredForcast.main.feels_like);
  const iconForcast = iconDependingOnWeather(filteredForcast.weather[0].main);

  // Separate and build up the HTML tree
  let weatherForcast = "";
  weatherForcast += `<div class="weather-forcast">`;
  weatherForcast += `<p class="day">${weekday}</p>`;
  weatherForcast += `<img src='${iconForcast}'>`;
  weatherForcast += `<p class="temp-forcast">${dailyTemp}\xB0/ ${tempFeelsLike}\xB0</p>`;
  weatherForcast += `</div>`;
  return weatherForcast;
};

// Function for temp rounded to one decimal
const calculatedTemperature = (number) => {
  const roundedTemp = Math.round(number * 10) / 10;
  return roundedTemp;
};

// Function to convert time to a readable format
const calculatingTime = (time) => {
  const timeSet = new Date(time * 1000);
  const timeString = timeSet.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return timeString;
};

// Functions to print a short day of our 5 day weather forcast
const printDay = (day) => {
  const forcastDays = new Date(day);
  const forcastDaysString = forcastDays.toLocaleDateString("en-US", {
    weekday: "short",
  });
  return forcastDaysString;
};

// Function to limit amount of description to be able to link them to an icon
const iconDependingOnWeather = (item) => {
  const iconMainDescription = item;
  if (iconMainDescription === "Clouds") {
    return "http://openweathermap.org/img/wn/03d@4x.png";
  } else if (iconMainDescription === "Clear") {
    return "http://openweathermap.org/img/wn/01d@4x.png";
  } else if (iconMainDescription === "Rain") {
    return "http://openweathermap.org/img/wn/10d@4x.png";
  } else if (iconMainDescription === "Thunderstorm") {
    return "http://openweathermap.org/img/wn/11d@4x.png";
  } else if (iconMainDescription === "Drizzle") {
    return "http://openweathermap.org/img/wn/09d@4x.png";
  } else if (iconMainDescription === "Snow") {
    return "http://openweathermap.org/img/wn/13d@4x.png";
  } else return "http://openweathermap.org/img/wn/50d@4x.png";
};

// Function to  change background color depending on temperature
const weatherBackgroundColor = (temp) => {
  if (temp < 6) {
    containerWeather.style.backgroundColor = "#b3cde3";
  } else if (temp >= 6 && temp < 21) {
    containerWeather.style.backgroundColor = "#fed98e";
  } else containerWeather.style.backgroundColor = "#fe992a";
};

// Function invoked when search button is clicked
const citySelected = () => {
  citySearched = document.getElementById("cityNamePicked").value;
  fetchWeatherForcast(citySearched);
  fetchWeatherToday(citySearched);
  document.getElementById("cityNamePicked").value = ""; //to clear input value after search
};
