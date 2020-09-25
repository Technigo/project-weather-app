
// GET WEATHER REPORT
const enteredCityLocation = "Stockholm";

//API's
const API_ONE_DAY = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCityLocation}&appid=3eb926770233f3bacc440bffc14e56a4`;
const API_FIVE_DAYS = `https://api.openweathermap.org/data/2.5/forecast?q=${enteredCityLocation}&appid=3eb926770233f3bacc440bffc14e56a4`;

// Weather Variables
const cityLocation = document.getElementById("currentCityName");
const tempIcon = document.getElementById("temp-icon");
const tempValue = document.getElementById("temp-value");
const climate = document.getElementById("climate");
const sunRiseTime = document.getElementById("sunrise");
const sunSetTime = document.getElementById("sunset");

// Getting Data for current Weather
fetch(API_ONE_DAY)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    console.log(data);//CONSOLE LOG TO SEE API DATA
    const { id, main } = data.weather[0];
    cityLocation.textContent = data.name;
    tempValue.textContent = ((data.main.temp - 273).toFixed(1));
    climate.textContent = main;

    //Calculation of Sunrise time
    const sunriseHour = new Date(data.sys.sunrise * 1000).getHours();
    const sunriseMinutes = "0" + new Date(data.sys.sunrise * 1000).getMinutes();
    const formattedSunrise = `${sunriseHour}:${sunriseMinutes.substr(-2)}`;

    // Calculation of Sunset time
    const sunsetHour = new Date(data.sys.sunset * 1000).getHours();
    const sunsetMinutes = "0" + new Date(data.sys.sunset * 1000).getMinutes();
    const formattedSunset = `${sunsetHour}:${sunsetMinutes.substr(-2)}`;
    sunRiseTime.textContent = formattedSunrise;
    sunSetTime.textContent = formattedSunset;

    // Changing Icons for weather using if-else
    if (id < 250) {
      tempIcon.src = './images/icons/thunder.png';
    }
    else if (id < 350) {
      tempIcon.src = './images/icons/lightrain.png';
    }
    else if (id < 550) {
      tempIcon.src = './images/icons/heavyrain.png';
    }
    else if (id < 650) {
      tempIcon.src = './images/icons/snow.png';
    }
    else if (id < 700) {
      tempIcon.src = './images/icons/thunder.png';
    }
    else if (id == 800) {
      tempIcon.src = './images/icons/clear.png';
    }
    else if (id > 800) {
      tempIcon.src = './images/icons/cloudy.png';
    }
    else {
      tempIcon.src = './images/icons/bad.png';
    };
  })
  .catch((error) => {
    console.log('There has been an error')
  })

// Fetch Data for next 5 days
fetch(API_FIVE_DAYS)
  .then((response) => {
    return response.json();
  })
  .then((forecast) => {
    console.log(forecast)  //CONSOLE LOG TO SEE API DATA
    const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('09:00'));
    let output = '';
    filteredForecast.forEach((item) => {
      const maxTemperature = Math.round(item.main.temp_max - 273);
      const minTemperature = Math.round(item.main.temp_min - 273);
      const date = new Date(item.dt * 1000);
      const weekday = date.toLocaleDateString('en-US', {
        weekday: 'short'
      });
      output += `<p>${weekday} : ${maxTemperature}°C | ${minTemperature}°C </p>`;
    });
    document.getElementById('forecast').innerHTML = output;
  });
