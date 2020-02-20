# Weather App

The assignment was to build a weather web app that shows today's weather and temperature, and a 5-day forecast using a weather API.

## The problem

I created an app that fetches data from the API based on what city the user selects in a dropdown. It shows today's weather and a 5-day forecast. The background-color changes depending on the temperature, and I also added a night shift mode between 22.00 – 06.00. The icons is added based on the weather description string and here I used a switch statement. 

I started making the Geo location stretch goal but decided to leave it for later as I didn't have the time to finish, and also I didn't fully understood all the call-back functions and how it all fit together. I managed to get out the current position and use those to get a correct API url.

I could think of a thousand additions to this project, but if I had more time I would (besides from the geo location) make an array of the select options instead of adding them in the html, and I would build a function to insert åäö in city names (now I just avoided using any of those cities).

## View it live

https://technigo-weather-app.netlify.com/
