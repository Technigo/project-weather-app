const container = document.getElementById("todaySummary");
const mainWeather = document.getElementById("mainWeather");
const weeklyWeather = document.getElementById("weeklyForcastWrapper");
const dailyForcast = document.getElementById("dailyForcastRow");
const selectCity = document.getElementById("cities");


//this is the API variable for today weathers
const stockholmWeather =
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=64d2a624607147029ae4574d21f5c6d9";
const sidneyWeather =
  "http://api.openweathermap.org/data/2.5/weather?q=Sidney,Australia&units=metric&APPID=dd119be9d07ede14a0d4a2a07b6dd18e";
const londonWeather =
  "http://api.openweathermap.org/data/2.5/weather?q=London,England&units=metric&APPID=9131d7e10e3d4c4db50d9536233dc980";
const bangkokWeather =
  "http://api.openweathermap.org/data/2.5/weather?q=Bangkok,Thailand&units=metric&APPID=c0ec35bd685cdcb888f10c443a6c14d5";

// this is the API variable for the 5 days forecast
const stockholmForcast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4c7a468589eea9cb94d5053a081d05ba";
const sidneyForcast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Sidney,Australia&units=metric&APPID=e36d2706d1322106e3c5ea16b89992f1";
const londonForcast =
  "https://api.openweathermap.org/data/2.5/forecast?q=London,England&units=metric&APPID=002b38ff95d0ef8bad1f429f9b600f39";
const bangkokForcast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Bangkok,Thailand&units=metric&APPID=e83c1059f8d8dd4be2de6612bd0cae22";

  let returnWeekDay = (date) => { 
    let daysInWeek = ["Sunday", "Monday","Tuesday", "Wednesday","Thursday","Friday","Saturday"];
    let inputDate = new Date(date.replace(' ', 'T'));
    return daysInWeek[inputDate.getDay()];
  }
  




/// An object catching the weekday and turning it into a string//

// Fetching  weather and add it to fetchWeather

const fetchWeather = (weatherApi) => {
  console.log("fetching weather api", weatherApi);
  const weaterhPromise = fetch(weatherApi)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("weather data", data); 
      return data;
    });
    return weaterhPromise;
};




/// Fetching Stockholm forcast and add it to fetchStockholmForcast

const fetchForcast = (forcastApi) => {
  console.log("fetching forcast api", forcastApi);

  const ForcastPromise = fetch(forcastApi)
    .then((response) => {
    return response.json();
    })
    .then((data) => {
      console.log("forcast data", data); 
    return data; 
    });
    return ForcastPromise;
  };
    
const ShowCityWeather = (data) => {
  console.log("weatherdata", data);
  //weather descpription and temperature with one decimal
  container.innerHTML = `<p>${data.weather[0].description} | ${data.main.temp.toFixed(1)} &#8451</p>`; //&#8451 is the formal for celsius, changed conatiner to main
  //Sunrise
  const unixTimestampSunrise = data.sys.sunrise;
  //To get sunrise/sunset time in hours:minutes:seconds
  let sunrise = new Date(unixTimestampSunrise * 1000);
  //Declare new variable to show only hh:mm
  let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
  container.innerHTML += `<p>Sunrise: ${sunriseTime}</p>`;
  //Sunset
  const unixTimestampSunset = data.sys.sunset;
  let sunset = new Date(unixTimestampSunset * 1000);
  let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });
  container.innerHTML += `<p>Sunset: ${sunsetTime}</p>`;
  mainWeather.innerHTML = `<h1>The weather in ${data.name}</h1>`; //Changed container to be able to style - OK???
  return;
};

const ShowCityForcast = (data) => {
  console.log('dataFor', data)
  const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
    console.log('filteredForecast', filteredForecast);
    filteredForecast.forEach((filteredForecast) => {
      let dayInWeek = returnWeekDay(filteredForecast.dt_txt);
      let temp5Days = `${filteredForecast.main.temp}`
      let temp5DaysRounded = Math.round(temp5Days)
      let iconID = filteredForecast.weather[0].icon;
      dailyForcast.innerHTML += `
      <div class="forecast-row">
        <p> ${dayInWeek}:</p>

        <p> ${temp5DaysRounded}°C </p>
      </div>
      `
    })
  // .catch(error => {
  //   filteredForecast.innerHTML = `${error}`
  // })
};
//<img class="forecast-icon" src="./icons/${iconID}.svg">  
  
  /*const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
  filteredForecast.forEach((day) => {
  const options1 = { weekday: 'long' }
  const options2 = { weekday: 'short' }
 // forecast is injected in HTML, we also rounded the value to show no decimal
 // with one decimal: ${Math.round(day.main.temp * 10) / 10}
 // adds the weekdays in two ways, short and long format, example mon or monday
  
 console.log('filter', filteredForecast)

 dailyForcast.innerHTML =`
  <p class="forecast-row" id="dailyForcastRow">
  <span class="short-day">${new Intl.DateTimeFormat('en-GB', options1).format(day.dt * 1000).toLowerCase()}</span>
  <span class="long-day">${new Intl.DateTimeFormat('en-GB', options2).format(day.dt * 1000).toLowerCase()}</span>
  <span class="tempp">${Math.round(day.main.temp)}°</span>
  </p>`
})
}
*/

const selectedCity = (city) => {
let apiUrl = ""
let apiUrlForcast = ""
  console.log("works"); //chatches the value of a city
  if (city === "Stockholm") {
    console.log("stockholm");
    apiUrl = stockholmWeather;
    apiUrlForcast = stockholmForcast;
  } else if (city === "Sidney") {
    console.log("Sidney");
    apiUrl = sidneyWeather;
    apiUrlForcast = sidneyForcast;
  } else if (city === "London") {
    console.log("London");
    apiUrl = londonWeather;
    apiUrlForcast = londonForcast;
  } else {
    console.log("Bangkok");
    apiUrl = bangkokWeather;
    apiUrlForcast = bangkokForcast;
  }
  fetchWeather(apiUrl)
  .then((data) => {
    console.log("testing", data); 
    ShowCityWeather(data);
  })
  fetchForcast(apiUrlForcast)
  .then((data) => {
    console.log("testingForcast", data); 
    ShowCityForcast(data);
  });

};

selectedCity("Stockholm");

selectCity.addEventListener("change", (event) =>
  selectedCity(event.target.value)
); //Listen to what city is chosen

// When the page loads
