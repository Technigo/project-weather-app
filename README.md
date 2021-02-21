# Weather App

This week's project is to build a weather web app that shows today's weather and temperature, and a 5-day forecast using a weather API.

## The problem

We started the project by creating a simple structure in HTML and conntected the js-file. From open weather app we got an API key which we used to get the URL for our weather data. 
We use dthe fetch() function to load the weather data into our page, and then selected the values we wanted to inject into the DOM from the JSON which comes from the API.

To present the city name the temperature and what type of weather we used variables and used methods such as toFixed() and toLocaleTimeString() to present the data as wanted.

To get the forecast for the next five day we used filter method on the forecast array to only get the info from 12:00 each day.

To change backround color and icons depending on the weahter forecast we used if conditions.

If we had more tome we would change names on classes and IDs to make it more readable. We would also change the color of the text depending on the weater and add more cities.

## View it live


