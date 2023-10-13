// Constants
const SUNNY_MESSAGE =
	"Get your sunnies on. Stockholm is looking rather great today.";
const RAINY_MESSAGE =
	"Don’t forget your umbrella. It’s wet in Stockholm today.";
const CLOUDY_MESSAGE =
	"Light a fire and get cosy. Stockholm is looking grey today.";

const container = document.getElementById("container");
const currentWeather = document.getElementById("currentWeather");
const weatherImg = document.getElementById("weatherImg");
const weatherText = document.getElementById("weatherText");

function setImgSrc(src) {
	console.log("hej hej");
	weatherImg.src = `img/${src}.svg`;
}
// Feature: Sunrise and sunset
function setSunTimeParagraph(sunTime, milliSeconds) {
	const timeInHours = new Date(milliSeconds * 1000)
		.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })
		.replace(":", ".");
	const sunTimeParagraph = document.createElement("p");
	sunTimeParagraph.innerHTML += `${sunTime} ${timeInHours}`;
	currentWeather.appendChild(sunTimeParagraph);
}

function setWeatherClass(weatherClass) {
	switch (weatherClass) {
		case "clear":
			container.classList.toggle("clear");
			setImgSrc("sunglasses");
			weatherText.innerText = `${SUNNY_MESSAGE}`;
			break;
		case "rain":
			container.classList.toggle("rain");
			setImgSrc("umbrella");
			weatherText.innerText = `${RAINY_MESSAGE}`;
			break;
		case "cloudy":
			container.classList.toggle("cloudy");
			setImgSrc("cloud");
			weatherText.innerText = `${CLOUDY_MESSAGE}`;
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

		const weatherParagraph = document.createElement("p");
		weatherParagraph.innerHTML += `${weatherClass} | ${currentTemperature}&#176;`;
		currentWeather.appendChild(weatherParagraph);

		setSunTimeParagraph("sunrise", weatherResponse.sys.sunrise);
		setSunTimeParagraph("sunset", weatherResponse.sys.sunset);
		setWeatherClass(weatherClass.toLowerCase());
	} catch (err) {
		console.error(err);
		currentWeather.innerHTML += `Could not get today's weather`;
	}
}

//put get weatherforecast function here

// search funtion here

// Function calls here
getWeather();
