# Project Weather App

By Nabeel, Li, Tomoyo, Louisa and Mathilda

Our assignment was to build a weather app that showed today's weather in local time (temperature, description and time for sunset/sunrise) and a forecast for the upcoming five days. We could choose from two designs and were supposed to follow the chosen design and make it change depending on time, i.e one design for night and one for day.


## The problem

We started with chosing a city (Perth, Australia) and fetched the local weather data from an API. Then we planned what things we should focus on and which days we should do what. 

First we set up a HTML-file with the elements we needed. Then we moved on to javaScript and display the cityname, current temperature and weather description using DOM-selectors and innerHTML. Next we fetched the time for sunrise and sunset and set it to local using newDate and toLocaleTimeString.

After that it was time to show the forecast with min/max-temperatures. We started with creating an array for the weekdays, then we fetched the forecast from API and used a function and innerHTML to display it.

The forecast should show an icon of sun, cloud etc depending on the current weather. To create this we put the weather description in cariables and used conditionals.

The design was made in CSS. One background was made for the night and one for the day. Then the site was made responsive for tablet and desktop using media queries. 

If we had more time we would spend some more time on the design, making it even more like the design that we chose. We would also put in some animations in the website and perhaps make it possible to choose from different cities using a search bar or a drop-down.

## View it live

https://silly-hugle-40a4c8.netlify.app
