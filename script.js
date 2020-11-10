const containerToday = document.getElementById("weatherToday");
const descriptionToday = document.getElementById("text");
const containerForecast = document.getElementById("forecastWrapper");
const apiUrlToday =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=92053ce17f6df07312088f05e0a431e0";
const apiUrlForecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=92053ce17f6df07312088f05e0a431e0";

//Function to round temperature to one decimal
//By adding *10 AND adding /10 the number is rounded up to nearest integer 
//with one decimal. If only using round() the number is rounded up to nearest integer.
const calculateTemperature = (number) => {
  const roundedTemp = Math.round(number * 10) / 10; 
  return roundedTemp;
};
//Function to show time in city in proper format.
//This seems to have a somewhat delayed local time by 4 mins. Why?
const calculateTimeInCity = (time) => {
  const cityTime = new Date(time * 1000);
  const cityTimeString = cityTime.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return cityTimeString;
};
//Function to show time for sunrise/sunset in proper format (in weather today). 
//Same as CalculateTimeIncity, so could be integrated into one single time-function. 
const calculatingSun = (time) => {
  const sunTime = new Date(time * 1000);
  const sunTimeString = sunTime.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return sunTimeString;
};
//Function to show date in proper format.
const printDay = (day) => { 
  const forecastDays = new Date(day);
  const forecastDaysString = forecastDays.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short", 
    day: "numeric" 
  });
  return forecastDaysString;
};
//Function to show different weather-icons depending on current weather. 
//Is used in the functions to generate weather today and weather forecast
const iconDependingOnWeather = (item) => {
  const iconMainDescription = item

  if (iconMainDescription === 'Clouds') {
    return "https://openweathermap.org/img/wn/03d@2x.png"
  } else if (iconMainDescription === 'Clear') {
    return "https://openweathermap.org/img/wn/01d@2x.png"
  } else if (iconMainDescription === 'Snow') {
    return "https://openweathermap.org/img/wn/13d@2x.png"
  } else if (iconMainDescription === 'Rain') {
    return "https://openweathermap.org/img/wn/09d@2x.png"
  } else if (iconMainDescription === 'Drizzle') {
    return "https://openweathermap.org/img/wn/09d@2x.png"
  } else if (iconMainDescription === 'Thunderstorm') {
    return "https://openweathermap.org/img/wn/11d@2x.png"
  } else (iconMainDescription === 'Atmosphere')
    return "https://openweathermap.org/img/wn/50d@2x.png"
};
//Different backgrounds depending on temperature:
 const weatherTodayBackground = (temp) => { 
    const containerColor = document.querySelector('.weather-today')
   if (temp < 0) {
    containerColor.style.backgroundImage = 'linear-gradient(to bottom, rgba(26,37,94,0.8) 0%, rgba(129,191,213,0.8) 80%, rgba(255,255,255,1) 100%), url("./background_0_degrees.jpg")'; //dark blue
   } else if (temp > 0, temp <= 10) { 
      containerColor.style.backgroundImage = 'linear-gradient(to bottom, rgba(119,151,190,0.8) 0%, rgba(129,191,213,0.8) 80%, rgba(255,255,255,1) 100%), url("./background_0_10_degrees.jpg")'; //lighter blue
   } else if (temp > 10, temp < 18) {
      containerColor.style.backgroundImage = 'linear-gradient(180deg, rgba(247,198,2,0.8) 0%, rgba(252,235,166,0.8) 80%, rgba(255,255,255,1) 100%), url("./background_10_18_degrees.jpg")';//yellow (not sure the readability is great on this. Could be improved)
   } else if (temp > 18, temp < 27) { 
      containerColor.style.backgroundImage = 'linear-gradient(180deg, rgba(244,164,2,0.8) 0%, rgba(252,230,133,0.8) 70%, rgba(255,255,255,1) 100%), url("./background_18_27_degrees.jpg")'; //orange
   } else
      containerColor.style.backgroundImage = 'linear-gradient(180deg, rgba(239,87,16,0.8) 0%, rgba(249,214,124,0.8) 70%, rgba(255,255,255,1) 100%), url("./background_27_degrees_more.jpg ")';//red
 };
