const apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Ho%20chi%20minh,Vietnam&units=metric&APPID=e27fc7790a6a4c3537de471b9d7612ce"

const forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=Ho%20Chi%20Minh,Vietnam&appid=e27fc7790a6a4c3537de471b9d7612ce"


fetch (apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((todayForecast) => {
    populateDetails(todayForecast);
    populateSummary(todayForecast);
    // populateForecast(todayForecast);
  });

// fetch (forecastUrl)
//   .then((response) => {
//     return response.json();
//   })
//   .then((forecast) => {
//     const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
//     populateForecast(forecast);
//   });
  

function populateDetails(todayForecast) {
  const timezone = todayForecast.timezone;
  const country = todayForecast.sys.country;
  const todayDescription = todayForecast.weather[0].description;
  const todayTemperature = todayForecast.main.temp;
  const todaySunRise = new Date(todayForecast.sys.sunrise * 1000).toLocaleTimeString(country);
  const todaySunSet = new Date(todayForecast.sys.sunset * 1000).toLocaleTimeString(country);

  document.getElementById('des').innerHTML = `${todayDescription} | ${todayTemperature}`
  document.getElementById('sunRise').innerHTML = `Sunrise: ${todaySunRise}`;
  document.getElementById('sunSet').innerHTML = `Sunset: ${todaySunSet}`;
}

function populateSummary(todayForecast) {
  const todayDescription = todayForecast.weather[0].description;
  const city = todayForecast.name
  const rainyDay = todayDescription.includes('rain');
  const cloudyDay = todayDescription.includes('cloud');
  const sunnyDay = todayDescription.includes('clear');

  if (rainyDay) {
    document.getElementById('img').src = '../assets/rainnyDay.svg';
    document.getElementById('sumMessage').innerHTML = `Don't forget your umbrellar. It is wet in ${city} today.`;
  } else if (cloudyDay) {
    document.getElementById('img').src = '../assets/cloudyDay.svg';
    document.getElementById('sumMessage').innerHTML = `Light a fire and get cosy. It is cloudy in ${city} today.`;
  } else if (sunnyDay) {
    document.getElementById('img').src = '../assets/sunnyDay.svg';
    document.getElementById('sumMessage').innerHTML = `Get your sunnies on. ${city} is looking rather great today.`;
  } else {
    document.getElementById('sumMessage').innerHTML = `Get yourself ready for the all-weather-in-one today`;
  }
}

function populateForecast(forecast){

}



  