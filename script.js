let weatherLink =
  "https://api.openweathermap.org/data/2.5/weather?q=Malm%C3%B6,Sweden&units=metric&APPID=";

let weatherDescriptionDiv = document.getElementById("weatherDescription");
let cityNameDiv = document.getElementById("cityName");
let currentTemperatureDiv = document.getElementById("currentTemperature");
let sunriseDiv = document.getElementById("sunrise");
let sunsetDiv = document.getElementById("sunset");

const fetchWeather = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Malm%C3%B6,Sweden&units=metric&APPID=d73aa5f2cfee2a35632856b10b30a458"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let weatherDescription = data.weather[0].description;
      let cityName = data.name;
      let currentTemperature = data.main.temp; // fix to only show one number
      
      let fetchedSunrise = data.sys.sunrise;
      let sunriseTime = new Date(fetchedSunrise * 1000);
      let sunriseHours = sunriseTime.getHours();
      let sunriseMinutes = sunriseTime.getMinutes();
      let renderedSunrise = "0" + sunriseHours + "." + sunriseMinutes; // add zero if minutes are only one digit

      let fetchedSunset = data.sys.sunset;
      let sunsetTime = new Date(fetchedSunset * 1000);
      let sunsetHours = sunsetTime.getHours();
      let sunsetMinutes = sunsetTime.getMinutes();
      let renderedSunset = sunsetHours + "." + sunsetMinutes; // add zero if minutes are only one digit

      weatherDescriptionDiv.innerHTML = `${weatherDescription}`;
      cityNameDiv.innerHTML = `${cityName}`;
      currentTemperatureDiv.innerHTML = `${currentTemperature} ºC`;
      sunriseDiv.innerHTML = `${renderedSunrise}`;
      sunsetDiv.innerHTML = `${renderedSunset}`;
    })
    .catch((error) => {
      console.log(error);
    });
};


fetchWeather();

// background changes depending on the weather type
let weatherImage = data.weather[0].main;

if (weatherImage === "Clear") {
// https://openweathermap.org/weather-conditions The types should match the main types from this web?
mainWeather.innerHTML += `
<img id="" class="" src="assets/sun.jpg"/>`
} else if (weatherImage === "Thunderstorm") {
  mainWeather.innerHTML += `
<img id="" class="" src=""/>`
} else if (weatherImage === "Drizzle") {
  mainWeather.innerHTML += `
<img id="" class="" src=".assets/sun.jpg"/>`
} else if (weatherImage === "Rain") {
  mainWeather.innerHTML += `
<img id="" class="" src=".assets/sun.jpg"/>`
} else if (weatherImage === "Snow") {
  mainWeather.innerHTML += `
<img id="" class="" src=".assets/sun.jpg"/>`
} else if (weatherImage === "Clouds") {
  mainWeather.innerHTML += `
<img id="" class="" src=".assets/sun.jpg"/>`
}

// Background change
const dayToNight = () => {
  if (time < sunrise && time > sunset) {
    mainWeather.style.background = `
    
    `;
  }
};

dayToNight();




