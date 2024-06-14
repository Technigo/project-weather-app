

const weather = document.getElementById("weather");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const suggestion = document.getElementById("suggestion");
const icon = document.getElementById("icon");
const forcast = document.querySelector(".forcast");
const main = document.querySelector("main");
const body = document.querySelector("body");

const button = document.getElementById("button");
const localButton = document.getElementById("localButton");
const inputCity = document.getElementById("city");
const inputCountry = document.getElementById("country");

const API_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "881f27fa83654bcdd65f36b0a3aad2a0";
let city = "";
let country = "";
const units = "metric";
let latitude = "";
let longitude = "";
let riseHours;
let riseMinutes;
let setHours;
let setMinutes;
let currentStyle;
let updateStyle = "";
let suggestionTxt;
let timestamp;
let weekday;
let hours;
let minutes;
let previousStyle = "";


//handle user input
const form = document.querySelector("form");
const cityInput = document.querySelector("#city");
const countryInput = document.querySelector("#country");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	main.classList.remove(previousStyle);
	body.classList.remove(previousStyle);
	icon.classList.remove(previousStyle);
	button.classList.remove(previousStyle);
	inputCity.classList.remove(previousStyle);
	inputCountry.classList.remove(previousStyle);
	localButton.classList.remove(previousStyle);

	forcast.innerHTML = '';
	city = cityInput.value;
	country = countryInput.value;
	fetchForcast();
	fetchFiveDayForcast();
});


const getLocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		console.log("Geolocation is not supported by this browser.");
	}
};
const showPosition = (position) => {
	console.log(
		"Latitude: " +
			position.coords.latitude +
			"Longitude: " +
			position.coords.longitude
	);
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
};
const handleErrors = (error) => {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			console.log("User denied the request for Geolocation.");
			break;
		case error.POSITION_UNAVAILABLE:
			console.log("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			console.log("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			console.log("An unknown error occurred.");
			break;
	}
};

const getStyles = (currentStyle) => {
	previousStyle = updateStyle;
	switch (currentStyle) {
		case "Rain":
			updateStyle = "rainy";
			suggestionTxt = `Don't forget your umbrella. It's wet in ${city} today.`;
			break;
		case "Drizzle":
			updateStyle = "rainy";
			suggestionTxt = `You might concider bringing your umbrella.We might get some light rain in ${city} today.`;
			break;
		case "Thunderstorm":
			updateStyle = "rainy";
			suggestionTxt = `Uhu looks like a thunder in ${city} today.`;
			break;
		case "Snow":
			updateStyle = "rainy";
			suggestionTxt = `Light a fire and get cosy. Looks like it's going to snow in ${city} today.`;
			break;
		case "Clear":
			updateStyle = "sunny";
			suggestionTxt = `Get your sunnies on. ${city} is looking rather great today.`;
			break;
		case "Clouds":
			updateStyle = "cloudy";
			suggestionTxt = `Light a fire and get cosy. ${city} is looking grey today.`;
			break;
		case "Sun":
			updateStyle = "sunny";
			suggestionTxt = `Get your sunnies on. ${city} is looking rather great today.`;
			break;
		default:
	}
};



const fetchFiveDayForcast = () => {

	fetch(`${API_URL}forecast?q=${city},${country}&units=${units}&APPID=${API_KEY}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error("HTTP error! Status:${response.status}");
			}
			return response.json();
		})
		.then((weekData) => {
			const filterDays = weekData.list.filter((time) =>
				time.dt_txt.includes("12:00")
			);
			const today = new Date().getDay();
			let dayCounter = 0;
			filterDays.forEach((d) => {
				const date = new Date(d.dt * 1000);
				if (date.getDay() !== today && dayCounter < 5) {
					const forcast = document.querySelector(".forcast");
					getStyles(currentStyle);
					forcast.innerHTML += `
						<div class ="lines ${updateStyle}">
							<div class="day">${convertDay(date.getDay())}</div>
							<div class="temp">${d.weather[0].description} | ${parseInt(d.main.temp).toFixed(
						1
					)}° <span class="description_hidden">| Feels like: ${parseInt(
						d.main.feels_like
					).toFixed(1)}°</span> </div>
						</div>`;
					dayCounter++;
				}
			});
		})
		.catch((error) => {
			console.error("Error: ", error.message);
		});
};

const fetchForcast = () => {
	fetch(`${API_URL}weather?q=${city},${country}&units=${units}&APPID=${API_KEY}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status:${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			currentStyle = data.weather[0].main;
			getStyles(currentStyle);
			const rise = convertTime(data.sys.sunrise);
			const set = convertTime(data.sys.sunset);
			body.classList.add(updateStyle);
			main.classList.add(updateStyle);
			icon.classList.add(updateStyle);
			button.classList.add(updateStyle);
			inputCity.classList.add(updateStyle);
			inputCountry.classList.add(updateStyle);
			localButton.classList.add(updateStyle);

			weather.innerText = `${data.weather[0].description} | ${parseInt(
				data.main.temp
			).toFixed(1)}°`;
			sunrise.innerText = `sunrise ${rise} `;
			sunset.innerText = `sunset ${set} `;
			suggestion.innerText = suggestionTxt;
		})
		.catch((error) => {
			console.error("Error: ", error.message);
		});
};

const convertTime = (time) => {
	let unix_timestamp = time;
	let date = new Date(unix_timestamp * 1000);
	let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
	let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
	weekday = date.getDay();
	return `${hours}.${minutes} `;
};

const convertDay = (weekday) => {
	switch (weekday) {
		case 0:
			return "Sun";
		case 1:
			return "Mon";
		case 2:
			return "Tue";
		case 3:
			return "Wed";
		case 4:
			return "Thu";
		case 5:
			return "Fri";
		case 6:
			return "Sat";
		default:
			break;
	}
};

const getLocalWeather = () => {
	navigator.geolocation.getCurrentPosition((position) => {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		// get city name from lat and long
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
		)
			.then((response) => response.json())
			.then((data) => {

				city = data.name;
				country = data.sys.country;
				fetchForcast();
				fetchFiveDayForcast();
			});
	})
}

(function() {
	getLocalWeather();
})();

