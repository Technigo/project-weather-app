const todaysWeather = document.getElementById("todaysWeather");
const weatherMessage = document.getElementById("weatherMessage");
const futureWeather = document.getElementById("forecast");

//Arrays with strings that will randomly appear depending on weather
const badWeather = [
	"go to the gym?",
	"call some friends and play a boardgame?",
	"go to the pub and have a beer?",
	"call in sick and play videogames all day?",
	"check the cookbook and cook something new?",
	"stay at home and do some coding?",
	"go to the movies today?",
	"remember that there are no dåligt väder, only dåliga kläder!",
	"bingewatch that series that you forgot you where following?",
	"pick up a good book at the bookstore?",
	"stay inside and give your plants new soil and pots?",
	"procrastrinate? Just kidding, go do something productive.",
	"scheme plans on how to seize the means of production?",
	"serve your bicycle?",
];

const goodWeather = [
	"go outside and take a walk?",
	"seize this oppurtunity to get some vitamin D?",
	"call some friends and light up the BBQ?",
	"take the bike and go see a friend?",
	"go outside and take a good whiff of that fresh air?",
	"do some kind of sports in the outdoors?",
	"go hiking in the woods?",
	"call some friends and go to the park?",
];

const randomSelector = array => {
	return array[Math.floor(Math.random() * array.length)];
};

const randomActivity = () => {
	activity.badWeather = randomSelector(goodWeather);
};

const randomActivity1 = () => {
	activity.badWeather = randomSelector(badWeather);
};

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

		//Icon to show todays weather and a main message depending on the weather
		weatherMessage.innerHTML = `${json.weather[0].description}`;

		if (json.weather[0].main === "Clouds") {
			weatherMessage.innerHTML = `<img src=\"assets/cloudy.png\"> <h2>Oh boy, the weather in ${json.name} is looking cloudy today. You can leave the sunglasses at home! Maybe we should ${activity.badWeather}</h2>`;
		} else if (json.weather[0].description === "few clouds") {
			weatherMessage.innerHTML = `<img src=\"assets/partly-cloudy.png\"> <h2>Hmmm, if we are lucky we might get some sun today in ${json.name}. Maybe we should ${activity.goodWeather}</h2>`;
		} else if (json.weather[0].main === "Snow") {
			weatherMessage.innerHTML = `<img src=\"assets/snow.png\"> <h2>Grab your snowracers! It is snowing in ${json.name}. Or maybe we should ${activity.badWeather}</h2>`;
		} else if (json.weather[0].main === "Clear") {
			weatherMessage.innerHTML = `<img src=\"assets/sunny.png\"> <h2>Dont forget to wear sunscreen if you go outside, in ${json.name} the sun is out! Maybe we should ${activity.goodWeather}</h2>`;
		} else if (json.weather[0].main === "Rain") {
			weatherMessage.innerHTML = `<img src=\"assets/rain.png\"> <h2>Poncho or umbrella? That is the question, because it is raining in ${json.name}. Maybe we should ${activity.badWeather}</h2>`;
		} else if (
			json.weather[0].description === "mist" ||
			json.weather[0].description === "fog"
		) {
			weatherMessage.innerHTML = `<img src=\"assets/mist.png\"> <h2>Just like the Stephen King novel, the mist is upon ${json.name}. Maybe we should ${activity.badWeather}</h2>`;
		}
	});
