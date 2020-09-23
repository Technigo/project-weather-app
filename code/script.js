const apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Ho%20chi%20minh,Vietnam&units=metric&APPID=e27fc7790a6a4c3537de471b9d7612ce"

const forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=Ho%20Chi%20Minh,Vietnam&units=metric&appid=e27fc7790a6a4c3537de471b9d7612ce"


fetch (apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((todayForecast) => {
    populateHeader(todayForecast)
    populateDetails(todayForecast);
    populateSummary(todayForecast);
  });

  function populateHeader(todayForecast) {
    const city = todayForecast.name
    const today = new Date(todayForecast.dt*1000);
    // document.getElementById('headerMessage').innerHTML = `Welcome to the Weather Forecast of ${city} on ${today}`
  };


  function populateDetails(todayForecast) {
  const todayDescription = todayForecast.weather[0].description;
  const todayTemperature = todayForecast.main.temp;

  const sunrise = new Date(todayForecast.sys.sunrise * 1000);
  const sunset = new Date(todayForecast.sys.sunset * 1000);
  const options = {
      timeZone: 'Asia/Ho_Chi_Minh',
      timeStyle: 'short',
      hour12: false,
    }
  const sunriseTime = new Intl.DateTimeFormat('en-US', options).format(sunrise);
  const sunsetTime = new Intl.DateTimeFormat('en-US', options).format(sunset);
  console.log(sunriseTime);

  document.getElementById('des').innerHTML = `${todayDescription} | ${todayTemperature}°C`
  document.getElementById('sunRise').innerHTML = `Sunrise: ${sunriseTime}`;
  document.getElementById('sunSet').innerHTML = `Sunset: ${sunsetTime}`;
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

fetch (forecastUrl)
  .then((response) => {
    return response.json();
  })
  .then((forecast) => {
    const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'));

    filteredForecast.forEach((item) => {
      const temperature = item.main.temp;
      const tempShort = parseFloat(temperature).toFixed(1);
      
      

      const date = new Date(item.dt * 1000);
      const weekday = date.toLocaleDateString('en-VN', {
        weekday: 'short'
      });
      document.getElementById('foreCast').innerHTML += `<p>${weekday} ......${tempShort}°C</p>`;
    });
  })

    

  

   
