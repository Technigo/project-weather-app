# Weather App

The assignment is to fetch data from an API using fetch() in JavaScript and create an  app should have a city name, current temperature, weather description, sunrise/sunset time, and a 4-day forecast. The data should be presented in a user-friendly format, and the app should be responsive to different devices. 

## The problem

## Time
This project was fun to work with and I wish I had more time. 

I made a plan, and stuck to it, which was good. The plan was the following: 
1. Create HTML File: Set up an HTML file with (the required) fields for city name, current temperature, weather description, sunrise and sunset times, and placeholders for the forecast.
2. Add API URL and Endpoints: Create API URL and endpoints in the JavaScript file, and set up the DOM Selectors.
3. Fetch today’s weather: Use async/await to fetch today's weather, convert the response to json format, populate the innerHTML, and add the error handling. When all fields for today's weather are fetched and displayed, start with the forecast.  
4. Fetch and display Forecast: Retrieve and display the forecast dataFetch and display the Forecast data. 
5. Format the data: Ensure the data is correctly formatted.
6. Design and responsiveness: Work on the design and make the site responsive. 

All went smoothly until I began working on the forecast. I had go back in the material (especially the Live sessions) multiple times just to get a hang of what I was expected to do next. On top of that there were so many JavaScript default behaviors that I needed to find solutions for, such as JavaScript weeks start on Sunday and the need to convert sunset times from seconds to milliseconds. These were fun challenges but I needed more time. As a result, the design part isn't fully completed. 

## If I had more time
I would improve my code by create a constant for updating the HTML to keep the functions clean, and find a way to combine the "calls" for today’s weather and the forecast into a single "call". Fetch and display lowest and highest temperature. Use images from the API, instead of using only the three that came along in the assets. And of course, pay more attention to the design.  

## View it live

LINK: https://project-weather-app-by-joe.netlify.app/
