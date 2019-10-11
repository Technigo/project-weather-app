`PROJECT 6`

# Build a Weather Dashboard :sunny:

This weeks project is to build a simple weather dashboard that tells today's weather and temperature using a weather API. We will start by keeping it simple and then there's great possibilities to build on with stretch goals. The page, before stretch goals should look something along the lines of this:

![Design](https://github.com/Technigo/project-weather-dash/blob/master/weather-dash-01.png)

---

## What you will learn 🧠

- What an API is and how to use it
– Basic json
– What to use fetch() in Javascript
– How to use callback and promises in JavaScript

## How to get started 💪🏼

1. Fork this repo
2. Clone this repo into your projects folder on your computer
3. Open up VS Code and start coding!

### Get started with the weather API.

[Sign up for a free Open Weather Map account](https://home.openweathermap.org/users/sign_up). Once signed in, go to the "Api Keys" tab and copy the API Key. You can use the API Key in the APPID parameter when making calls to the openweathermap API.

For example, to get the current weather in Stockholm, you can use the url below. Remember to replace "YOUR_API_KEY" with the API key you copied from your dashboard.

http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY

The response should look something like this (this has been run through jsonlint.com to add newlines and indentation):

```json

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

As you can see, there's a bunch of useful information in there - including current temperature, windspeed, humidity, etc.

You will need to use the `fetch()` function in JavaScript to load the weather data into your page, and then select the values you want to inject into the DOM from the JSON which comes from the API.

### Present the data on your page

Your task is to present the data: the city name, the temperature (rounded to 1 decimal place), what type of weather it is (the "description" in the JSON), and the time for sunset and sundown in a readable time format (Example: 13:00 or 1 PM). 

Once you get the data onto your page, style your page however you'd like to with CSS, OR add more data to make it even more useful! See suggestions in the stretch goals section.

Start with just getting data from the API and then get it on to your page. Once the data is there you can start modifying the data – such as the rounding of the temperature and the sunset och sundwon times. For the later you might have to google "javascript date format". 

## Requirements 🧪

- You should fetch data from the API using fetch() in JavaScript 
– All data in sketch above your be present and fetched from the API in the specified format. 
- The page should work on mobile, tablet and desktop (Be resposive)- 
- Code follows Technigo’s code guidelines.
- Contribute by helping others with this project on Stack Overflow.
- If selected; demo your solution for your team.

## How to hand in the code 🎯

- When you’re finished with the project, push your code to GitHub with these commands:

  ```
  git add .
  git commit -m "your commit message"
  git push origin master
  ```

- Navigate to your repo and create a Pull Request into the Technigo repo (Add a link to your deployed project.)
- Wait for the code review from your teachers

## How to get help 🆘

Ask for help and share your knowledge about this project with the 'weather-dashboard' tag on [Stack Overflow](https://stackoverflow.com/c/technigo/questions). Talk to your team on Slack and help each other out. Do some research about your problem, you are surely not the first one with this problem, Google is your friend 🙂. And you can of course also reach out to your teachers.

## Stretch Goals 🏃‍♂

Make sure you've commited and pushed a version of your project before starting with the stretch goals.

**_Design_**

Change the colors of the page based on the weather. If the weather is warm – use warm colors. If the weather is colder, use cold colors. If you really want to push you CSS muscles you can even make a [background gradient.](https://www.w3schools.com/css/css3_gradients.asp) 

**_Deep-dive_**

***Use your location***

Use the [Geolocation API](https://www.w3schools.com/html/html5_geolocation.asp) that is built in to your browser to fetch the city that you are located in atm and show the weather for your location. 

***Add multiple cities***

Give the user the option to choose between a couple of your favourite cities. 

#### 🚨 Don't forget to add, commit and push the changes to GitHub when you're done. 🏁
