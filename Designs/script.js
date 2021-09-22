const weatherData = document.getElementById("weatherdata");
const weatherToday = document.getElementById("weather-today");
const weatherForecast = document.getElementById("weather-forecast");
const dropdownCities = document.getElementById ('dropdown-cities');

let userPosition

const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=stockholm,Sweden&units=metric&APPID=5caaaf25021b2d7aa4d206126b6a3351";

const API_Forecast =
	"https://api.openweathermap.org/data/2.5/forecast?q=stockholm,Sweden&units=metric&APPID=5caaaf25021b2d7aa4d206126b6a3351";


//Hamburger menu - Not working, maybe one of you can have a look?  

//when clicking on the hamburger menu the toggle function is invoked
const hamburger = document.getElementById('hamburger') //we could move this when it is working
hamburger.addEventListener('click', () => {
  toggle()
})

//opens and closes the dropdown
const toggle = () => {
  this.classList.toggle('open-dropdown')
} 

const handleWeatherApiResponse = (forecastForCity) => {
  console.log(forecastForCity)
  //copied other template so we see changes in live in chrome. we can remove this when we merge and add getForecastForCity and the API.
  weatherToday.innerHTML = `
  <p>City: ${forecastForCity.name}</p>
  <p>Temp: ${forecastForCity.main.temp.toFixed(1)}°C</p>  
  <p>Weather: ${forecastForCity.weather[0].description}</p>
  `
}

const onCityChanged = () => {
  getForecastForCity (dropdownCities.value, handleWeatherApiResponse);
  }
dropdownCities.addEventListener('change', onCityChanged);

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)

    let sunrise = data.sys.sunrise;
    sunrise = new Date(sunrise*1000);
    sunrise = sunrise.toLocaleTimeString([], {timeStyle: 'short'});
    
    let sunset = data.sys.sunset;
    sunset = new Date(sunset*1000);
    sunset = sunset.toLocaleTimeString([], {timeStyle: 'short'});

    weatherToday.innerHTML += `
      <div class="weather-container-div">
        <p id="temp-now">${data.main.temp.toFixed(1)}°C</p> 
        <p id="city-now">${data.name}</p>
        <p id="weather-now">${data.weather[0].description}</p>
        <div class="sunrise-sunset">
          <span>sunrise</span>
          <span>${sunrise}</span>
          <span>sunset</span>
          <span>${sunset}</span>
        </div>
      </div>  
      `; // toFixed(1) rounds the temp to one decimal

    temp =  data.main.temp 
    
      if (temp >= 25 && temp <= 65) {
        weatherToday.style.background = 'var(--hot)'
      } else if (temp >= 0 && temp <= 24) {
        weatherToday.style.background = 'var(--moderate)'
      } else {
        weatherToday.style.background = 'var(--cold)'
      }

    })
    .catch((error) => console.error("Error: ", error))
    .finally(() => console.log("Request done"));

// fetch(API_FORCAST)
// 	.then((res) => res.json())
// 	.then((forecast) => {
// 		const forecastDay = forecast.list.filter((day) =>
// 			day.dt_txt.includes("12:00")
// 		);


// // <h3>${day.dt_txt}</h3> This should be changed to show just the weekday (like Monday, Tuesday...)   
// 		forecastDay.forEach((day) => {
// 			weatherForecast.innerHTML += `
//       <h3>${day.dt_txt}</h3>
//       <p>🌡️${day.main.temp.toFixed(1)}°C</p> 
// 	    <p>Feels like: ${day.main.feels_like.toFixed(1)}°C</p> 
//       <p>Weather: ${day.weather[0].description}</p>
//     `;
// 		});
// 	})
// 	.catch((error) => console.error("Error: ", error))
// 	.finally(() => console.log("Request done"));


  fetch(API_Forecast)
      .then((Response) => { 
          return Response.json()
      })
      .then ((json) => {
          const filteredForecast = json.list.filter(item =>
          item.dt_txt.includes("12:00")
          );
          filteredForecast.forEach(day => {
              let date = new Date(day.dt * 1000);
              let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
              const dayTemp = day.main.temp;
              const weekTemp = dayTemp.toFixed(0.1);
         		
  
              document.getElementById('forecastDay').innerHTML += `<p>${dayName}</p>`
              document.getElementById('forecastTemp').innerHTML += `<p>${weekTemp}°C</p>
              <p>🌡️${day.main.temp.toFixed(1)}°C</p>`
              document.getElementById('forecastIcon').innerHTML += `<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"/>
              <p>Weather: ${day.weather[0].description}</p>`
      });  
  });

const getForecastForCity = (cityName, callbackFunction) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=5caaaf25021b2d7aa4d206126b6a3351`)
    .then((response) => response.json())
    .then((data) => {
      callbackFunction(data);
    })
    .catch((error) => console.error('Error: ', error))
    .finally(() => console.log('Request done'));
}

const getLocation = () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
  } else {
      alert (
          'Geolocation is not supported by this browser'
      )
  }
}

const showPosition = (position) => {
  userPosition = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  }
  console.log('lat', position.coords.latitude, 'long', position.coords.longitude)
}






