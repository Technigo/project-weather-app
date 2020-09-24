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

//Change background color depending on time. What sould be the parameter? THIS DON'T WORK
//  const weatherTodayBackground = (timeInCity) => {
//  const containerColor = document.getElementByID('weatherToday')
//  const timeInCity = calculateTimeInCity(weatherToday.dt);
//  const sunrise = calculatingSun(weatherToday.sys.sunrise);
//   const sunset = calculatingSun(weatherToday.sys.sunset);
//    if (timeInCity >= sunrise, timeInCity < sunset) {   //daytime
//       containerColor.style.background = 'lightblue';
//    } else if (timeInCity >= sunset, timeInCity < sunrise) //nighttime
//       containerColor.style.background = 'black';
//  }

const generatedHTMLForWeatherToday = (weatherToday) => {
  const temperature = calculateTemperature(weatherToday.main.temp); //This is using json.main.temp as a parameter instead of number.
  const timeInCity = calculateTimeInCity(weatherToday.dt);
  const sunrise = calculatingSun(weatherToday.sys.sunrise);
  const sunset = calculatingSun(weatherToday.sys.sunset);
  const iconToday = iconDependingOnWeather(weatherToday.weather[0].main);
  const description = weatherToday.weather[0].description
  // const backgroundToday = weatherTodayBackground(); //Specify BG-color depending on time. Doesnt work!!!
  // containerToday.innerHTML = `<h1>This is ${weatherToday.name}</h1>`;
  // descriptionToday.innerHTML = `The temperature today is ${temperature} degrees and it's ${weatherToday.weather[0].description} outside.`; 
  //Since weather is an array, we need to access the index of 0, and then we can locate the object keyvalues i.e .description. This has to be done even if there is only one array, as in this case.
  // descriptionToday.innerHTML += `The sun rises at ${sunrise} and sets at ${sunset}`; //Kommenterar ut pga specar längre ner istället
  let weatherTodayHTML = '';
  weatherTodayHTML += `<div class="location-information">`;
  weatherTodayHTML += `<div class="temp">${temperature} <span class="celsius">&#8451;</span></div>`
  weatherTodayHTML += `<div class="location">${weatherToday.name} ${timeInCity}</div>`//Location name and local time
  weatherTodayHTML += `<div class="description">${description}</div>`//description like "broken clouds"
  weatherTodayHTML += `<div class="sunrise-sunset">`//added div to use flexbox
  weatherTodayHTML += `<div class="sunrise">Sunrise ${sunrise}</div>`
  weatherTodayHTML += `<div class="sunset">Sunset ${sunset}</div>`
  //Div for time in city should go here
  weatherTodayHTML += `</div>`
  weatherTodayHTML += `</div>`;
  weatherTodayHTML += `<img class="icon-today" src='${iconToday}'>`; //Bilden utanför pga kunna sätta position absolute
  return weatherTodayHTML;
};


const generatedHTMLForWeatherForecast = (filteredForecast) => {
  const weekday = printDay(filteredForecast.dt_txt); //Should tell what day it is but doesn't work at the moment
    //console.log(filteredForecast.main.temp)
  const dailyTemp = calculateTemperature(filteredForecast.main.temp);
  const humidity = calculateTemperature(filteredForecast.main.humidity)
  const iconForecast = iconDependingOnWeather(filteredForecast.weather[0].main);

   let weatherForecast ='';
   weatherForecast += `<div class="weather-forecast">`;
   weatherForecast += `<div class="weekday">${weekday}</div>`;
   weatherForecast += `<img src='${iconForecast}'>`;
   weatherForecast += `<p>${dailyTemp} \xB0/ Humidity: ${humidity}</p>`
   weatherForecast += `</div>`;
  return weatherForecast
  //Weather description for the next five days
  //Humidity and wind
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