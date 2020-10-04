# Weather App - Overview
Project done as a part of Technigo bootcamp.
Build a simple weather web app that shows today's weather and temperature, and a 5-day forecast using a weather API.

Learning Objectives:
1. What an API is and how to use it
2. Basic JSON
3. How to use `fetch()` in JavaScript
4. How to use promises in JavaScript
5. How to work with the `Date()` object in JavaScript

## The problem
The trickiest thing to solve for was exactly how to access specific keys within the API array. After this initial hurdle, the Blue Level ojbectives seemed straightforward enough. For me the most difficult problem to solve was working out how to grab and show weather for additional cities. Instead of showing data for all five cities at once, I wanted to display data for one city at a time in order to 
    A) maintain a clean and simple display at any given time and 
    B) in order to reuse all the formatting and other items already present in the code.
It took a lot of working and reworking the code and figuring out exactly what phrases to search for to really nail it. Early on I had a hint from Maks which pointed me in the right direction but even then it took a few days of hitting the wall and taking a break and then coming back around to think about it with fresh eyes. Outside of figuring out the specific code, this week taught me how important it is to know exactly how to phrase what you're looking for when you're searching. We don't know what we don't know yet, so essentially I don't know what is possible, but from poking around and trying to think the logical sequence of what the code is doing, it slowly comes together. 

I may come back around later on to work on the last Red Level goal, but I'm feeling good about where I've landed with this little weather app this week. 

## Core Tech
- JavaScript
- API
- HTML5
- CSS

## Requirements Completed
🔵  Blue Level
- You should fetch data from the API using `fetch()` in JavaScript
- All data in the sketch above should be present and fetched from the API
- The presentation of the data should be in the specified format.
- The page should work on mobile (mobile first!), tablet and desktop (Be responsive)

🔴  Red Level (Intermediary Goals)
<!-- - Change the colors of the page based on the weather. If the weather is warm – use warm colors. If the weather is colder, use cold colors. If you really want to push you CSS muscles you can even make a background gradient-->
- Add multiple cities. Give the user the option to choose between a couple of your favorite cities.
- Include visual indicators for the type of weather, cloudy/sunny/rainy/etc

<!-- ⚫  Black Level (Advanced Goals)
- **Use your location*
Use the [Geolocation API](https://www.w3schools.com/html/html5_geolocation.asp) that is built in to your browser to fetch the city that you are located in atm and show the weather for your location.
- Explore the API and use another endpoint of the Weather API to include supplementary information
- Add some CSS animations to your app, e.g. pulsating sun/rain drops -->

## View it live
https://pwangy-weather.netlify.app/