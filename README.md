# Weather App ⛅️
This project is a weather web app using the Open Weather API that shows current weather and a five day forecast. 
The main section has city name, temperature, weather animated icon, small description of the current weather and the real feel temperature. I added also some extra information like: wind speed, UV index (from the ultraviolet index API), as well as, sunrise and sunset times. 

Bellow there's a five day forecast section which shows the minimum and maximum temperatures for each respective day.
On top of the page there's also buttons to navigate between the current weather of some of the cities I've lived. 

It is responsive, all versions display the same information, however destop version has a slightly different contained design and then a second version optimised for mobile and tablets. 

## Planning & The problem 🧩
 I started this project by extracting all the data I needed from the Open Weather and the Ultraviolet Index API's using fetch(), there was a lot to learn since I'm using API's for the very first time! 
 Then I coded my way into displaying it all in a blank page and then did the styling, which was really interesting as I learned to inject items directly from javascript and managed to change background colours (from a cool toned gradient to a warm toned one) depending on the current temperature - wait until it reaches 18 degrees celsius to see the magic happen! 🔮

 I ran into a problem while dealing with the min and max temperatures for the 5 day forecast since it has a 3 hour interval and choosing a specific hour in the middle of the day would bring too little variation, but I managed to deal with it in a way that will compare the temperatures and display the lowest temperature for the day and do the same for the highest. 
 I learned a lot about how to fetch data, how to deal and display that data and a lot about taking information from specific items and compare them

 ## Tech ⚡
- HTML5
- CSS3
- JavaScript 

## View it live 🔴
https://minimalweatherapp.netlify.app/
