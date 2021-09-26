
const API_KEY = "96cb0f55d34310e596ed4792c7800540" //Token api key

// -------------------- API weather&forecast links for each city------------
const API_STOCKHOLM_W = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&APPID=${API_KEY}`
const API_STOCKHOLM_F = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`
const API_BARCELONA_W = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&APPID=${API_KEY}`
const API_BARCELONA_F = `https://api.openweathermap.org/data/2.5/forecast?q=Barcelona,Spain&units=metric&APPID=${API_KEY}`
const API_PARIS_W = `https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&APPID=${API_KEY}`
const API_PARIS_F = `https://api.openweathermap.org/data/2.5/forecast?q=Paris,France&units=metric&APPID=${API_KEY}`

// -------------------- DOMs --------------------
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const sunriseContainer = document.getElementById("sunrise");
const sunsetContainer = document.getElementById("sunset");
const mainContainer = document.getElementById('mainWeather')
const weatherIconContainer = document.getElementById('weatherIcon')
const cityButton = document.getElementById('cityBtn')
const body = document.getElementById('body')
// -------------------- DOMs end --------------------

// -------------------- Fetch weather section -------------------- 
// Fetch for Stockholm weather
const fetchStockholm = () => {
  fetch(API_STOCKHOLM_W)
      .then((res) => {
      return res.json();
    })
    .then((data) => {
      getWeatherData(data)   
    })
};

fetchStockholm(); //Loads Stockholm as first city

// Fetch for Stockholm forecast
const fetchForecastStockholm = () => {
  fetch(API_STOCKHOLM_F)
  .then((res) => {
      return res.json();
    })
    .then((data) => {
      getForecastData(data)     
    })
};

fetchForecastStockholm(); //Loads Stockholm as first city

// Fetch for Barcelona weather
const fetchBarcelona = () => {
  fetch(API_BARCELONA_W)
  .then((res) => {
      return res.json();
    })
    .then((data) => {
      getWeatherData(data)   
    })
};

// Fetch for Barcelona forecast
const fetchForecastBarcelona = () => {
  fetch(API_BARCELONA_F)
  .then((res) => {
      return res.json();
    })
    .then((data) => {
      getForecastData(data)     
    })
};

// Fetch for Paris weather
const fetchParis = () => {
  fetch(API_PARIS_W)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getWeatherData(data)   
    })
};

// Fetch for Paris forecast
const fetchForecastParis = () => {
  fetch(API_BARCELONA_F)
  .then((res) => {
      return res.json();
    })
    .then((data) => {
      getForecastData(data)     
    })
};
// -------------------- Fetch section end ----------------------------


// -------------------- Function for main weather -------------------- 
const getWeatherData = (data) => {
  const decimal = (data.main.temp).toFixed(1) // 

  // a variable for main images depending on the weather comes from JSON
  const idForMainImage = data.weather[0].main
  // to change the bg-image depending on the data weather
  weatherIconContainer.innerHTML = `
  <img class="weather-icon-img" src="./Designs/Design-1/icons/${idForMainImage}.svg">
  `

  weatherContainer.innerHTML = `
      <p>Todays weather</p>
      <h1>${decimal}°C</h1>
      <h2>${data.name}</h2>
      <h3>${data.weather[0].description}</h3>  
    `;

  //------------------IF we want to change background depending on temp, not used atm---
    /*      if (decimal >= 20) {
       body.style.background = "#fff7ed"
     }
     else if (decimal < 20 && decimal > 10){
       body.style.background = "#edfaff"
     }
     else {
      body.style.background = "#f0f0f0"
    } */
  //------------------------- Background color temp end---------------------------------

    // This part takes the current sunrise / sunset times and converts it to HH:MM
    const sunriseData = new Date(data.sys.sunrise * 1000) //Converts UNIX/EPOCH time to readable human time, makes is millisec
    const sunsetData = new Date(data.sys.sunset * 1000) //Converts UNIX/EPOCH time to readable human time, makes is millisec
    const sunriseString = sunriseData.toLocaleTimeString('en-SE', {hour: '2-digit', minute:'2-digit'}) //toLocaleTimeString reduces data to only show hh:mm
    const sunsetString = sunsetData.toLocaleTimeString('en-SE', {hour: '2-digit', minute:'2-digit'}) //toLocaleTimeString reduces data to only show hh:mm

    //prints HH:MM for sunrise/sunset with icon
    sunriseContainer.innerHTML = `
    <img class="sun-icon" src="./Designs/Design-1/mainImages/up.png"> 
    <h3>${sunriseString}</h3>`
    sunsetContainer.innerHTML = `
    <img class="sun-icon" src="./Designs/Design-1/mainImages/down.png">
    <h3>${sunsetString}</h3>`
}
// -------------------- Main weather function end ----------------------------------


// -------------------- Function for forecast weather ------------------------------ 
  const getForecastData = (data) => {
  // display the next 5 days  with filtered info (once a day at 12:00) 
  const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))

  // forEach 5 days info for each days in the filtered array
  filteredForecast.forEach((object) => {

    const decimal = (object.main.temp).toFixed(0) // make the temperature integer

    // multiplied with 1000 to make it visibale both in safari and chrome //
    const date = new Date(object.dt * 1000); // full date with day month and year
    const days = date.toLocaleDateString('en-SE', { weekday: 'long' }); // display the day with the name only Tuesday,Wednesday,Monday etc.. 

    // 5 days name & temperature & description of the weather
    const idForIcons = object.weather[0].main
    forecastContainer.innerHTML += ` 
    <div class="forecast-days">
      <div>
        <h4 class="day"> ${days} </h4>
      </div>
      <div class="iconandtemp">
        <img id="iconID" class="icons" alt="" src="./Designs/Design-1/icons/${idForIcons}.svg">
        <h4 class="temp"> ${decimal}°C</h4>
      </div>
    </div>
    `;
  })
}
// -------------------- Forecast weather function end ----------------------------


// -------------------- Day / Night background change depending on time ---------- 
const time = new Date()
const timeHr = time.getHours() // Converts time to only hours

if (timeHr > 7 && timeHr <= 19){
  mainContainer.style.backgroundImage = `url(./Designs/Design-1/mainImages/day.png)` // Changes background image to day
}
else if (timeHr > 19){
  mainContainer.style.backgroundImage = `url(./Designs/Design-1/mainImages/night.png)` // Changes background image to night
}
else{
  mainContainer.style.backgroundImage = `url(./Designs/Design-1/mainImages/night.png)` // Changes background image to night
}
// -------------------- Day / Night background end ------------------------------- 


// -------------------- City changer -------------------------------------------
let cityClick = 0;
// Function for changing city
cityButton.addEventListener('click', () => {
  forecastContainer.innerHTML = ``;
  if (cityClick === 0){
    fetchParis()
    fetchForecastParis()
    cityClick = 1;
  }
  else if (cityClick === 1){
    fetchBarcelona()
    fetchForecastBarcelona()
    cityClick = 2;
  }
  else if (cityClick === 2){
    fetchStockholm()
    fetchForecastStockholm()
    cityClick = 0;
  }
})
//-------------------- City changer end ----------------------------------------
