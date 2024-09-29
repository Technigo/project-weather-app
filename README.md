# The Weatherington

The goal was to use the OpenWeatherMap API to create a weather app that shows the current weather in a city and also a 4-day forecast of that city.

## The problem

Based on my chosen design I started with outlining the HTML in my index file to plan for what I needed. I then started with the current weather, fetching that data and then outputting it on the web page.

The forecast was trickier to figure out. I first tried to just select 12:00 for each day, but then realized I couldn't get the min and max temp of each day that way. With some help from ChatGPT I figured out how to loop through each day and save the min and max temps.

I also decided to add a search in order to be able to switch city. I made it inline with the app title, which was a bit tricky to make work.

## View it live

[https://weatherington.netlify.app/](https://weatherington.netlify.app/)
