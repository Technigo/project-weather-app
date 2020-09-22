const containerToday = document.getElementById("weatherToday");
const descriptionToday = document.getElementById("text");
const containerForecast = document.getElementById("forecastWrapper");
const apiUrlToday =
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=95b6172379fabb04319de6c9e2aa34ae";
const apiUrlForecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=95b6172379fabb04319de6c9e2aa34ae";

//Creat function that calls all temperaturefunctions
const callTempFunctions = (number) => {
  calculateTemperature(number)
  minMaxTemperature(number)
  feelsLikeTemperature(number)
} 

const calculateTemperature = (number) => {
  const roundedTemp = Math.round(number * 10) / 10; //By adding *10 AND adding /10 the number is rounded up to nearest integer with one decimal. If only using round() the number is rounded up to nearest integer.
  return roundedTemp;
}; 

//Create function that shows min/max temp
const minMaxTemperature = (number) => {
  const minTemp = Math.round(number * 10) / 10;
  console.log(`The min is ${minTemp}`)
  //minMaxTemperature(filteredForecast.list[0].main.temp_min)
//API main.temp_min main.temp_max
}

//Create function that shows 'feels like'temp
const feelsLikeTemperature = (number) => {
 //API main.feels_like
}

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
  });
  /* console.log(forecastDaysString); */
  return forecastDaysString; //Would like for this to also return the date of the day
};

const generatedHTMLForWeatherToday = (weatherToday) => {
  const temperature = calculateTemperature(weatherToday.main.temp); //This is using json.main.temp as a parameter instead of number.
  console.log(weatherToday.sys.sunrise);
  const sunrise = calculatingSun(weatherToday.sys.sunrise);
  const sunset = calculatingSun(weatherToday.sys.sunset);
  containerToday.innerHTML = `<h1>This is ${weatherToday.name}</h1>`;
  descriptionToday.innerHTML = `The temperature today is ${temperature} degrees and it's ${weatherToday.weather[0].description} outside.`;
  //Since weather is an array, we need to access the index of 0, and then we can locate the object keyvalues i.e .description. This has to be done even if there is only one array, as in this case.
  descriptionToday.innerHTML += `The sun rises at ${sunrise} and sets at ${sunset}`;
};

const generatedHTMLForWeatherForecast = (filteredForecast) => {
  const day = printDay(filteredForecast.dt_txt);
  //Tells what day it is
  console.log(filteredForecast.main.temp);
  const dailyTemp = calculateTemperature(filteredForecast.main.temp); //Would also like for this to tell min/max-temp
  const minMax = minMaxTemperature(filteredForecast.list[0].main.temp_min) //Make use of minMaxfunction! Get an errormessage ATM 
  /*Uncaught (in promise) TypeError: Cannot read property '0' of undefined
  at generatedHTMLForWeatherForecast (script.js:70)
  at script.js:113
  at Array.forEach (<anonymous>)
  at script.js:112 */
  
  let innerText = '';
  innerText += `<div class="day-box">`;
  innerText += `<p class="day">${day}</p>`;
  innerText += `<p>${dailyTemp} degrees</p>`
  innerText += `</div>`;
  return innerText;
  //Weather description for the next five days
  //Humidity and wind
  

  /*let launchHTML = '';
  launchHTML += `<section class="launch">`;
  launchHTML += ` <img src='${launchOutcomeImageUrl}'>`;
  launchHTML += ` <p>${launch.flight_number}: ${launch.mission_name} - ${launchDateString} ${launchTimeString}</p>`;
  launchHTML += `</section>`;
  return launchHTML;*/ //This is code from Van to use in forecast HTML
};

const fetchWeatherToday = () => {
  fetch(apiUrlToday)
    .then((response) => {
      return response.json();
    })
    .then((weatherToday) => {
      generatedHTMLForWeatherToday(weatherToday);
    });
};

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
      containerForecast.innerHTML = `<h1>The weather for the next five days will be:</h1>`

      filteredForecast.forEach((forecast) => {
        containerForecast.innerHTML += generatedHTMLForWeatherForecast(
          forecast
        );
      });
    });
};
