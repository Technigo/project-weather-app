const topSection = document.getElementById("topSection");
const main = document.getElementById("main");
const degrees = document.getElementById("degrees");
const city = document.getElementById("city");
const condition = document.getElementById("condition");
const sunriseSunset = document.getElementById("sunriseSunset");
const button = document.getElementById("button");
const mainImage = document.getElementById("mainImage");
const forecast = document.getElementById("forecastWrapper");
const search = document.getElementById("search")
const searchbar = document.getElementById("searchbar")

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Reykjavik&appid=fa2755c779ce094fc80f2fa365eea704&units=metric"
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    //started to add first details to our topsection
    degrees.innerHTML = `${json.main.temp.toFixed(1)}<sup>°C</sup>`;
    city.innerHTML = json.name;
    condition.innerHTML = json.weather[0].description;

    //Below the current UNIX time of sunrise/sunset times will be converted to HH:MM
    const sunriseData = new Date(json.sys.sunrise * 1000);
    const sunsetData = new Date(json.sys.sunset * 1000);
    //Here I used the option argument to customize the result of the toLocaleTimeString method
    const sunriseTime = sunriseData.toLocaleString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const sunsetTime = sunsetData.toLocaleString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    //Added the converted time for sunrise/sunset to section sunriseSunset
    sunriseSunset.innerHTML = `<h3>sunrise</h3>`;
    sunriseSunset.innerHTML += `<h3>${sunriseTime}</h3>`;
    sunriseSunset.innerHTML += `<h3>sunset</h3>`;
    sunriseSunset.innerHTML += `<h3>${sunsetTime}</h3>`;
    //Show different background depending on what time the sunrise/sunset is
    if (
      sunriseTime <= currentTimeCorrectFormat &&
      currentTimeCorrectFormat < sunsetTime
    ) {
      topSection.style.backgroundImage = `linear-gradient(45deg, rgba(0,174,255,1) 0%, rgba(188,214,238,1) 47%, rgba(23,68,235,1) 100%)`;
    } else {
      if (window.innerWidth < 668) {
        topSection.style.backgroundImage =
          "url(Designs/Design-1/assets/night-small.jpg)";
      } else if (window.innerWidth < 1023) {
        topSection.style.backgroundImage =
          "url(Designs/Design-1/assets/night-medium.jpg)";
      } else {
        topSection.style.backgroundImage =
          "url(Designs/Design-1/assets/night-large.jpg)";
      }
    }

    //Variable for Todays weather main, to use when changing the picture in topSection
    let mainWeatherToday = json.weather[0].main;
    if (mainWeatherToday === "Snow") {
      weatherImg = "Designs/Design-1/assets/snow.svg";
    } else if (mainWeatherToday === "Rain" || mainWeatherToday === "Drizzle") {
      weatherImg = "Designs/Design-1/assets/rain.svg";
    } else if (mainWeatherToday === "Thunderstorm") {
      weatherImg = "Designs/Design-1/assets/thunder.svg";
    } else if (
      mainWeatherToday === "Mist" ||
      mainWeatherToday === "Fog" ||
      mainWeatherToday === "Ash"
    ) {
      weatherImg = "Designs/Design-1/assets/mist.svg";
    } else if (mainWeatherToday === "Clouds") {
      weatherImg = "Designs/Design-1/assets/cloud.svg";
    } else if (mainWeatherToday === "Clear") {
      weatherImg = "Designs/Design-1/assets/clear.svg";
    }
    mainImage.innerHTML += `<image src=${weatherImg} alt='icon of the weather Today'/>`;
  });

//Make the current time be in same format as sunrise/sunset time to be able to compare
const currentTime = new Date();
const currentTimeCorrectFormat = currentTime.toLocaleTimeString("sv-SE", {
  hour: "2-digit",
  minute: "2-digit",
});

fetch(
  "https://api.openweathermap.org/data/2.5/forecast?lat=64.1355&lon=-21.8954&appid=fa2755c779ce094fc80f2fa365eea704&units=metric"
)
  .then((response) => {
    return response.json();
  })
  .then((fiveDay) => {
    const filteredForecast = fiveDay.list.filter(item => item.dt_txt.includes('12:00:00'));
    console.log(filteredForecast);

  filteredForecast.forEach((item) => {
    const date = new Date(item.dt * 1000);
    let dayName =  date.toLocaleDateString("en-US", {weekday: "short"});
    let mainWeather = item.weather[0].main;
    if (mainWeather === "Snow") {
      weatherImg = "Designs/Design-1/assets/snow.svg";
    } else if (mainWeather === "Rain" || mainWeather === "Drizzle") {
      weatherImg = "Designs/Design-1/assets/rain.svg";
    } else if (mainWeather === "Thunderstorm") {
      weatherImg = "Designs/Design-1/assets/thunder.svg";
    } else if (
      mainWeather === "Mist" ||
      mainWeather === "Fog" ||
      mainWeather === "Ash"
    ) {
      weatherImg = "Designs/Design-1/assets/mist.svg";
    } else if (mainWeather === "Clouds") {
      weatherImg = "Designs/Design-1/assets/cloud.svg";
    } else if (mainWeather === "Clear") {
      weatherImg = "Designs/Design-1/assets/clear.svg";
    }

    //Populating the HTML with the data
    forecast.innerHTML += `<div class="forecast-weekday">
      <div class="each-weekday">${dayName}</div>
      <div class="forecast-img"><img src=${weatherImg}></div> 
      <div class="forecast-temp">${item.main.temp.toFixed(1)} °C</div>
      </div>`;
        
  })
});

