const weatherData = document.getElementById("weatherdata");

let userPosition

const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=stockholm,Sweden&units=metric&APPID=5caaaf25021b2d7aa4d206126b6a3351";

const API_FORCAST =
	"https://api.openweathermap.org/data/2.5/forecast?q=stockholm,Sweden&units=metric&APPID=5caaaf25021b2d7aa4d206126b6a3351";

fetch(API_URL)
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		weatherData.innerHTML = `
	
      <p>City: ${data.name}</p>
      <p>Temp: ${data.main.temp.toFixed(1)}°C</p>  
      <p>Weather: ${data.weather[0].description}</p>


    `; // toFixed(1) rounds the temp to one decimal


	temp = data.main.temp
	
		if (temp >= 25 && temp <= 65) {
			document.body.style.background = 'var(--hot)'
		} else if (temp >= 0 && temp <= 24) {
			document.body.style.background = 'var(--moderate)'
		} else {
			document.body.style.background = 'var(--cold)'
		}



	})
	.catch((error) => console.error("Error: ", error))
	.finally(() => console.log("Request done"));

fetch(API_FORCAST)
	.then((res) => res.json())
	.then((forecast) => {
		const forecastDay = forecast.list.filter((day) =>
			day.dt_txt.includes("12:00")
		);

		forecastDay.forEach((day) => {
			weatherData.innerHTML += `
      <h3>${day.dt_txt} </h3>
      <p>Temp: ${day.main.temp.toFixed(1)}°C</p> 
	  <p>Feels like: ${day.main.feels_like.toFixed(1)}°C</p> 
      <p>Weather: ${day.weather[0].description}</p>
    `;
		});
	})
	.catch((error) => console.error("Error: ", error))
	.finally(() => console.log("Request done"));


	
	
	
	backgroundColor()
=======
    `// toFixed(1) rounds the temp to one decimal
  })
  .catch((error) => console.error('Error: ', error))
  .finally(() => console.log('Request done'))


const getForecastForCity = (cityName, callbackFunction) => {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=5caaaf25021b2d7aa4d206126b6a3351`)
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

