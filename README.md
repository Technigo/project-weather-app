# Weather App

Developers: Pernilla Sterner, Sebastian Tigerschiöld
Assignement for Technigo's React/Redux Upskill course, fall of 2023.

---

Build a web app that displays the current weather in a location, based on geolocation, search or randomization. Display the forecast in the current location for the 5 coming days.
The API used for the weather and forecast is https://openweathermap.org/api. Additionally we used the API from https://countriesnow.space to randomize the locations upon click a button.

## The problem

We split this project into 4 parts:

1. Pair programming to fetch data from the API, as well as a mockup of the design (mostly HTML).
2. Split into branches to add feautures "Get sunrise/sunset time" for current location (Pernilla). Another branch for adding the 5 day forecast (Sebastian).
3. We split tasks like responsiveness, design details and reformatting code between us using Trello.
4. Stretch goals (update background of app accordning to weather conditions, get the users geolocation as the weather query as well as randomizing cities) were done by Pernilla.
   During the 4th part, Pernilla decided to split the different functionalities into separate files as our single script file was getting cluttered.
   We had a few hurdles along the way, like designing based on the wrong design (before we found the Figma files). Presenting the time in a human readable way was also a challenge as the API gives UNIX time.

   PLEASE NOTE: Stretch goals were 100% done by Pernilla Sterner. The rest of the code was done as specified in first 3 parts.

## View it live

[Weather App](https://technigo-project-weather-app.netlify.app/)
