const weatherContainer = document.getElementById("weather-container");

async function getWeather() {
	try {
		const response = await fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=162e87975bc70dc88548f3920f1c4fdf"
		);
		const weather = await response.json();

		const li = document.createElement("li");
		li.innerHTML += `
			<div>
				<h2>
					${weather.name}
				</h2>
				<p>Temperature ${weather.main.temp.toFixed(1)}</p>
				<p>Description: ${weather.weather[0].description}</p>
			</div>`;

		weatherContainer.appendChild(li);
	} catch (err) {
		console.error(err);
	}
}

//put get weatherforecast function here

// search funtion here

// Function calls here
getWeather();
