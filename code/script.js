// Weather today
const cityWeather = document.getElementById("city");
const weatherDescription = document.getElementById("description");
const weatherImage = document.getElementById("weather-image");
const sunRise = document.getElementById("sunRise");
const sunSet = document.getElementById("sunSet");
const iconsTemp = document.getElementById("weather-icons");

// Forecast
const weatherForecastDay = document.getElementById("forecast-weekday");
const weatherForecastTemp = document.getElementById("forecast-temp");
const weatherForecastIcon = document.getElementById("forecast-icon");

// API link variables
const weatherOneDayApi =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,se&units=metric&APPID=44527f8be39feab9d034d48604c6b81d&lang=en";
const weatherForecastApi =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,se&units=metric&APPID=44527f8be39feab9d034d48604c6b81d&lang=en";

// First API - day weather
fetch(weatherOneDayApi)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // console.log('checking first json', json) // checking the json from open weather
    json.weather.forEach(sky => {
      weatherDescription.innerHTML += `${sky.description} | ${json.main.temp.toFixed(1)}° `;
      cityWeather.innerHTML = `${json.name}, prepare for ${sky.description} today.`;
    });
    weatherImage.innerHTML = `<img src="./img/${json.weather[0].icon}@2x.png" alt="Weather Icon" />`;
    // console.log('check if image is picked up:', weatherImage)
    // console.log(json.main.temp)

    // Change main text color and icons, based on temp:
    if (json.main.temp <= 5) {
      cityWeather.classList.toggle('cold-temp-city')
      iconsTemp.innerHTML = `❄️☃️🙌🏻`
    } else if (json.main.temp >= 20) {
      cityWeather.classList.toggle('hot-temp-city')
      iconsTemp.innerHTML = `☀️⛱😅`
    } else {
      cityWeather.classList.toggle('neutral-temp-city')
      iconsTemp.innerHTML = `🌻👍🏻`
    }
    // Sunrise and Sunset:
    sunRise.innerHTML = weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    sunSet.innerHTML = weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  });

// Second API - forecast weather
fetch(weatherForecastApi)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // console.log('forecast json date split', json.list[0].dt_txt.split(' ')[0]);
    // console.log('forecast json object', json);
    // New filtered array: 
    const filteredForecast = json.list.filter(item => item.dt_txt.includes("09:00"));
    // console.log('filtered forecast array', filteredForecast);

    filteredForecast.forEach(day => {
      const date = new Date(day.dt * 1000)
      // console.log('new date:', date)
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let dayOfWeek = weekdays[date.getDay()];
      weatherForecastDay.innerHTML += `<p> ${dayOfWeek} <img src="./img/${day.weather[0].icon}@2x.png" alt="Weather Icon" /></p>`
      weatherForecastTemp.innerHTML += `<p> ${day.main.temp.toFixed(0)} ° | ${day.weather[0].main} </p>`
    });
  });