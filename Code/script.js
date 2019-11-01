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
	"go outside and get a good whiff of that fresh air?",
	"do some kind of sports in the outdoors?",
	"go hiking in the woods?",
	"call some friends and go to the park?",
];

const randomSelector = array => {
	return array[Math.floor(Math.random() * array.length)];
};

const randomGreeting = () => {
	activity.goodWeather = randomSelector(goodWeather);
	activity.badWeather = randomSelector(badWeather);
};

randomGreeting();

const city = "Stockholm";
const apiKey = "c984a4a14aa0bdc3e1ae923f5a4051c2";

fetch(
	`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
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
			document.getElementById("wrapper").style.backgroundColor = "#99ccff";
		} else if (json.weather[0].description === "few clouds") {
			weatherMessage.innerHTML = `<img src=\"assets/partly-cloudy.png\"> <h2>Hmmm, if we are lucky we might get some sun today in ${json.name}. Maybe we should ${activity.goodWeather}</h2>`;
			document.getElementById("wrapper").style.backgroundColor = "#99ccff";
		} else if (json.weather[0].main === "Snow") {
			weatherMessage.innerHTML = `<img src=\"assets/snow.png\"> <h2>Grab your snowracers! It is snowing in ${json.name}. Or maybe we should ${activity.badWeather}</h2>`;
		} else if (json.weather[0].main === "Clear") {
			weatherMessage.innerHTML = `<img src=\"assets/sunny.png\"> <h2>Nice! Clear skies in ${json.name}. Maybe we should ${activity.goodWeather}</h2>`;
			document.getElementById("wrapper").style.backgroundColor = "#99ccff";
		} else if (json.weather[0].main === "Rain") {
			weatherMessage.innerHTML = `<img src=\"assets/rain.png\"> <h2>Poncho or umbrella? That is the question, because it is raining in ${json.name}. Maybe we should ${activity.badWeather}</h2>`;
			document.getElementById("wrapper").style.backgroundColor = "#99ccff";
		} else if (
			json.weather[0].description === "mist" ||
			json.weather[0].description === "fog"
		) {
			weatherMessage.innerHTML = `<img src=\"assets/mist.png\"> <h2>Just like the Stephen King novel, the mist is upon ${json.name}. Maybe we should ${activity.badWeather}</h2>`;
		}
	});

// This function handles the eventual response from the API (at the bottom)

const handle5DayForecast = json => {
	// I have a <ul> in the DOM with an id of forecast which is where I want to put
	// the daily forecast once we've built it.
	const forecastDiv = document.getElementById("forecast");

	// The json we have in this function has a property called 'list' which has around
	// 40 objects - each with the weather for a time in the upcoming days. It's ~40 items
	// because it returns the temperature for every 3 hours.
	//
	// Since we only want to show 1 entry in the forecast div per day, we need to group
	// those 40 entries. This 'dates' object is what I'm going to use for that. In the end,
	// it will have a property for each date, and each property's value will be an array of all the
	// weather objects for that day.
	//
	// For example:
	//    { "2019-10-30": [...] }
	const dates = {};

	// Iterate over each of these ungrouped weather objects.
	json.list.forEach(weather => {
		// Each weather object has a 'dt_txt' property which looks like '2019-10-31 18:00'.
		// I want the '2019-10-31' to be able to say which date this entry belongs to, but I don't care
		// about what time of day the entry is for.
		//
		// So, if we split the date on ' ', we end up with an array with the date and the time,
		// like this: ['2019-10-31', '18:00']. Then I select the first item from that array [0]
		// and assign it to the 'date' variable.
		const date = weather.dt_txt.split(" ")[0];

		// This is where we start adding values to the arrays in the 'dates' object we defined above.
		// First, we check if the 'dates' object already has a property for the date we got from the
		// string above...
		if (dates[date]) {
			// If the 'dates' object DID have the date we're working with, then we know we already
			// have an array, so we can push this weather object into it.
			dates[date].push(weather);
		} else {
			// If it DID NOT have this date, then it's the first instance of this new date, so
			// we can add a new property to our 'dates' object with a value which is an array
			// with the weather object we have in this iteration of the .forEach loop we're in.
			dates[date] = [weather];
		}
	});

	// So, now we have grouped weather objects by day we can use Object.entries to turn the object
	// into an array which we can loop over with .forEach. See the Object.entries docs here:
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
	Object.entries(dates).forEach((item, index) => {
		// The first item in our dates list is going to be today, so we can skip it (we're showing the current
		// weather at the top of our weather app)
		if (index === 0) {
			return;
		}

		// Object.entries breaks our object into an array, where the first item is the key and the second
		// item is the value. So, for example, if our object was { "2019-10-30": [] }, then the 'item' variable we
		// have here will be ['2019-10-30', []]. We can assign those two items in our array to more meaningful
		// variables:
		const date = item[0];
		const weatherValues = item[1];

		// So now our new 'weatherValues' is the array of weather objects for the current date we're iterating.
		// We can use .map to select a bunch of values from those objects - their temps. See .map docs here:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
		const temps = weatherValues.map(value => value.main.temp);

		// We want to get the min and max temps from the array of temperatures we constructed above, but
		// unfortunately, the Math.max and Math.min functions can't just be passed arrays of values. So,
		// we can use the very useful spread operator (...) to invoke those functions as if the array was
		// a bunch of arguments instead of a single array. See the docs for spread, and Math here:
		// Spread - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
		// Math.min - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
		// Math.max - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
		const minTemp = Math.min(...temps);
		const maxTemp = Math.max(...temps);

		// Finally! Now we have the date, along with the min and max temp for that day. We can add it to
		// the list of <li> elements in the forecastDiv.
		forecastDiv.innerHTML += `<li>${date} - min: ${minTemp.toFixed(
			1
		)}, max: ${maxTemp.toFixed(1)}</li>`;
	});
};

// Call the forecast endpoint for the selected city, parse the json, then call the function above
fetch(
	`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
)
	.then(res => res.json())
	.then(handle5DayForecast);
