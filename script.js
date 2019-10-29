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
		const unixTimestampSunrise = json.sys.sunrise;
		const unixTimestampSunset = json.sys.sunset;

		const sunrise = new Date(unixTimestampSunrise * 1000);
		const sunset = new Date(unixTimestampSunset * 1000);

		const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
		const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });

		todaysWeather.innerHTML += `<h2>${
			json.weather[0].description
		} | ${Math.round(json.main.temp)}°</h2>`;
		todaysWeather.innerHTML += `<h2>sunrise ${sunriseTime}</h2>`;
		todaysWeather.innerHTML += `<h2>sunset ${sunsetTime}</h2>`;
	});
