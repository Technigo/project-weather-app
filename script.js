const container = document.getElementById("container");
const currentWeather = document.getElementById("currentWeather");

// Feature: Sunrise and sunset
function setWeatherClass(weatherClass) {
	switch (weatherClass) {
		case "clear":
			container.classList.toggle("clear");
			break;
		case "rain":
			container.classList.toggle("rain");
			break;
		case "cloudy":
			container.classList.toggle("cloudy");
			break;
		default:
			container.classList.toggle("default");
	}
}

async function getWeather() {
	try {
		const response = await fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=162e87975bc70dc88548f3920f1c4fdf"
		);
		const weatherResponse = await response.json();
		const weatherClass = weatherResponse.weather[0].main;
		const currentTemperature = Math.round(weatherResponse.main.temp);
		setWeatherClass(weatherClass.toLowerCase());

		const weatherParagraph = document.createElement("p");
		weatherParagraph.innerHTML += `${weatherClass} | ${currentTemperature}&#176;`;
		currentWeather.appendChild(weatherParagraph);

		const sunrise = new Date(weatherResponse.sys.sunrise * 1000)
			.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })
			.replace(":", ".");
		const sunriseParagraph = document.createElement("p");
		sunriseParagraph.innerHTML += `sunrise ${sunrise}`;
		currentWeather.appendChild(sunriseParagraph);

		const sunset = new Date(weatherResponse.sys.sunset * 1000)
			.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })
			.replace(":", ".");
		const sunsetParagraph = document.createElement("p");
		sunsetParagraph.innerHTML += `sunset ${sunset}`;
		currentWeather.appendChild(sunsetParagraph);
	} catch (err) {
		console.error(err);
		currentWeather.innerHTML += `Could not get today's weather`;
	}
}

//put get weatherforecast function here

// search funtion here

// Function calls here
getWeather();
