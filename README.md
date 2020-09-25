# Weather App

A weather app (website) that shows today's weather and a 5-day forecast using a weather API fetched in JavaScript.

## The problem

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next?

For me it was really fun starting to use API and it got very clear for me how to read the data from it. The endpoint documentation made it easier to understand this data and hopefully it will be easier to understand the different endpoint documentations when starting to work with more API's. 

I started to create the structure of data I wanted in HTML and to create all the variables in JavaScript connected to them. Thereafter I fetched the API for today's weather and linked them to HTML. The fetch went good and then I slowly changed the times, the temperature and weekday to the right format I wanted. I used the method '.toFixed' for decimals and '.toLocaleTimeString' for getting right format on sunrise and sunset. 

First I created the 5-day-forecast in the same way, using a lot of variables and .innerHTML for each day. After a lot of changes, test and help from others I finally suceeded with 'map()' and 'forEach()' functions to retrieve the information for all days in the same way. I needed to understand that there was an array in the API first and to understand how the 'filterdForecast' variable worked.

I am very proud that I easily managed to set up an if-statement that changes the color on the border based on temperature. I am also proud how I managed to connect different pictures based on the icon-ID for the different weathers. Another thing I am very glad that I managed is the select-element in HTML, with different options of cities, that I connected with a function to the JavaScript. 

The CSS part is just fun and I did some different changes in the styling for tablet and desktop compared to the mobile-first(!) view.

I struggled a lot trying to use addEventListener instead of having the functions called in HTML but didn't succeed. Neither did I solve to have the API link in a '.gitignore' file. If I had more time I would dig even deeper into these two problems.

## Learning objectives

- How to use an API
- Basic JSON
- How to use fetch() and promises in JavaScript

## Tech

- HTML5
- CSS
- JavaScript 

## View it live

Link to see the project live: https://howistheweatherapp.netlify.app/ 
Please check it out!