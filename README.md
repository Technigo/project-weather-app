# Weather App

In this project we built a weather app by fetching API from openweather.org

## The problem

We started with fetching the API and adding functions to get todays weather in Stockholm including temperature, weather description, icon and sunrise + sunset. Sunrise and sunset was set with get date and converted using get current time string. 
This app was then expanded with an dynamic city depending on an user input which toggles by eventlistener added for a icon in the top menu. For instances when the user enters an invalid city name we added a catch error function that displays an alart message.
We also put an icon in the top menu that on click calls a function for getting the current position of the user by utilizing the openweather API and coordinates. This getPosition function also runs when the site is loaded to always display something.

A 5-days forecast was implemented using a forecast API adress. We filtered the data to 12:00 each day and displayed the temperature, an icon and day using forEach loop throught he filtered dataString. For the days getDate, getDays and a weekdays array was used, but some splicing of the data was also needed to get it fully working on every OS. 
We also added that the background color, picture and button color changes depending on weather. This was done adding and removing different classes depending on the id-number of the data.

Styling and animation was done in CSS. For animation raindrops and snowflakes was created using CSS and keyframes. 

Techniques: API fetch/catch, navigator/geoloaction, arrays, forEach, CSS keyframes
Tools: VS code, live server, live share, openweather.org, unsplash.com, google meets, Slack, StackOverflow

Contribution - pictures by: Jose Mizrahi, Yeh Xintong, Tomas Tuma, Artem Anokhin, Anandu Vinod, Majid Gheidarlou
             - icons by: Freepik from www.flaticon.com


## View it live

https://reverent-hamilton-99ea7e.netlify.app/