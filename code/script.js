import { API_KEY } from './api.js';
const apiUrlToday =
  'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID={API_KEY}';
const apiUrlForecast =
  'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID={API_KEY}';
//const header = document.getElementById('header');
const container = document.getElementById('main');
//const pWeather = document.getElementById('weather');
//const pSun = document.getElementById('sun');

fetch(apiUrlToday)
  .then((response) => {
    return response.json();
  })
  .then((weatherArray) => {
    generateHTMLForWeather(weatherArray);
    // console.log(weatherArray);
    // header.innerHTML = `This is ${weatherArray.name}`;
    // p.innerHTML = `The weather in  ${weatherArray.name}: ${
    //   weatherArray.weather[0].description
    // } and ${temperatureRounded(weatherArray.main.temp)} degrees`;
    //const temp = weatherArray.list;
    // const list0 = weatherArray['main'].temp;
    //console.log(temp);
    //console.log(list0);
    //p.innerHTML = `The temperature is ${weatherArray.list.main}`;
    // // Update launch count
    // launchCountHeader.innerHTML = launchArray.length;
    // // Add HTML content for each launch
    // launchArray.forEach((launch) => {
    //   container.innerHTML += generateHTMLForLaunch(launch);
    //});
  });

fetch(apiUrlForecast)
  .then((response) => {
    return response.json();
  })
  .then((forecastArray) => {
    console.log('unfiltered forecast ' + typeof forecastArray);
    const filteredForecast = forecastArray.list.filter((item) =>
      item.dt_txt.includes('12:00')
    );
    console.log(filteredForecast[0].main.temp);
    console.log(filteredForecast);
    filteredForecast.forEach((forecast) => {
      container.innerHTML += generateHTMLForForecast(forecast);
    });
  });

const generateHTMLForWeather = (weatherArray) => {
  header.innerHTML = `This is ${weatherArray.name}`;
  weather.innerHTML = `The weather in  ${weatherArray.name}: ${
    weatherArray.weather[0].description
  } and ${temperatureRounded(weatherArray.main.temp)} degrees`;
  sun.innerHTML = `Sunrise: ${setSunTime(
    weatherArray.sys.sunrise
  )} and sunset: ${setSunTime(weatherArray.sys.sunset)}`;
  // const temperature = temperatureRounded(weatherArray.main.temp);
  // const sunrise = setSunTime(weatherArray.sys.sunrise);
  // const sunset = setSunTime(weatherArray.sys.sunset);
  // let weatherTodayHTML = '';
  // weatherTodayHTML += `<section class="weatherToday">`;
  // weatherTodayHTML += `<p> Location: ${weatherArray.name}: Weather Today: ${weatherArray.weather[0].description}:
  //   ${temperature} \xB0: Sunrise at: ${sunrise}: Sunset at ${sunset} </p>`;
  // weatherTodayHTML += `</section>`;
  // return weatherTodayHTML;
};

const generateHTMLForForecast = (forecast) => {
  let forecastHTML = '';
  forecastHTML += `<section class="weather-forecast">`;
  forecastHTML += ` <p> ${setDay(forecast.dt_txt)}<p>`;
  forecastHTML += ` <img src=./assets/Group16.png>`;
  forecastHTML += ` <p> ${temperatureRounded(
    forecast.main.temp
  )}&#8451 / ${temperatureRounded(forecast.main.temp)}&#8451</p>`;
  forecastHTML += `</section>`;
  console.log(forecast.dt);
  console.log(setDay(forecast.dt_txt));
  return forecastHTML;
};

const temperatureRounded = (temperature) => {
  return Math.round(temperature * 10) / 10;
};

const setSunTime = (time) => {
  const sunTime = new Date(time * 1000);
  const sunTimeString = sunTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  console.log(sunTimeString);
  return sunTimeString;
};

const setDay = (date) => {
  const forecastDate = new Date(date);
  console.log(forecastDate);
  const forecastDateString = forecastDate.toLocaleDateString('en-US', {
    weekday: 'short',
  });
  console.log(forecastDateString);
  return forecastDateString;
};
