const weatherData = document.getElementById("weatherdata");
const weatherToday = document.getElementById("weather-today");
const weatherForecast = document.getElementById("weather-forecast");
const dropdownCities = document.getElementById("dropdown-cities");

let userPosition;

const API_URL =
	"https://api.openweathermap.org/data/2.5/weather?q=cityname&units=metric&APPID=5caaaf25021b2d7aa4d206126b6a3351";

const API_Forecast =
	"https://api.openweathermap.org/data/2.5/forecast?q=stockholm,Sweden&units=metric&APPID=5caaaf25021b2d7aa4d206126b6a3351";

const getData = () => {
	//made global function so we can call from different areas in the code
	fetch(API_URL.replace("cityname", currentCity))
		.then((response) => response.json())
		.then((data) => {
			console.log(data);

			let sunrise = data.sys.sunrise;
			sunrise = new Date(sunrise * 1000);
			sunrise = sunrise.toLocaleTimeString([], { timeStyle: "short" });

			let sunset = data.sys.sunset;
			sunset = new Date(sunset * 1000);
			sunset = sunset.toLocaleTimeString([], { timeStyle: "short" });

			weatherToday.innerHTML = `
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

			temp = data.main.temp;

			
			let timeDay = new Date()
			timeDay = timeDay.getHours()
			console.log(timeDay)


			if (temp >= 25 && temp <= 65) {
				if (timeDay >= 06 && timeDay <= 22) {
					weatherToday.style.background = "var(--hot)";
				} else  {
					weatherToday.style.background = "var(--hotnight)";
				}
			}

			 if ( temp >= 0 && temp <= 24) {
				if (timeDay >= 6 && timeDay <= 22) {
					weatherToday.style.background = "var(--moderate)";
				} else {
					weatherToday.style.background = "var(--moderatenight)";
				}}  
				
				
				if (temp >= -40 && temp <= -1) {
				if (timeDay >= 6 && timeDay <= 22) {
					weatherToday.style.background = "var(--cold)";
				} else  {
					weatherToday.style.background = "var(--coldnight)";
				}
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
			return Response.json();
		})
		.then((json) => {
			const filteredForecast = json.list.filter((item) =>
				item.dt_txt.includes("12:00")
			);
			filteredForecast.forEach((day) => {
				let date = new Date(day.dt * 1000);
				let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
				const dayTemp = day.main.temp;
				const weekTemp = dayTemp.toFixed(0.1);

				document.getElementById("forecastDay").innerHTML += `<p>${dayName}</p>`;
				document.getElementById(
					"forecastTemp"
				).innerHTML += `<p>${weekTemp}°C</p>
              <p>🌡️${day.main.temp.toFixed(1)}°C</p>`;
				document.getElementById(
					"forecastIcon"
				).innerHTML += `<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"/>
              <p>Weather: ${day.weather[0].description}</p>`;
			});
		});
	fetch(API_FORCAST.replace("cityname", currentCity))
		.then((res) => res.json())
		.then((forecast) => {
			const forecastDay = forecast.list.filter((day) =>
				day.dt_txt.includes("12:00")
			);

			// https://stackoverflow.com/questions/24998624/day-name-from-date-in-js/24998705 autohor iamnox
			weatherForecast.innerHTML = "";
			forecastDay.forEach((day) => {
				weatherForecast.innerHTML += `
      <h3>${new Date(day.dt * 1000).toLocaleDateString("en-us", {
				weekday: "long",
			})}</h3> 
      <p>🌡️${day.main.temp.toFixed(1)}°C</p> 
	    <p>Feels like: ${day.main.feels_like.toFixed(1)}°C</p> 
      <p>Weather: ${day.weather[0].description}</p>
    `;
			});
		})
		.catch((error) => console.error("Error: ", error))
		.finally(() => console.log("Request done"));
};

const handleWeatherApiResponse = (forecastForCity) => {
	console.log(forecastForCity);
	//copied other template so we see changes in live in chrome. we can remove this when we merge and add getForecastForCity and the API.
	weatherToday.innerHTML = `
  <p>City: ${forecastForCity.name}</p>
  <p>Temp: ${forecastForCity.main.temp.toFixed(1)}°C</p>  
  <p>Weather: ${forecastForCity.weather[0].description}</p>
  `;
};

const onCityChanged = (event) => {
	document.querySelector(".menu-btn").checked = false; //https://stackoverflow.com/questions/8206565/check-uncheck-checkbox-with-javascript
	console.log("begin onCityChanged");
	console.log(event.target.dataset.cityname);
	currentCity = event.target.dataset.cityname;
	getData();
	console.log("end onCityChanged");
};

const getDefaultCity = () => {
	console.log("start getDefaultCity");
	let cities = document.querySelectorAll("[data-cityname]");
	console.log("finished getDefaultCity");
	return cities[0].dataset.cityname; //dataset is an object with all data attributes inside https://www.w3schools.com/tags/att_global_data.asp
};

const initializeCitySelector = () => {
	console.log("begin initializeCitySelector");
	let cities = document.querySelectorAll("[data-cityname]");
	cities.forEach((element) => {
		console.log("adding event listener");
		element.addEventListener("click", onCityChanged);
	});
	console.log("finished initializeCitySelector");
};

const getForecastForCity = (cityName, callbackFunction) => {
	fetch(
		`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=5caaaf25021b2d7aa4d206126b6a3351`
	)
		.then((response) => response.json())
		.then((data) => {
			callbackFunction(data);
		})
		.catch((error) => console.error("Error: ", error))
		.finally(() => console.log("Request done"));
};

const getLocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Geolocation is not supported by this browser");
	}
};

const showPosition = (position) => {
	userPosition = {
		latitude: position.coords.latitude,
		longitude: position.coords.longitude,
	};
	console.log(
		"lat",
		position.coords.latitude,
		"long",
		position.coords.longitude
	);
};

initializeCitySelector();
let currentCity = getDefaultCity(); //a function to get default city
getData();
