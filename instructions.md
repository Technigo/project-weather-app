# Instructions
Start out with signing up for a [free Open Weather Map](https://home.openweathermap.org/users/sign_up "free Open Weather Map") account, as it can take up to a few hours for the API key to be activated.

We've asked a couple of different designers to do their take on this project. It's a great practice in implementing someone else's design. You will find their designs in the design folder in the repo along with some design assets. Decide together with your coding buddy, which design you want to implement - and follow the design as closely as you can.

## How to get started 💪🏼

1. One person forks the repo.
2. The person forking the repo will be the owner of the repo. They now have to invite the other person as collaborators. To do that you go to the repo's Settings → Manage access → Invite a collaborator.
    
    ![Skärmavbild 2021-09-17 kl. 15.26.28.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/18c2b0ea-62ad-46c0-9735-035fec656c9b/Skarmavbild_2021-09-17_kl._15.26.28.png)
    
3. One person clones the repo, and together in pairs you will layout the foundation (following Step 1 & 2, specified further down).
4. Push the changes to GitHub.
5. When it's time to split up and work in branches, it's also time for the other person to clone the repo.
6. Work in branches, commit and push to your branch. Git cheat sheet can be found [here](https://www.notion.so/424c3528791e42d0a7daabe6f0b5a308?pvs=21).

## How to hand in the code 🎯

- Since you're working with branches this week, you'll have to merge the branches together before handing in. Look at the [Working in teams video](https://www.notion.so/46b2f4e4a01847a8bf575f9904739088?pvs=21) and the [cheatsheet](https://www.notion.so/424c3528791e42d0a7daabe6f0b5a308?pvs=21) for more information about how to work with branches.
- When you’re finished with the project, only one person (owner of the repo) needs to open a Pull Request into the Technigo repo.
- Hand in your project the usual way

---

## Hints and tips to complete the project 🤓
For this project, we suggest that you lay out the foundation of your project together using pair programming. After that, it's time to split up and start working in branches.

### Step 1 - Get started with the weather API
[Sign up for a free Open Weather Map account](https://home.openweathermap.org/users/sign_up). Once signed in, go to "My API keys". You find that in the menu if you click your username. Copy the API Key. You can use the API Key in the APPID parameter when making calls to the openweathermap API.

For example, to get the current weather in Stockholm, you can use the URL below. Remember to replace YOUR_API_KEY with the API key you copied from your dashboard.

```
https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY
```

The response should look something like this (this has been run through jsonlint.com to add newlines and indentation):

```
{
	"coord": {
		"lon": 18.06,
		"lat": 59.33
	},
	"weather": [{
		"id": 800,
		"main": "Clear",
		"description": "clear sky",
		"icon": "01d"
	}],
	"base": "stations",
	"main": {
		"temp": 6.47,
		"pressure": 1007,
		"humidity": 56,
		"temp_min": 6,
		"temp_max": 7
	},
	"visibility": 10000,
	"wind": {
		"speed": 3.6,
		"deg": 200
	},
	"clouds": {
		"all": 0
	},
	"dt": 1509709800,
	"sys": {
		"type": 1,
		"id": 5420,
		"message": 0.0024,
		"country": "SE",
		"sunrise": 1509689610,
		"sunset": 1509720490
	},
	"id": 2673730,
	"name": "Stockholm",
	"cod": 200
}
```

As you can see, there's a bunch of useful information in there - including current temperature, wind speed, humidity, etc.

You will need to use the `fetch()` function in JavaScript to load the weather data into your page, and then select the values you want to inject into the DOM from the JSON which comes from the API.

Read the [endpoint documentation](https://openweathermap.org/current) for the current weather.

### Step 2 - Present some data on your web app
Your task is to present some data on your web app. Start with:
- the city name
- the temperature (rounded to 1 decimal place)
- and what type of weather it is (the "description" in the JSON)

### Step 3 - Features
Now it's time to split up and start working in GitHub branches. Decide beforehand when you should have a "feature freeze" so that you make time for merging.

**Feature: Sunrise and sunset 🌅**
Show the time for sunrise and sunset in a readable time format (Example: 13:00 or 1 PM). You will have to format the date from milliseconds to a readable format. [Here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date "Here") is a useful resource for how to do this.

**Feature: Weather forecast 📅**
Show a forecast for the next 5 days. You can choose how to display the forecast - perhaps you want to show the min and max temperature for each day, or perhaps you want to show the temperature from the middle of the day, or the humidity, what it feels like and so on.


```
https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY
```

The API gives us the next 5 days but for every third hour. So a good idea could be to only use the weather data from the same time every day. You can filter the forecast list array to only get the info from 12:00 each day for example. 

Read the [endpoint documentation](https://openweathermap.org/forecast5 "endpoint documentation") for the forecast.

**Feature: Style it 🎨**
Style it to look like one of the provided designs.

## Requirements
- Complete Step 1-3
- Follow the guidelines on [how to write good code](https://www.notion.so/Guidelines-for-how-to-write-good-code-59abdd4307a24f5ca7914d566326f4df?pvs=4 "how to write good code")

## Stretch goals
So you’ve completed the requirements? Great job! Make sure you've committed and pushed a version of your project before starting on the stretch goals. Remember that the stretch goals are optional.

### Intermediate Stretch Goals
**Feature: Styling warm/cold 🌞❄️**
Change the colours of the page based on the weather. If the weather is warm – use warm colours. If the weather is colder, use cold colours. If you really want to push your CSS muscles you can even make a background gradient.

Another alternative is to include visual indicators for the type of weather, cloudy/sunny/rainy/etc.

**Feature: More cities 🏙️**
Give the user the option to choose between a couple of your favourite cities, or create a searchbar where the user can search for a specific city.

### Advanced Stretch Goals
**Feature: Use your location 🗺️**
Use the [Geolocation API](https://www.w3schools.com/html/html5_geolocation.asp "Geolocation API") that is built into your browser to fetch the city that you are located in at the moment and show the weather for your location.

**Feature: Add more data 💽**
Explore the API and use another endpoint of the Weather API to include supplementary information.

**Feature: CSS Animations**
Add some CSS animations to your app, e.g. pulsating sun/raindrops.