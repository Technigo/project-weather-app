const todaysWeather = document.getElementById("todaysWeather");
const weatherIcon = document.getElementById("weatherIcon");
const mainText = document.getElementById("description");
const futureWeather = document.getElementById("forecast");

fetch(
	"https://api.openweathermap.org/data/2.5/weather?q=Stockholm&APPID=c984a4a14aa0bdc3e1ae923f5a4051c2&units=metric"
)
	.then(response => {
		return response.json();
	})

	.then(json => {
		// This is the time of sunrise and sunset
		const unixTimestampSunrise = json.sys.sunrise;
		const unixTimestampSunset = json.sys.sunset;

		const sunrise = new Date(unixTimestampSunrise * 1000);
		const sunset = new Date(unixTimestampSunset * 1000);

		// To make time show as HH:MM
		const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
		const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });

		//Todays weather
		todaysWeather.innerHTML += `<h2>${
			json.weather[0].description
		} | ${Math.round(json.main.temp)}°</h2>`;
		todaysWeather.innerHTML += `<h2>sunrise ${sunriseTime}</h2>`;
		todaysWeather.innerHTML += `<h2>sunset ${sunsetTime}</h2>`;

		//Icon to show todays weather
		weatherIcon.innerHTML = `${json.weather[0].description}`;

		if (json.weather[0].main === "Clouds") {
			weatherIcon.innerHTML = `<img src=\"assets/cloudy.png\">`;
		} else if (json.weather[0].description === "few clouds") {
			weatherIcon.innerHTML = `<img src=\"assets/partly-cloudy.png\">`;
		} else if (json.weather[0].main === "Snow") {
			weatherIcon.innerHTML = `<img src=\"assets/snow.png\">`;
		} else if (json.weather[0].main === "Clear") {
			weatherIcon.innerHTML = `<img src=\"assets/sunny.png\">`;
		} else if (json.weather[0].main === "Rain") {
			weatherIcon.innerHTML = `<img src=\"assets/rain.png\">`;
		} else if (
			json.weather[0].description === "mist" ||
			json.weather[0].description === "fog"
		) {
			weatherIcon.innerHTML = `<img src=\"assets/mist.png\">`;
		}
	});
