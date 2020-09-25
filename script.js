let city = "Stockholm";
//const button = document.getElementById('btn-search')
const containerToday = document.getElementById("weatherToday");
//const descriptionToday = document.getElementById("text");
const containerForecast = document.getElementById("forecastWrapper");

//UNSPLASH APIKEY z4PEqzbIWdyz1ZI_pAEh8rhUEdEyW1vxMjTi2kkaAfA

//TEMPERATURE FUNCTIONS

//Create function that calls all temperaturefunctions
const callTempFunctions = (number) => {
  calculateTemperature(number);
  minMaxTemperature(number);
  feelsLikeTemperature(number);
};

const calculateTemperature = (number) => {
  const roundedTemp = Math.round(number * 10) / 10; //By adding *10 AND adding /10 the number is rounded up to nearest integer with one decimal. If only using round() the number is rounded up to nearest integer.
  return roundedTemp;
};

//Create function that shows 'feels like'temp NOT STARTED
const feelsLikeTemperature = (number) => {
  //API main.feels_like
};

//DATE FUNCTIONS

const calculatingSun = (time) => {
  const sunTime = new Date(time * 1000);
  const sunTimeString = sunTime.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return sunTimeString;
};

const printDay = (day) => {
  const forecastDays = new Date(day);
  const forecastDaysString = forecastDays.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
  });
  return forecastDaysString;
};

const printTime = (time) => {
  //Is there another way tp do this? My time is a few minutes off..
  const hour = new Date(time * 1000);
  const localTimeString = hour.toLocaleTimeString("en-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return localTimeString;
};

//ICON FUNCTIONS
const iconWeather = (item) => {
  const iconMain = item;

  if (iconMain === "Clouds") {
    return "http://openweathermap.org/img/wn/03d@2x.png";
  } else if (iconMain === "Clear") {
    return "http://openweathermap.org/img/wn/01d@2x.png";
  } else if (iconMain === "Snow") {
    return "http://openweathermap.org/img/wn/13d@2x.png";
  } else if (iconMain === "Rain") {
    return "http://openweathermap.org/img/wn/10d@2x.png";
  } else if (iconMain === "Drizzle") {
    return "http://openweathermap.org/img/wn/09d@2x.png";
  } else if (iconMain === "Thunderstorm") {
    return "http://openweathermap.org/img/wn/11d@2x.png";
  } else return "http://openweathermap.org/img/wn/50d@2x.png";
};

//SELECT FUNCTION
const citySelection = (event) => {
  containerToday.innerHTML = "";
  containerForecast.innerHTML = ""; //This is needed to clear the default value
  city = event.target.value; //this sets the searchvalue to whatever the user chooses is
  fetchWeatherForecast(city);
  fetchWeatherToday(city);
};
document.getElementById("cityName").addEventListener("change", citySelection);

//DISPLAY FUNCTIONS

//Function that changes background
const setBackground = (city) => {

  if(city === "Stockholm") {
    containerToday.style.backgroundImage = "url('./assets/stockholm.jpg')"
  }
}

//Change gradient depending on time/temperature
/* const setBackgroundGradient = (time) => {
  const weatherBackground = document.getElementById('weatherContainer')
  if(time===){
    weatherBackground.style.background = 
  }
} */

const generatedHTMLForWeatherToday = (weatherToday) => {
  const temperature = calculateTemperature(weatherToday.main.temp); //This is using json.main.temp as a parameter instead of number.
  const sunrise = calculatingSun(weatherToday.sys.sunrise);
  const sunset = calculatingSun(weatherToday.sys.sunset);
  const description = weatherToday.weather[0].description;
  const icon = iconWeather(weatherToday.weather[0].main);
  const localTime = printTime(weatherToday.dt);
  const minTemp = calculateTemperature(weatherToday.main.temp_min);
  const maxTemp = calculateTemperature(weatherToday.main.temp_max);
  const feelTemp = calculateTemperature(weatherToday.main.feels_like)

  let dailyForecastHTML = "";
  dailyForecastHTML += `<img src= '${icon}'/>`; 
  dailyForecastHTML += `<div class="local-info">`;
  dailyForecastHTML += `<div class="temperature">${temperature} \xB0 </div>`;
  dailyForecastHTML += `<p class="feels-like">Feels like ${feelTemp} \xB0 </p>`;
  dailyForecastHTML += `<h1 class="city">${weatherToday.name}</h1>`;
  dailyForecastHTML += `<p class="local.time">${localTime}</p>`;
  dailyForecastHTML += `<p class="description">${description}</p>`;
  dailyForecastHTML += `<p class="minmax-temp">min/max ${minTemp}/${maxTemp}</p>`;
  dailyForecastHTML += `<p class="sun">Sunrise ${sunrise}/ Sunset ${sunset}</p>`;
  dailyForecastHTML += `</div>`;
  return dailyForecastHTML;

  //Since weather is an array, we need to access the index of 0, and then we can locate the object keyvalues i.e .description. This has to be done even if there is only one array, as in this case.
  //descriptionToday.innerHTML += `The sun rises at ${sunrise} and sets at ${sunset}`;
};

const generatedHTMLForWeatherForecast = (filteredForecast) => {
  const day = printDay(filteredForecast.dt_txt);
  //Tells what day it is
  const dailyTemp = calculateTemperature(filteredForecast.main.temp); 
  const icon = iconWeather(filteredForecast.weather[0].main);

  let innerText = "";
  innerText += `<div class="day-box">`;
  innerText += `<img class="forecast-img" src= '${icon}'/>`;
  innerText += `<p class="day">${day}</p>`;
  innerText += `<p class="day">${dailyTemp} \xB0</p>`;
  innerText += `</div>`;
  return innerText;
  //Weather description for the next five days
  //Humidity and wind
};

const fetchWeatherToday = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=95b6172379fabb04319de6c9e2aa34ae`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherToday) => {
      setBackground(city)
      containerToday.innerHTML += generatedHTMLForWeatherToday(weatherToday);
    });
};
fetchWeatherToday(city);

const fetchWeatherForecast = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=95b6172379fabb04319de6c9e2aa34ae`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherForecast) => {
      const filteredForecast = weatherForecast.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );
      filteredForecast.forEach((forecast) => {
        containerForecast.innerHTML += generatedHTMLForWeatherForecast(
          forecast
        );
      });
    });
};
fetchWeatherForecast(city);
