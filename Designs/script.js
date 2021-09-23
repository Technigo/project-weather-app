const weatherData = document.getElementById("weatherdata");
const weatherToday = document.getElementById("weather-today");
const weatherForecast = document.getElementById("weather-forecast");
const dropdownCities = document.getElementById("dropdown-cities");
let userPosition;
const API_URL =
    "https://api.openweathermap.org/data/2.5/weather?q=cityname&units=metric&APPID=5caaaf25021b2d7aa4d206126b6a3351";
const API_Forecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=cityname&units=metric&APPID=5caaaf25021b2d7aa4d206126b6a3351";
const getData = () => {
    //made global function so we can call from different areas in the code
   
	fetch(API_URL.replace("cityname", currentCity))
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let now = new Date();
            now.setFullYear(2000, 1, 1);
            let sunrise = data.sys.sunrise;
            sunrise = new Date(sunrise * 1000);
            sunrise.setFullYear(2000, 1, 1);
            //          sunrise = sunrise.toLocaleTimeString([], { timeStyle: "short" });
            let sunset = data.sys.sunset;
            sunset = new Date(sunset * 1000);
            sunset.setFullYear(2000, 1, 1); //set time for specific day to compare hours and minutes
            //sunset = sunset.toLocaleTimeString([], { timeStyle: "short" });
            let isSunRise = sunrise.getHours >= now.getUTCHours() && sunrise.getMinutes() >= now.getUTCMinutes();
            weatherToday.innerHTML = `
      <div class="weather-container-div">
        <p id="temp-now">${data.main.temp.toFixed(1)}°C</p>
        <p id="city-now">${data.name}</p>
        <p id="weather-now">${data.weather[0].description}</p>
        <div class="sunrise-sunset">
          <span>sunrise</span>
          <span>${new Date((data.sys.sunrise + data.timezone) * 1000).toLocaleTimeString([], { timeStyle: "short" })}</span>
          <span>sunset</span>
          <span>${new Date((data.sys.sunset + data.timezone) * 1000).toLocaleTimeString([], { timeStyle: "short" })}</span>
        </div>
      </div>
      `; // toFixed(1) rounds the temp to one decimal
            temp = data.main.temp;
            if (temp >= 25 && temp <= 65) {
                if (sunrise) {
                    weatherToday.style.background = "var(--hot)";
                } else {
                    weatherToday.style.background = "var(--hotnight)";
                }
            }
            if (temp >= 0 && temp <= 24) {
                if (sunset < now) {
                    weatherToday.style.background = "var(--moderatenight)";
                } else {
                    weatherToday.style.background = "var(--moderate)";
                }
            } if (temp >= -40 && temp <= -1) {
                if (sunrise) {
                    weatherToday.style.background = "var(--cold)";
                } else {
                    weatherToday.style.background = "var(--coldnight)";
                }
            }
        })
        .catch((error) => console.error("Error: ", error))
        .finally(() => console.log("Request done"));
    fetch(API_Forecast.replace("cityname", currentCity))
        .then((Response) => {
            return Response.json();
        })
        .then((json) => {
            weatherForecast.innerHTML = '';
            const filteredForecast = json.list.filter((item) =>
                item.dt_txt.includes("12:00")
            );
            filteredForecast.forEach((day) => {
                let date = new Date(day.dt * 1000);
                let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
                const dayTemp = day.main.temp;
                const weekTemp = dayTemp.toFixed(0.1);
                weatherForecast.innerHTML +=
                    `
                <div class="forecastDay" id="forecastDay"><p>${dayName}</p></div>
                <div class="forecastTemp" id="forecastTemp"><p>${weekTemp}°C</p></div>
                <div class="forecastIcon" id="forecastIcon">
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"/>
                    <p>Weather: ${day.weather[0].description}</p>
                    </div>
                `;
            });
        });
};
const handleWeatherApiResponse = (forecastForCity) => {
    console.log(forecastForCity);
    //copied other template so we see changes in live in chrome. we can remove this when we merge and add getForecastForCity and the API.
    weatherToday.innerHTML = `
  <p>City: ${forecastForCity.name}</p>
  <p>Temp: ${forecastForCity.main.temp.toFixed(1)}°C</p>
  <p>Weather: ${forecastForCity.weather[0].description}</p>
  `;
};
const onCityChanged = (event) => {
    document.querySelector(".menu-btn").checked = false; 
    
    console.log(event.target.dataset.cityname);
    currentCity = event.target.dataset.cityname;
    getData();
   
};
const getDefaultCity = () => {
   
    let cities = document.querySelectorAll("[data-cityname]");
  
    return cities[0].dataset.cityname; //dataset is an object with all data attributes inside https://www.w3schools.com/tags/att_global_data.asp
};
const initializeCitySelector = () => {
    console.log("begin initializeCitySelector");
    let cities = document.querySelectorAll("[data-cityname]");
    cities.forEach((element) => {
        console.log("adding event listener");
        element.addEventListener("click", onCityChanged);
    });
    console.log("finished initializeCitySelector");
};
const getForecastForCity = (cityName, callbackFunction) => {
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=5caaaf25021b2d7aa4d206126b6a3351`
    )
        .then((response) => response.json())
        .then((data) => {
            callbackFunction(data);
        })
        .catch((error) => console.error("Error: ", error))
        .finally(() => console.log("Request done"));
};
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser");
    }
};
const showPosition = (position) => {
    userPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };
    console.log(
        "lat",
        position.coords.latitude,
        "long",
        position.coords.longitude
    );
};
initializeCitySelector();
let currentCity = getDefaultCity(); //a function to get default city
getData();