console.log("Hello world!");
const API_KEY = "96cb0f55d34310e596ed4792c7800540"

const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const sunriseContainer = document.getElementById("sunrise");
const sunsetContainer = document.getElementById("sunset");
const mainContainer = document.getElementById('mainWeather')
const cityButton = document.getElementById('cityBtn')
const body = document.getElementById('body')

// console.log("This is the first API", API_CITY)
const fetchStockholm = () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&APPID=${API_KEY}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getWeatherData(data)   
    })
};

fetchStockholm();

const fetchForecastStockholm = () => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getForecastData(data)     
    })
};

fetchForecastStockholm();

const fetchBarcelona = () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&APPID=${API_KEY}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getWeatherData(data)   
    })
};

const fetchForecastBarcelona = () => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Barcelona,Spain&units=metric&APPID=${API_KEY}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getForecastData(data)     
    })
};

const fetchParis = () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&APPID=${API_KEY}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getWeatherData(data)   
    })
};

const fetchForecastParis = () => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Paris,France&units=metric&APPID=${API_KEY}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getForecastData(data)     
    })
};

const getWeatherData = (data) => {
  console.log("This is data", data);
  console.log("This is data.main.temp", data.main.temp);

  const decimal = (data.main.temp).toFixed(1) // 

  // a variable for main images depending on the weather comes from JSON
  const idForMainImage = data.weather[0].main
  // to change the bg-image depending on the data weather
  mainContainer.style.backgroundImage = `url(./Designs/Design-1/mainImages/${idForMainImage}.png)`

  weatherContainer.innerHTML = `
      <h1>${decimal}°C</h1>
      <h2>${data.name}</h2>
      <h3>${data.weather[0].description}</h3>          
    `;

    if (decimal >= 20) {
      body.style.background = "orange"
    }
    else if (decimal < 20 && decimal > 10){
      body.style.background = "blue"
    }
    else {
      body.style.background = "white"
    }


    const sunriseData = new Date(data.sys.sunrise * 1000) //Converts UNIX/EPOCH time to readable human time
    const sunsetData = new Date(data.sys.sunset * 1000) //Converts UNIX/EPOCH time to readable human time
    const sunriseString = sunriseData.toLocaleTimeString('en-SE', {hour: '2-digit', minute:'2-digit'}) //toLocaleTimeString reduces data to only show hh:mm
    const sunsetString = sunsetData.toLocaleTimeString('en-SE', {hour: '2-digit', minute:'2-digit'}) //toLocaleTimeString reduces data to only show hh:mm

    console.log(sunriseData, sunsetData)

    sunriseContainer.innerHTML = `
    <h3>Sunrise ${sunriseString}</h3>`
    sunsetContainer.innerHTML = `
    <h3>Sunset ${sunsetString}</h3>`

}

  const getForecastData = (data) => {
  // display the next 5 days  with filtered info (once a day at 12:00) 
  const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
  console.log("THIS IS THE filter", filteredForecast)

  // forEach 5 days info for each days in the filtered array
  filteredForecast.forEach((object) => {

    const decimal = (object.main.temp).toFixed(0) // make the temperature integer

    // multiplied with 1000 to make it visibale both in safari and chrome //
    const date = new Date(object.dt * 1000); // full date with day month and year
    const days = date.toLocaleDateString('en-SE', { weekday: 'long' }); // display the day with the name only Tuesday,Wednesday,Monday etc.. 
    console.log("the next day is", days) // the next day is wednesday etc. 


    console.log("the next day is", object.weather[0].main)

    // 5 days name & temperature & description of the weather
    const idForIcons = object.weather[0].main
    forecastContainer.innerHTML += ` 
    <div class="forecast-days">
      <div>
      <h4 class="day"> ${days} </h4>
      </div>
      <div class="iconandtemp">
      <img id="iconID" class="icons" alt="" src="./Designs/Design-1/icons/${idForIcons}.png">
      <h4 class="temp"> ${decimal}°C</h4>
      </div>
    </div>
    `;
  })
}

let cityClick = 0;

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


  
  /* console.log(API_CITY) */
})

//TODO LIST ------
/* 
fix the button for a city loop between barca-sthlm  --- team ✅
footer 
add comments
clean the console logs
css cleaning for media queries or bg images?
check html
delete the branches 
add picture for clear

Fix hot/cold background for mobile/tablet.. or maybe just go 1 color
Add 1 more city?          ---- team ✅
More Main pictures
the .GIF icon

Icons for sunset & sunrise
Animation on todays weather
STYLING.
Get the description to start with a capital letter?


BONUS!
Add more Data
GeoLocation...... long shot!


Show more citys in Desktop

*/