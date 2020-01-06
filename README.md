#The Weather Web App :sunny: / See the site here: https://mrsucodesproject6themiamiweatherapp.netlify.com/?

This time I built a simple weather web app that tells today's weather and temperature, and a weekly forecast using a weather API - in Miami!! :sunny:

---

## What I learned 🧠

- What an API is and how to use it
- Basic JSON
- How to use fetch() in Javascript
- How to use promises in JavaScript
- How to work with the Date() object in JavaScript
- How to work with time difference

## How I got started 💪🏼

1. Fork this repo
2. Clone this repo into your projects folder on your computer
3. Open up VS Code and start coding!

### #1 Tips of starting with the weather API.

[I signed up for a free Open Weather Map account](https://home.openweathermap.org/users/sign_up). Once signed in, I found the "Api Keys" tab and copied the API Key. I used the weather in Miami by finding the city and country code. Down below is how it would look lik if it was Stockholm.


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

In an API like this, there's a bunch of useful information in there - including current temperature, windspeed, humidity, etc.

I used the `fetch()` function in JavaScript to load the weather data into my page, and then I selected the values I wanted to inject into the DOM from the JSON which comes from the API.

### #2 The presented data on my web app

The city name, the temperature (rounded to 1 decimal place), and what type of weather it is (the "description" in the JSON)

### #3 And the time of the sunrise and sunset 🌇

This was tricky but in my code you'll see I have the time difference for Miami. 

[Here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) is a useful resource for how to do this.

### #4 Weather forecast

Showing a forecast for the next 5 days. With min and max temperature and the description.
In the openweathermap API there's another endpoint that will give us a forecast of the next five days.

http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=5&APPID=YOUR_API_KEY

Here you I changed city and amount of days.

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

### #5 Styling of my weather app 🎨

I used a hero picture with a shadow to make it look good and welcoming!

## Requirements I reached 🧪

- To fetch data from the API using fetch() in JavaScript 
- Name of city, current tempereature and weather conditions and the forecast. 
- The page works on mobile (mobile first!), tablet and desktop (Is responsive)- 
- Code follows Technigo’s code guidelines.

