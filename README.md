# Weather App
This is a dynamic weather app built using JavaScript that allows users to search for the current weather and a 4-day weather forecast for any city. The app fetches weather data from the OpenWeatherMap API and displays the current temperature, weather description, sunrise and sunset times, as well as a 4-day forecast with daily minimum and maximum temperatures. The app also adjusts its theme to display a day or night background based on the current time at the selected location.

# Features
Search Weather by City: Users can search for the weather by entering a city name.

Current Weather: Displays the current temperature, weather conditions, sunrise and sunset times.

4-Day Forecast: Shows a 4-day weather forecast, including minimum and maximum temperatures for each day.

Day/Night Theme: Changes the background color depending on whether it’s day or night at the selected location.

Responsive Design: The app is mobile-friendly and adapts to various screen sizes.

# Technical Details
Weather Data: The app uses the OpenWeatherMap API to fetch current weather and forecast data.

JavaScript: The app uses fetch for asynchronous HTTP requests and updates the DOM dynamically based on the fetched data.

HTML & CSS: The layout is built using HTML and CSS. The app's design changes dynamically based on the time of day (i.e., day/night background).

Event Listeners: Includes functionality for toggling a search window, submitting a city name, and handling API responses.

# File Structure
index.html: The main HTML structure of the weather app, including input forms and layout for displaying weather information.

style.css: The stylesheet for the app, responsible for styling the layout, background colors, icons, and responsiveness.

script.js: The JavaScript file that handles all the functionality of the app, such as fetching data from the OpenWeatherMap API, updating the UI, and managing events (searching for cities, toggling the search window, etc.).

# Improvements
Currently, the weather forecast is based on two time entry points (12 AM and 12 PM) to retrieve the temperature data. To enhance the accuracy of the displayed forecast, it would be beneficial to fetch data at more frequent intervals, such as every 3 or 6 hours, to provide a more detailed and precise temperature trend throughout the day. This would give users a clearer and more reliable forecast.

## View it live
https://gittes-weather-app.netlify.app