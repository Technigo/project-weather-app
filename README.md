# Weather App

Our project for this week was to work with pair programming and create a simple weather app with mobile first approach, also responsive for tablet and desktop, that shows today's weather information for one city, and a 5-day forecast using a weather API.

## The problem

We decided to replicate on of the provided designs and chose Helsinki as the city to show weather information about.
We were concentrating step by step on blue level requirements, making sure that both of as understand the code. And we have also reached few goals from the red level. We made the colors and icons to change based on the weather information. It was done by using an if statement.

First of all we created basic HTML structure with ids and classes. To reflect information about the current weather and the foreacast we used two API endpoints and made them as constant urls at the begining of the JavaScript file. Then we used two fetch() functions – one to fetch information about the current weather and another one for the forecast. To present data on our web app we injected values into the DOM from the JSON file which comes from the API. 

Since the API gives the forecast on the next 5 days for every third hour, we used filter() function to filter the forecast list array to only get the information from 12:00 each day. And by using forEach() method we looped through that array to present a day and temperature information on our web app. And we also used Date() object to present date and time information in a way we want it to be.

Once we had all information needed on our web app, we styled it in CSS to look like one of the provided designs.

To solve problems, we used console.log a lot, we logged every part of the code in console to see which parts are not working properly, and we also used dev tools to see where the problem in the code is. And we googled a lot as well, for example, to find how to get the temperature to 1 decimal. And we managed to solve most of the struggles this way. We also asked question on Stack Overflow and during the Q&A session.


## View it live

Link to published site:
