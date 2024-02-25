# Weather App - Technigo school project - Made by Daniel and Karin

WATCH MY AND DANIELS RESULT OF THIS ASSIGNMENT HERE: https://weatherapp-daniel-karin.netlify.app/
<img width="361" alt="Skärmavbild 2023-10-22 kl  12 54 58" src="https://github.com/DanielBladh/project-weather-app/assets/91525357/2edc2bc4-a979-48fd-80ee-6e6c6898c421">


The Problem:
For this project, I was tasked with creating a weather app using the OpenWeather API, and we had to do it using only vanilla JavaScript. The challenge was to retrieve weather data for a specified city and display it to the user. We approached this problem by breaking it down into several key steps.

Approach:
We started by setting up the fundamental structure of the app. We defined the base URL for the OpenWeather API and obtained an API key. Then, we created a function fetchWeatherAndForecast(cityName) to fetch both the current weather and a 5-day forecast for the given city.

To make the app user-friendly, we incorporated geolocation functionality. Users can click a geolocation button to retrieve weather data based on their current location. This involved using the Geolocation API, which allows the app to determine the user's latitude and longitude.

To ensure the app displays accurate local time, we implemented the updateTime(cityTimeZoneOffset) function, which adjusts the time based on the city's time zone offset. This enhances the user experience and makes the app more informative.

We also handled various aspects of the user interface, such as showing weather icons and descriptions, sunrise and sunset times, and a forecast for the next four days. We designed the app to be responsive and intuitive, offering users a clear and visually appealing presentation of weather data.

Technologies Used:

Vanilla JavaScript: We used pure JavaScript to build the app, making it lightweight and efficient.
OpenWeather API: We leveraged this API to obtain weather data and forecasts for cities around the world.
Geolocation API: This allowed me to offer a user-friendly way to fetch weather data based on the user's current location.
HTML and CSS: These were used to create the structure and style the app's user interface.
Future Improvements:
If we had more time, we would consider adding additional features, such as:

User accounts and saved locations.
Weather alerts and notifications.
A more detailed forecast with additional weather parameters.
Improved error handling and user feedback.


View it Live - https://weatherapp-daniel-karin.netlify.app/
