const apiKey = "6afa2e7606c18a4e48270ffd081e86a3";
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=' + apiKey;
const weatherForcastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID='+ apiKey;
const weatherSection = document.getElementById('weatherSection');
const forcast = document.getElementById('forcast');


// Function that expect date in format that can be used to create a date object
// Function also adjust for iOS limitations in Date
const returnWeekDay = (date) => {
  const daysInWeek = ["Sunday", "Monday","Tuesday", "Wednesday","Thursday","Friday","Saturday"];
  let inputDate = new Date(date.replace(' ', 'T'));
  return daysInWeek[inputDate.getDay()];
}

const fetchTodaysWeather = () => {
fetch(weatherUrl)
  .then((response) => {
    if (response.ok) {
    return response.json()
    } else {
      throw "Something went wrong";
    }
  })
  .then((json)=> {
    const tempToday = `${json.main.temp}`
    const tempTodayRounded = Math.round(tempToday)
    const cityName = json.name;
    const weatherDescription = json.weather[0].description;
    const iconId = json.weather[0].icon;
    const sunriseAPI = `${json.sys.sunrise}`
    const sunsetAPI = `${json.sys.sunset}`
    const sunrise = new Date(sunriseAPI*1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const sunset = new Date(sunsetAPI*1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    weatherSection.innerHTML = `
    <div class="today-temp">
      <div class="today">
        <h2>${tempTodayRounded} °C</h2>
        <h1>${cityName}</h1>
        <h3>${weatherDescription} </h3>
      </div>
      <div class="weather-icon">
        <img src="http://openweathermap.org/img/wn/${iconId}@2x.png">
      </div>
    </div>
    <div class="sun-hours">
      <p>Sunrise: ${sunrise}</p>
      <p>Sunset: ${sunset}</p>
    </div>
    `
  })
  .catch(error => {
    weatherSection.innerHTML = `${error}`
  })
}

const fetch5DayForcast = () => {
fetch(weatherForcastUrl)
  .then((response) => {
    if (response.ok) {
    return response.json()
    } else {
      throw "Something went wrong";
    }
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast);

    filteredForecast.forEach((filteredForecast) => {
      const dayInWeek = returnWeekDay(filteredForecast.dt_txt);
      const temp5Days = `${filteredForecast.main.temp}`
      const temp5DaysRounded = Math.round(temp5Days)
      const iconId = filteredForecast.weather[0].icon;
      forcast.innerHTML += `
      <div class="five-days">
        <div class="five-days-column"><p style="text-align:left;"> ${dayInWeek}:</p></div>
        <div class="five-days-column"><img src="http://openweathermap.org/img/wn/${iconId}@2x.png"></div>
        <div class="five-days-column"><p style="text-align:right;"> ${temp5DaysRounded}°C </p></div>
      </div>
      `
    })
  })
  .catch(error => {
    filteredForecast.innerHTML = `${error}`
  })
};



fetchTodaysWeather();
fetch5DayForcast();