const showSearchbar = () => {
    searchbar.style.display = "block"
    button.style.display = "none"    
}

button.addEventListener("click", showSearchbar);

searchbar.addEventListener("change", () => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchbar.value}&appid=fa2755c779ce094fc80f2fa365eea704&units=metric`
      )
      .then ((response) => {
        return response.json()
    })
 
.then((json) => {
    searchbar.value = "";
    //started to add first details to our topsection
    degrees.innerHTML = `${json.main.temp.toFixed(1)}<sup>°C</sup>`;
    city.innerHTML = json.name;
    condition.innerHTML = json.weather[0].description;

    //Below the current UNIX time of sunrise/sunset times will be converted to HH:MM
    const sunriseData = new Date(json.sys.sunrise * 1000);
    const sunsetData = new Date(json.sys.sunset * 1000);
    //Here I used the option argument to customize the result of the toLocaleTimeString method
    const sunriseTime = sunriseData.toLocaleString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const sunsetTime = sunsetData.toLocaleString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    //Added the converted time for sunrise/sunset to section sunriseSunset
    sunriseSunset.innerHTML = `<h3>sunrise</h3>`;
    sunriseSunset.innerHTML += `<h3>${sunriseTime}</h3>`;
    sunriseSunset.innerHTML += `<h3>sunset</h3>`;
    sunriseSunset.innerHTML += `<h3>${sunsetTime}</h3>`;
    //Show different background depending on what time the sunrise/sunset is
    if (
      sunriseTime <= currentTimeCorrectFormat &&
      currentTimeCorrectFormat < sunsetTime
    ) {
      topSection.style.backgroundImage = `linear-gradient(45deg, rgba(0,174,255,1) 0%, rgba(188,214,238,1) 47%, rgba(23,68,235,1) 100%)`;
    } else {
      if (window.innerWidth < 668) {
        topSection.style.backgroundImage =
          "url(Designs/Design-1/assets/night-small.jpg)";
      } else if (window.innerWidth < 1023) {
        topSection.style.backgroundImage =
          "url(Designs/Design-1/assets/night-medium.jpg)";
      } else {
        topSection.style.backgroundImage =
          "url(Designs/Design-1/assets/night-large.jpg)";
      }
    }

    //Variable for Todays weather main, to use when changing the picture in topSection
    let mainWeatherToday = json.weather[0].main;
    if (mainWeatherToday === "Snow") {
      weatherImg = "Designs/Design-1/assets/snow.svg";
    } else if (mainWeatherToday === "Rain" || mainWeatherToday === "Drizzle") {
      weatherImg = "Designs/Design-1/assets/rain.svg";
    } else if (mainWeatherToday === "Thunderstorm") {
      weatherImg = "Designs/Design-1/assets/thunder.svg";
    } else if (
      mainWeatherToday === "Mist" ||
      mainWeatherToday === "Fog" ||
      mainWeatherToday === "Ash"
    ) {
      weatherImg = "Designs/Design-1/assets/mist.svg";
    } else if (mainWeatherToday === "Clouds") {
      weatherImg = "Designs/Design-1/assets/cloud.svg";
    } else if (mainWeatherToday === "Clear") {
      weatherImg = "Designs/Design-1/assets/clear.svg";
    }
    mainImage.innerHTML = `<image src=${weatherImg} alt='icon of the weather Today'/>`;
  })
  .catch(error => {
    alert(`No such city! Try again!`);
    console.log(error);
})
})

searchbar.addEventListener("change", () => {
  forecast.innerHTML = "";
fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${searchbar.value}&appid=fa2755c779ce094fc80f2fa365eea704&units=metric`
)
  .then((response) => {
    return response.json();
  })
  .then((fiveDay) => {
    const filteredForecast = fiveDay.list.filter(item => item.dt_txt.includes('12:00:00'));
    console.log(filteredForecast);

  filteredForecast.forEach((item) => {
    const date = new Date(item.dt * 1000);
    let dayName =  date.toLocaleDateString("en-US", {weekday: "short"});
    let mainWeather = item.weather[0].main;
    if (mainWeather === "Snow") {
      weatherImg = "Designs/Design-1/assets/snow.svg";
    } else if (mainWeather === "Rain" || mainWeather === "Drizzle") {
      weatherImg = "Designs/Design-1/assets/rain.svg";
    } else if (mainWeather === "Thunderstorm") {
      weatherImg = "Designs/Design-1/assets/thunder.svg";
    } else if (
      mainWeather === "Mist" ||
      mainWeather === "Fog" ||
      mainWeather === "Ash"
    ) {
      weatherImg = "Designs/Design-1/assets/mist.svg";
    } else if (mainWeather === "Clouds") {
      weatherImg = "Designs/Design-1/assets/cloud.svg";
    } else if (mainWeather === "Clear") {
      weatherImg = "Designs/Design-1/assets/clear.svg";
    }

    //Populating the HTML with the data
    
    forecast.innerHTML += `<div class="forecast-weekday">
      <div class="each-weekday">${dayName}</div>
      <div class="forecast-img"><img src=${weatherImg}></div> 
      <div class="forecast-temp">${item.main.temp.toFixed(1)} °C</div>
      </div>`;
        
  })
})
})