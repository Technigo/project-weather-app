# Weather App
This weather app allows users to check the current weather and a 5-day forecast for different cities. The app fetches data from the OpenWeatherMap API and displays the weather information dynamically.

## Features
- Display current weather information, including temperature, description, sunrise, and sunset times.
- Automatically fetches and displays weather for a default city (Stockholm) on page load.
- Allows users to search for weather information in other cities.
- Toggle between predefined favorite cities.
- Display a 5-day weather forecast for the selected city.

## The problem
- This project was a collaborative effort, utilizing pair programming for efficient development. It marked our first experience working on separate branches, each contributing unique features. The challenge lay in merging these branches to the master on GitHub while resolving resulting conflicts.
- When a user entered a numeric value or an undefined city name, two issues surfaced: first, an error message "404 Not found" appeared in the console log, and second, the 'city name' area on the webpage displayed the word 'undefined'. Debugging these problems proved to be particularly challenging. 

## Known bugs
- A notable bug relates to the weather forecast, specifically regarding the display before 15:00. We decided to fetch weather data at 12:00 and also to omit the current day from display before this time. As a result, only four days are shown. Post 15:00, the API consistently provides data for five days.
However, this approach relies on the assumption that the API maintains data integrity throughout the day. We initially attempted to include the current day in the weather forecast, but faced inaccuracies where the API occasionally displayed data for the next day. This behavior stems from the API's real-time updates, altering the "today" data as it progresses through the day.

## Future improvements
If we had more time these are some features that could be implemented:
- Allow users to choose their favorite cities.
- Implement a nighttime and daytime theme for the app.
- Display the maximum and minimum temperature for the entire day.

## Acknowledgements
- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Mobile simulator Google Crome Extension
- [Best and Safe Way to Merge a Git Branch into Master](https://www.w3docs.com/snippets/git/best-and-safe-way-to-merge-a-git-branch-into-master.html) 
  
## View it live
[Weather App Kiwi](https://weather-app-kiwi.netlify.app/)
