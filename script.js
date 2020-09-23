let city = 'Stockholm';

const containerToday = document.getElementById("weatherToday");
const descriptionToday = document.getElementById("text");
const containerForecast = document.getElementById("forecastWrapper");

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

//Create function that shows min/max temp
const minMaxTemperature = (number) => {
  const minTemp = Math.round(number * 10) / 10;
  console.log(`The min is ${minTemp}`);
  //minMaxTemperature(filteredForecast.list[0].main.temp_min)
  //API main.temp_min main.temp_max
};

//Create function that shows 'feels like'temp
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
  console.log(sunTimeString);
  return sunTimeString;
};

const printDay = (day) => {
  const forecastDays = new Date(day);
  const forecastDaysString = forecastDays.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  /* console.log(forecastDaysString); */
  return forecastDaysString;
};

//ICON FUNCTIONS
const iconWeather = (item) => {
  const iconMain = item
  
  if (iconMain === 'Clouds') {
    return  'http://openweathermap.org/img/wn/03d@2x.png'
  } else if (iconMain === 'Clear') {
    return 'http://openweathermap.org/img/wn/01d@2x.png'
  } else if (iconMain === 'Snow') {
    return 'http://openweathermap.org/img/wn/13d@2x.png'
  } else if (iconMain === 'Rain') {
    return 'http://openweathermap.org/img/wn/10d@2x.png'
  } else if (iconMain === 'Drizzle') {
    return 'http://openweathermap.org/img/wn/09d@2x.png'
  } else if (iconMain === 'Thunderstorm') {
    return 'http://openweathermap.org/img/wn/11d@2x.png'
  } else 
    return 'http://openweathermap.org/img/wn/50d@2x.png'

}

//BUTTON FUNCTION - Doesn't work at, error cannot read value of null
const citySearch = () => {
  containerToday.innerHTML = ''; //This is needed to clear the default value
  containerForecast.innerHTML = '';
  city = document.getElementById('cityNameSearch').value; //this sets the searchvalue to whatever the input is

  fetchWeatherForecast(city);
  fetchWeatherToday(city);
  document.getElementById('cityNameSearch').value = ''; //Clearing input value after search
}

//DISPLAY FUNCTIONS

const generatedHTMLForWeatherToday = (weatherToday) => {
  const temperature = calculateTemperature(weatherToday.main.temp); //This is using json.main.temp as a parameter instead of number.
  console.log(weatherToday.sys.sunrise);
  const sunrise = calculatingSun(weatherToday.sys.sunrise);
  const sunset = calculatingSun(weatherToday.sys.sunset);
  const description = weatherToday.weather[0].description;
  const icon = iconWeather(weatherToday.weather[0].main)

  let dailyForecastHTML = "";
  dailyForecastHTML += `<img src= '${icon}'/>`; //This needs to be 
  dailyForecastHTML += `<div class="local-info">`;
  dailyForecastHTML += `<div class="temperature">${temperature} \xB0 </div>`;
  dailyForecastHTML += `<div class="city">${weatherToday.name}</div>`;
  dailyForecastHTML += `<div class="description">${description}</div>`;
  dailyForecastHTML += `<div class="description">${sunrise}</div>`;
  dailyForecastHTML += `<div class="description">${sunset}</div>`;
  dailyForecastHTML += `</div>`;
  return dailyForecastHTML

  //Since weather is an array, we need to access the index of 0, and then we can locate the object keyvalues i.e .description. This has to be done even if there is only one array, as in this case.
  //descriptionToday.innerHTML += `The sun rises at ${sunrise} and sets at ${sunset}`;
};

const generatedHTMLForWeatherForecast = (filteredForecast) => {
  const day = printDay(filteredForecast.dt_txt);
  //Tells what day it is
  console.log(filteredForecast.main.temp);
  const dailyTemp = calculateTemperature(filteredForecast.main.temp); //Would also like for this to tell min/max-temp
  
  
  //const minMax = minMaxTemperature(filteredForecast.list[0].main.temp_min) //Make use of minMaxfunction! Get an errormessage ATM
  /*Uncaught (in promise) TypeError: Cannot read property '0' of undefined
  at generatedHTMLForWeatherForecast (script.js:70)
  at script.js:113
  at Array.forEach (<anonymous>)
  at script.js:112 */

  let innerText = "";
  innerText += `<div class="day-box">`;
  innerText += `<p class="day">${day}</p>`;
  innerText += `<p>${dailyTemp} degrees</p>`;
  innerText += `</div>`;
  return innerText;
  //Weather description for the next five days
  //Humidity and wind
};

const fetchWeatherToday = (city) => {
  fetch(`"https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=95b6172379fabb04319de6c9e2aa34ae"`)
    .then((response) => {
      return response.json();
    })
    .then((weatherToday) => {
      containerToday.innerHTML += generatedHTMLForWeatherToday(weatherToday);
    });
};

const fetchWeatherForecast = (city) => {
  fetch(`"https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=95b6172379fabb04319de6c9e2aa34ae"`)
    .then((response) => {
      return response.json();
    })
    .then((weatherForecast) => {
      const filteredForecast = weatherForecast.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );
      console.log(filteredForecast);
      containerForecast.innerHTML = `<h1>The weather for the next five days will be:</h1>`;

      filteredForecast.forEach((forecast) => {
        containerForecast.innerHTML += generatedHTMLForWeatherForecast(forecast);
      });
    });
};
