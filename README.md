
# A Weather Web App :sunny:

I built a simple weather web app that tells today's weather and temperature in Stockholm, and a weekly forecast using the Open Weather API that I signed up for.

You can see it here: https://lucid-boyd-4f1d2b.netlify.com/
## What i learned 🧠

- What an API is and how to use it
- Basic JSON
- How to use fetch() in Javascript
- How to use promises in JavaScript
- How to work with the Date() object in JavaScript

## How I got started 💪🏼

I forked a repo, cloned it into my projects folder on my computer, opened up VS Code and started coding.

I signed up for a free Open weather Map account and fetched the API Key. I decided to prioritize to make it work and secondly on the design. 
Making a gradient background was a stretch goal but if there was time I would habve wanted toi really work soe more on the design.


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

### Present some data on your web app

Your task is to present the data: the city name, the temperature (rounded to 1 decimal place), and what type of weather it is (the "description" in the JSON)

### Sunrise and sunset 🌇

Show the time for sunrise and sunset in a readable time format (Example: 13:00 or 1 PM). 
You will have to format the date from milliseconds to a readble format.

[Here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) is a useful resource for how to do this.

### Weather forecast

Show a forecast for the next 5-7 days. With min and max temperature and the description.
In the openweathermap API there's another endpoint that will give us a forecast of the next seven days.

http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=5&APPID=YOUR_API_KEY

Here you can change city and amount of days.

*Parameters:*
**q** city name and country code divided by comma, use ISO 3166 country codes

**cnt** number of days returned (from 1 to 16)

The response should look something like this, where the list is an array of objects and the objects are the days:
``` 
"cod": "200",
"message": 0,
"cnt": 5,
"list": [
  {
    "dt": 1571745600,
    "main": {
      "temp": 11.9,
      "temp_min": 9.94,
      "temp_max": 11.9,
      "pressure": 1010,
      "sea_level": 1010,
      "grnd_level": 1007,
      "humidity": 73,
      "temp_kf": 1.96
    },
    "weather": [
      {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04d"
      }
    ],
    "clouds": {
      "all": 99
    },
    "wind": {
      "speed": 8.12,
      "deg": 242
    },
    "sys": {
      "pod": "d"
    },
    "dt_txt": "2019-10-22 12:00:00"
  },
  {
    "dt": 1571756400,
    "main": {
      "temp": 11.48,
      "temp_min": 10.01,
      "temp_max": 11.48,
      "pressure": 1009,
      "sea_level": 1009,
      "grnd_level": 1005,
      "humidity": 73,
      "temp_kf": 1.47
    },
    "weather": [
      {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04d"
      }
    ],
    "clouds": {
      "all": 100
    },
    "wind": {
      "speed": 7.13,
      "deg": 241
    },
    "sys": {
      "pod": "d"
    },
    "dt_txt": "2019-10-22 15:00:00"
  },
  {...},
  {...},
  {...}
],
"city": {
  "id": 2673730,
  "name": "Stockholm",
  "coord": {
    "lat": 59.3251,
    "lon": 18.0711
  },
  "country": "SE",
  "population": 1000000,
  "timezone": 7200,
  "sunrise": 1571722867,
  "sunset": 1571757785
}
```

## Requirements 🧪

- fetch data from the API using fetch() in JavaScript 
- This data should be present and fetched from the API: Location, temperature, sunrise/sunset time, 5-7 day forecast. 
- The presentation of the data should be in the specified format. 
- The page should work on mobile (mobile first!), tablet and desktop (Be responsive)

## Stretch Goals 🏃‍♂

**_Design_**

Change the colors of the page based on the weather. If the weather is warm – use warm colors. If the weather is colder, use cold colors. If you really want to push you CSS muscles you can even make a [background gradient.](https://www.w3schools.com/css/css3_gradients.asp) 

**_Deep-dive_**

***Use your location***

Use the [Geolocation API](https://www.w3schools.com/html/html5_geolocation.asp) that is built in to your browser to fetch the city that you are located in atm and show the weather for your location. 

***Add multiple cities***

Give the user the option to choose between a couple of your favourite cities. 


