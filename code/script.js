//WEATHER TODAY//

const apiToday = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e33f1cc192401277e601a6aed3a82800'
const apiKey = "e33f1cc192401277e601a6aed3a82800"

const weatherLocation = document.getElementById('location');
const weatherDescription = document.getElementById('description');
const weatherTemperature = document.getElementById('temperature');
//const weatherSunrise = document.getElementById('sunrise');
//const weatherSunset = document.getElementById('sunset');

const fetchToday = () => {
fetch(apiToday)
  .then((response) => {
    return response.json();
    })
  .then((json) => {

weatherLocation.innerHTML = json.name;
weatherDescription.innerHTML = json.weather[0].description
weatherTemperature.innerHTML = json.main.temp.toFixed(0.5)

//Add Icon
const TodayIcon = () => {
  const conditions = json.weather[0].description;
  if (conditions === 'Clear') {
    return "./sun.png";
  } else if (conditions === 'Rain') {
    return "./rain.png";
  } else {
    return "./cloud.png";
  }
};

document.getElementById('location').innerHTML += `<img class="todayicon" src=${TodayIcon()}>`;


//weatherSunrise.innerHTML = new Date(json.sys.sunrise * 1000).toLocaleTimeString([]);
//weatherSunset.innerHTML = new Date(json.sys.sunset * 1000).toLocaleTimeString([]);

//Made a function of Sunrise/sunset instead//
const weatherSunset = () => {
  const dateSunset = new Date(json.sys.sunset * 1000);
  const timeSunset = dateSunset.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  document.getElementById('sunset').innerHTML = timeSunset;
};
weatherSunset();

const weatherSunrise = () => {
  const dateSunrise = new Date(json.sys.sunrise * 1000);
  const timeSunrise = dateSunrise.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  document.getElementById('sunrise').innerHTML = timeSunrise;
};
weatherSunrise();
});
};
fetchToday();

//WEATHER FOR THE WEEK//

const apiWeek = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=e33f1cc192401277e601a6aed3a82800'


  fetch(apiWeek)
  .then((response) => {
    return response.json();
  })
  .then((json) => { 
  console.log(json)
  
  const filteredWeek = json.list.filter(item => item.dt_txt.includes('12:00'));
  
  //Picks the weekday and temperature  
  filteredWeek.forEach(day => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString("en-EN", {  
      weekday: 'short'}); //Gives me a weekday-format with name of the days.
  
    const dayTemp = day.main.temp;
    const weekTemp = dayTemp.toFixed(0.1);
    const weatherDescriptionWeek = day.weather[0].description;

    document.getElementById('weekdayfive').innerHTML += `<p>${dayName}</p>`
    document.getElementById('weektempfive').innerHTML += `<p>${weekTemp}°</p>`
        
  });
  });

