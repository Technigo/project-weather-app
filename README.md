Project: WeatherTheWeatherApp

WeatherTheWeatherApp is a weather application that retrieves and displays real-time data for Stockholm. It fetches and displays the current location, temperature, weather condition, sunrise, and sunset times. It shows the weather forecast for today and the next four days, including daily min and max temperatures. The app visually changes images and background styles based on whether it’s clear, cloudy, or rainy, and whether it’s day or night.

Challenges Encountered
- The initial challenge involved successfully retrieving data from the OpenWeatherMap API. Utilizing console.log helped me identifying the structure of the API response.
- Converting UNIX timestamps for sunrise and sunset times into a readable format was a challenge, but resolved this using a the function, convertUnixToTime.
- I found implementing some sort of logic to change the background and images based on weather conditions and the time of day very complex. For this, I use a switch statement and various condition checks to ensure the app responded accurately to different weather scenarios/time of day.

If given more time, I would:

- Create a helper function to streamline the code that handles image and background changes, as it now includes a lot of redundancy and repetetive code.
- Implement weather condition icons for each day in the forecast.
- Refine the styling to better align with the Figma design layout.
- Enhance responsiveness for a wider range of screen sizes.

## View it live

https://master--weathertheweatherapp.netlify.app