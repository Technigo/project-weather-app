const containerToday = document.getElementById("weatherToday");
const descriptionToday = document.getElementById("text");
const containerForecast = document.getElementById("forecastWrapper");
const apiUrlToday =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=92053ce17f6df07312088f05e0a431e0";
const apiUrlForecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=92053ce17f6df07312088f05e0a431e0";


//Function to round temperature to one decimal
const calculateTemperature = (number) => {
  const roundedTemp = Math.round(number * 10) / 10; //By adding *10 AND adding /10 the number is rounded up to nearest integer with one decimal. If only using round() the number is rounded up to nearest integer.
  return roundedTemp;
};

//Function to show time in city in proper format (in weather today)
//This seems to not change the local time when refreshing the page???
const calculateTimeInCity = (time) => {
  const cityTime = new Date(time * 1000); // See lecture 20200921 @50 mins. about new Date and toLocaleTimeString
  const cityTimeString = cityTime.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  console.log(cityTimeString);
  return cityTimeString;
}
//Function to show time for sunrise/sunset in proper format (in weather today). Same as CalculateTimeIncity, so could be integrated into a single time-function. 
const calculatingSun = (time) => {
  const sunTime = new Date(time * 1000);
  const sunTimeString = sunTime.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  //console.log(sunTimeString);
  return sunTimeString;
};

const printDay = (day) => { 
  const forecastDays = new Date(day);
  const forecastDaysString = forecastDays.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short", 
    day: "numeric" 
  });
  //console.log(forecastDaysString);
  return forecastDaysString;
};

const iconDependingOnWeather = (item) => {
  const iconMainDescription = item

  if (iconMainDescription === 'Clouds') {
    return 'http://openweathermap.org/img/wn/03d@2x.png'
  } else if (iconMainDescription === 'Clear') {
    return 'http://openweathermap.org/img/wn/01d@2x.png'
  } else if (iconMainDescription === 'Snow') {
    return 'http://openweathermap.org/img/wn/13d@2x.png'
  } else if (iconMainDescription === 'Rain') {
    return 'http://openweathermap.org/img/wn/09d@2x.png'
  } else if (iconMainDescription === 'Drizzle') {
    return 'http://openweathermap.org/img/wn/09d@2x.png'
  } else if (iconMainDescription === 'Thunderstorm') {
    return 'http://openweathermap.org/img/wn/11d@2x.png'
  } else (iconMainDescription === 'Thunderstorm')
    return 'http://openweathermap.org/img/wn/50d@2x.png'
}

//Tried first to change background color depending on time. Didn't get that to work. Was confused with what the parameter(s) should be and what to use in the if-statement, and if I should declare any variables. Below I did a function to show different backgrounds depending on temperature instead. That works.
 const weatherTodayBackground = (temp) => { //What is temp here?
    const containerColor = document.querySelector('.weather-today')

   if (temp < 0, temp <= 10) {   //cold
      containerColor.style.background = 'linear-gradient(to right, #1a255e 0%, #81bfd5 100%)'; //blue
   } else if (temp > 10, temp < 18) {//semi-warm
      containerColor.style.background = 'linear-gradient(to right, #f7c602 0%, #fceba6 100%)'; //yellow
   } else if (temp > 18, temp < 27) { //warm
      containerColor.style.background = 'linear-gradient(to right, #f7a013 0%, #fce685 100%)'; //orange
   } else //super-warm
      containerColor.style.background = 'linear-gradient(to right, #ef5710 0%, #f9d67c 100%)'; //red
 }
 
const generatedHTMLForWeatherToday = (weatherToday) => {
  const temperature = calculateTemperature(weatherToday.main.temp); //This is using json.main.temp as a parameter instead of number.
  const timeInCity = calculateTimeInCity(weatherToday.dt);
  const sunrise = calculatingSun(weatherToday.sys.sunrise);
  const sunset = calculatingSun(weatherToday.sys.sunset);
  const iconToday = iconDependingOnWeather(weatherToday.weather[0].main); //Since weather is an array, we need to access the index of 0, and then we can locate the object keyvalues i.e .description. This has to be done even if there is only one array, as in this case.
  const description = weatherToday.weather[0].description
  weatherTodayBackground(weatherToday.main.temp);
  
  let weatherTodayHTML = '';
  weatherTodayHTML += `<div class="location-information">`;
  weatherTodayHTML += `<div class="temp">${temperature} <span class="celsius">&#8451;</span></div>`
  weatherTodayHTML += `<div class="location">${weatherToday.name} ${timeInCity}</div>`//Location name and local time
  weatherTodayHTML += `<div class="description">${description}</div>`//description like "broken clouds"
  weatherTodayHTML += `<div class="sunrise-sunset">`//added div here to use flexbox
  weatherTodayHTML += `<div class="sunrise">Sunrise ${sunrise}</div>`
  weatherTodayHTML += `<div class="sunset">Sunset ${sunset}</div>`
  weatherTodayHTML += `</div>`
  weatherTodayHTML += `</div>`;
  weatherTodayHTML += `<img class="icon-today" src='${iconToday}'>`;
  return weatherTodayHTML;
};

const generatedHTMLForWeatherForecast = (filteredForecast) => {
  const weekday = printDay(filteredForecast.dt_txt);
    //console.log(filteredForecast.main.temp)
  const dailyTemp = calculateTemperature(filteredForecast.main.temp);
  const humidity = calculateTemperature(filteredForecast.main.humidity)
  const iconForecast = iconDependingOnWeather(filteredForecast.weather[0].main);
  const forecastDescription = filteredForecast.weather[0].description
   
  let weatherForecast ='';
   weatherForecast += `<div class="weather-forecast">`;
   weatherForecast += `<div class="weekday">${weekday}</div>`;
   weatherForecast += `<div class="forecast-description">`
   weatherForecast += `<img src='${iconForecast}'>`;
   weatherForecast += `<p>${forecastDescription}</p>`
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
      //because: const containerToday = document.getElementById("weatherToday");
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
        item.dt_txt.includes("12:00")
      );
      console.log(filteredForecast);

      filteredForecast.forEach((forecast) => {
        containerForecast.innerHTML += generatedHTMLForWeatherForecast(forecast)
      });
    });
};
fetchWeatherForecast();