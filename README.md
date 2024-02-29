# Weather App

Replace this readme with your own information about your project.

Start by briefly describing the assignment in a sentence or two. Keep it short and to the point.

## Steps

    1. Get the geolocation of the user
    2. Controlling the colors in main depending on forecast
    3. Build forecast section
    4. Get weather using the geolocation
    5. Display current weather, sunset/sunrise and temperature
    6. Display five day forecast
    7. Handle theme colors depending on type of weather
    8. Add loader and background image
    9. Search for cities

## Reusing Main Function for API Requests

Problem: I've used the same main function to fetch API data for both current weather and forecast. However, it seems like there are conflicts when attempting to reuse it for both purposes.

Explanation: In order to make the function more reusable I passed both the API URL and the correspondling handling function as parameters to the "getDataFromApi". I used the "dataHandler" parameter to be able to invoke both functions.

## View it live

[Weather forcast App](https://technigo-project-weather-app.netlify.app/)
