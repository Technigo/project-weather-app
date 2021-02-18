// DOM selectors
const shortDescription = document.getElementById("shortDescription")
const temperature = document.getElementById("temperature")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const forecast = document.getElementById("forecast")
const icon = document.getElementById("icon")
const bigIcon = document.getElementById("big-icon")
const today = document.getElementById("today")
const nextButton = document.getElementById("nextButton")
const city = document.getElementById("location")

// Global variables
const API_KEY = "d54b10c260730aa99d10c1f676d759e6";

// Function for sunset and sunrise time
const sunTime = (time) => {
  const fixedTime = new Date(time * 1000).toLocaleTimeString('sv-SE', {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  return fixedTime;
};


// Function for current weather
const getWeatherData = (data) => {
  const cityName = data.name;
  const temp = Math.floor(data.main.temp);
  const condition = data.weather[0].description;
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const sunriseText = sunTime(data.sys.sunrise);
  const sunsetText = sunTime(data.sys.sunset);
  city.innerText = `${cityName}`;
  bigIcon.innerHTML = `<img src="${icon}"/>`;
  shortDescription.innerText = `${condition}`;   
  temperature.innerHTML = `${temp} <span class="celsius">°C</span>`;
  sunrise.innerHTML = `<i class="fas fa-sun"></i> ${sunriseText}`;
  sunset.innerHTML = `<i class="fas fa-moon"></i> ${sunsetText}`;
  let changeBackground = new Date().getHours();
    if (changeBackground > 20 && changeBackground < 6) {
      today.style.background = "linear-gradient(to bottom, #222350, #313263, #404176, #4f518a, #5f619f)"
    } 
}

// Function for forecast
const getForecastData = (data) => {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'));
  filteredForecast.forEach((forecastItem) => {
    const loopOverWeek = weekdays[(new Date(forecastItem.dt_txt).getDay())];
    const loopOverTemp = Math.floor(forecastItem.main.temp);
    const icon = `https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`;

    forecast.innerHTML +=  `
    <div>
      <p>${loopOverWeek}</p>
      <div>   
        <img class="small-icons" src="${icon}">
        <p>${loopOverTemp} °C</p>
      </div>
    </div>`
});
};

// Function for cities 
const stockholmWeather = () => {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    getWeatherData(data);
  });
    
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
  .then((response) => {
     return response.json();
  })
  .then((data) => {
    getForecastData(data);
  });
}
        
const parisWeather = () => {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&APPID=${API_KEY}`)
  .then((response) => {
      return response.json();
  })
  .then((data) => {
      getWeatherData(data);
  });

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Paris&units=metric&APPID=${API_KEY}`)
  .then((response) => {
      return response.json();
  })
  .then((data) => {
    getForecastData(data);
  });
}

const valenciaWeather = () => {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Valencia,Spain&units=metric&APPID=${API_KEY}`)
  .then((response) => {           
    return response.json();
  })      
  .then((data) => {
    getWeatherData(data);
  });
        
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Valencia,Spain&units=metric&APPID=${API_KEY}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    getForecastData(data);
  });
};
 
// Eventlistener, click to next city
let clickState = 0;

nextButton.addEventListener('click', () => {
  forecast.innerHTML = '';
  if (clickState === 0) {
    parisWeather();
    clickState = 1;
  } else if (clickState === 1) {
    valenciaWeather();
    clickState = 2
  } else if (clickState === 2) {
    stockholmWeather();
    clickState = 0;
  }
});

// Invoking function for start page
stockholmWeather();