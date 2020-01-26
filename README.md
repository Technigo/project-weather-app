## The Weather Web App :sunny: 

See the site here: https://mrsucodesproject6themiamiweatherapp.netlify.com/?

Here I've built a weather web app that tells today's weather and temperature, and a weekly forecast using a weather API - in Miami!! :sunny:

---

## What I learned 🧠

- What an API is and how to use it
- Basic JSON
- How to use fetch() in Javascript
- How to use promises in JavaScript
- How to work with the Date() object in JavaScript
- How to work with time difference


### The presented data on my web app

The city name, the temperature (rounded to 1 decimal place), and what type of weather it is (the "description" in the JSON)

### And the time of the sunrise and sunset 🌇

This was tricky but in my code you'll see I have the time difference for Miami. 

[Here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) is a useful resource for how to do this.

###  Weather forecast

Showing a forecast for the next 5 days. With min and max temperature and the description.
In the openweathermap API there's another endpoint that will give us a forecast of the next five days.

http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=5&APPID=YOUR_API_KEY

Here I changed city and amount of days.


### Styling of my weather app 🎨

I used a hero picture with a shadow to make it look good and welcoming!

## Requirements I reached 🧪

- To fetch data from the API using fetch() in JavaScript 
- Name of city, current tempereature and weather conditions and the forecast. 
- The page works on mobile (mobile first!), tablet and desktop (Is responsive)- 


