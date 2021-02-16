const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=6afa2e7606c18a4e48270ffd081e86a3';
const weatherForcastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=c292983c49498a3cff73c1806ef955ba';
const weatherSection = document.getElementById('weatherSection');
const forcast = document.getElementById('forcast');


//let unix

let returnWeekDay = (date) => { 
  let daysInWeek = ["Sunday", "Monday","Tuesday", "Wednesday","Thursday","Friday","Saturday"];
  let inputDate = new Date(date);
  return daysInWeek[inputDate.getDay()];
}

const fetchTodaysWeather = () => {
fetch(weatherUrl)
  .then((response) => {
    return response.json()
  })
  .then((json)=> {
    // console.log(json)
    let sunriseAPI = `${json.sys.sunrise}`
    let sunsetAPI = `${json.sys.sunset}`
    let sunrise = new Date(sunriseAPI*1000).toLocaleTimeString([], {timeStyle: 'short'});
    let sunset = new Date(sunsetAPI*1000).toLocaleTimeString([], {timeStyle: 'short'});

    let tempToday = `${json.main.temp}`
    let tempTodayRounded = Math.round(tempToday)

    weatherSection.innerHTML = `
    <div class="today-temp">
      <div class="today">
        <h2>${tempTodayRounded} °C</h2>  
        <h1>${json.name}</h1>
        <h3>${json.weather[0].description} </h3>
      </div>
      <div class="weather-icon">
        <img src="./Group36.png" alt="sun">
      </div>
    </div>
    <div class="sun-hours">
      <p>Sunrise: ${sunrise}</p>
      <p>Sunset: ${sunset}</p>
    </div> 
    `
  })
}
  
const fetch5DayForcast = () => {
fetch(weatherForcastUrl)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast);
    
   

    filteredForecast.forEach((filteredForecast) => {
      let dayInWeek = returnWeekDay(filteredForecast.dt_txt);
      let temp5Days = `${filteredForecast.main.temp}`
      let temp5DaysRounded = Math.round(temp5Days)
      forcast.innerHTML += `
      <div class="five-days">
      <p> ${dayInWeek}:</p> <p> ${temp5DaysRounded} </p>
      </div>
      `
    })
  })
};

  

fetchTodaysWeather(); 
fetch5DayForcast();