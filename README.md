This was the second project of the second sprint on the Technigo Frontend Bootcamp, which was focused on Javascript.

## 1. What is this?

The purpose of this assignment was to create a basic weather app, showing today's weather as well as next hours forecast. This was built using Open Weather Map API. 
The purpose of this exercise was to learn basic JSON, how to use fetch() and what promises are, but also to work with Date() in JavaScript.


## 2. What did I do?

I've chose to use some what I've learned before in this project, as the accordion menu to show next hours forecast details.
Besides the basic API fetch, I've implemented geolocation and also a search bar to specify the location for the forecast.
Some data retrieved from the API was not entirely readable, like wind direction (which was in degrees), so I also created a function to translate that into cardinal directions.
The background of the app will change according to the weather code retrieved from the API and it will be different if the current time for the location is day or night time.

## 3. Where can you see it in action?

You can see the project [here](https://tiago-weather-app.netlify.com/).