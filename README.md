# Weather App

This project is a weather application that fetches and displays weather data from the OpenWeatherMap API. The main features include displaying the current weather conditions, temperature, and a four-day forecast, as well as providing sunrise and sunset times. The assignment required following a specific design and using JavaScript to retrieve and present the data dynamically.

## The problem

The task was to build a weather app using the OpenWeatherMap API, focusing on presenting real-time weather data such as temperature, weather description, sunrise and sunset times, and a 4-day forecast. The main challenges were to fetch the data using JavaScript's `fetch()` function, dynamically inject it into the DOM, and style the app to fit the provided design.

#### Approach
I started by planning how to structure the application and which data points to display from the API. The first step was to set up the API connection using the provided API key and to fetch the weather data in JSON format. I used the `fetch()` method to get the data and implemented error handling with `.catch()` to handle any issues during the fetch request.

To display the weather information, I extracted key elements from the API's JSON response, such as the city name, current temperature, weather description, and sunrise/sunset times. I used JavaScript to inject this information into the HTML elements. I also formatted the sunrise and sunset times into a more readable format using JavaScript's Date object.

For the 4-day weather forecast, I filtered the API data to retrieve information for the same time (12:00) each day. This provided a consistent forecast and avoided overcrowding the display with too many data points.

#### Tools and Techniques
- **JavaScript:** Used `fetch()` to call the OpenWeatherMap API and manipulate the DOM to display the weather data.
- **CSS:** Styled the app to match the provided design. I also added responsiveness to ensure it looks good on devices ranging from 320px to 1600px in width.
- **HTML:** Used semantic elements and classes to structure the content and facilitate dynamic updates with JavaScript.

#### Additional Thoughts
If I had more time, I would have refactored the code to break out the HTML updates from the `fetch()` function into a separate function. This would have improved the code's readability and maintainability. Additionally, I would have liked to create my own design for the app to make it more personalized, as I use weather apps like SMHI frequently. Implementing more stretch goals, such as a city selection feature or dynamically changing the page's colors based on the weather conditions, would have been interesting to explore as well.

## View it live

https://weatherapp-ek.netlify.app/