// Function to specify content and the HTML-structure for weather today. 
// Is called in the fetch-function for weather today.
const generatedHTMLForWeatherToday = (weatherToday) => {
  const temperature = calculateTemperature(weatherToday.main.temp);
  const timeInCity = calculateTimeInCity(weatherToday.dt);
  const sunrise = calculatingSun(weatherToday.sys.sunrise);
  const sunset = calculatingSun(weatherToday.sys.sunset);
  const iconToday = iconDependingOnWeather(weatherToday.weather[0].main);
  const description = weatherToday.weather[0].description
  weatherTodayBackground(weatherToday.main.temp, weatherToday.dt); 
  
  //The += appends html elements
  let weatherTodayHTML = '';
  weatherTodayHTML += `<div class="location-information">`;
  weatherTodayHTML += `<div class="temp">${temperature} <span class="celsius">&#8451;</span></div>`
  weatherTodayHTML += `<div class="location">${weatherToday.name} ${timeInCity}</div>`
  weatherTodayHTML += `<div class="description">${description}</div>`
  weatherTodayHTML += `<div class="sunrise-sunset">`
  weatherTodayHTML += `<div class="sunrise">Sunrise ${sunrise}</div>`
  weatherTodayHTML += `<div class="sunset">Sunset ${sunset}</div>`
  weatherTodayHTML += `</div>`
  weatherTodayHTML += `</div>`;
  weatherTodayHTML += `<img class="icon-today" src='${iconToday}'>`;
  return weatherTodayHTML;
};
//Function to specify content and the HTML-structure for weather forecast. 
//Is called in the fetch-function for weather forecast.
const generatedHTMLForWeatherForecast = (filteredForecast) => {
  const weekday = printDay(filteredForecast.dt_txt);
  const dailyTemp = calculateTemperature(filteredForecast.main.temp);
  const humidity = calculateTemperature(filteredForecast.main.humidity)
  const iconForecast = iconDependingOnWeather(filteredForecast.weather[0].main);
  const forecastDescription = filteredForecast.weather[0].description
   
  let weatherForecast ='';
   weatherForecast += `<div class="weather-forecast">`;
   weatherForecast += `<div class="weekday">`;
   weatherForecast += `<p>${weekday}</p>`
   weatherForecast += `<p>${forecastDescription}</p>`
   weatherForecast += `</div>`
   weatherForecast += `<div class="forecast-icon">`
   weatherForecast += `<img src='${iconForecast}'>`;
   weatherForecast += `</div>`
   weatherForecast += `<p>${dailyTemp} \xB0/ ${humidity} &#37; </p>`
   weatherForecast += `</div>`;
  return weatherForecast
};
//Fetch-function for weather today:
const fetchWeatherToday = () => {
  fetch(apiUrlToday)
    .then((response) => {
      return response.json();
    })
    .then((weatherToday) => {
      containerToday.innerHTML = generatedHTMLForWeatherToday(weatherToday);
    });
};
fetchWeatherToday();
//Fetch-function for weather forecast
const fetchWeatherForecast = () => {
  fetch(apiUrlForecast)
    .then((response) => {
      return response.json();
    })
    .then((weatherForecast) => {
      const filteredForecast = weatherForecast.list.filter((item) =>
        item.dt_txt.replace(" ", "T").includes("12:00") //Filters out the 12 o'clock temps in weather forecast. This becomes a new array with objects. Tried to solve invalid date on iphone by adding T to date-format. Not sure how to fix it. Looked on SO and found this, but don't know if I applied it correctly, because it doesn't work.
      );
      console.log(filteredForecast);

      filteredForecast.forEach((forecast) => {
        containerForecast.innerHTML += generatedHTMLForWeatherForecast(forecast)
      });
    });
};
fetchWeatherForecast();