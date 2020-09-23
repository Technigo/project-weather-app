# Weather App

This project's goal is to build a simple weather web app that shows today's weather and temperature, and a 5-day forecast using the Open Weather API 🌤

My main section is showing today's weather for Stockholm City: an icon, temperature, weather description and sunrise/sunset times.
This web app is also responsive, with different versions for mobile, tablet and desktop.

In the tablet version I'm showing some extra data: weather cards for the coming 5 days, including the weather description; tablet also unlocks a section I've called "Other Cities close to my Heart" 💕 Which includes the weather for Panama, Seoul and Brussels.
Desktop version will maintain this data and show photos of the different cities 🏙

## How I built it - What I learned

- I have used JavScript's fetch() method to get all the data I need from the Open Weather API 🌦
- The HTML elements showing the data gathered from the API are created dynamically on JavaScript. I've set it up so these elements are created inside of containers, which makes it easier to style on CSS using Flexboxes.
- Each section is a different Flexbox, which changes direction depending on the device it is being viewed from.
- I've learned several new things while building this project: the Date() object, which I'm using to get weekdays and hours; also how to dynamically create HTML elements and when to use this approach instead of having already hard-coded HTML

## View it live

🌥Want to know the weather today in Seoul? Or Panama? Check out my weather app, live at Netlify: https://frosty-murdock-a67563.netlify.app/
