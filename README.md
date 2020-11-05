# Weather App
This project is done as a part of Technigo boot camp. This week's project was to build a simple weather web app that shows today's weather and temperature, and a 5-day forecast using a weather API.
The site is responsive with mobile first in mind.

## The problem
We had the option to choose between making our own design or trying to implement another design that we got from the brief. I liked the challenge of trying to get as close as possible to someone else's design. 

I've used flexbox to make the site responsive. I made small changes for the differnt media queries, but basically kept the same main design for all layouts. The bakground color, the icon and the main weather text changes depending on the main weather (clear, rain, snow and so on). 

I have used the fetch() method to get the data from the Open Weather API. I tried to keep the promises clean and structure and moved the if-statement and generateHtml-fucntion in to their own functions.

The styling was a real challenge this time since most of my html-element was created in javascript. For some reason I couldn't acces the icon images when I hade them in my html-file so I had to add them in the js-file. I also had issues with accessing classes created in the javascript file for styling. If I was to redo this project I might have choosen to create more static html-elements directly in the html-file to make it easier.

If I had more time:
- I would have added more data to the 5-days forecast.
- tried to re-write my js-code in a more optimal way. It feels like my if-statement could be more clean and structured.
- I would have moved more code in to functions. 

## TECH 
- Javascript
- API 
- CSS
- HTML 

## View it live

https://angry-leakey-d4c2cc.netlify.app/
