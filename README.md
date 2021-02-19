# Weather App

**Mission:** 
- *Build a simple weather web app that shows today's weather and temperature, and a 5-day forecast using a weather API.*

**Requirements:**

🔵 Blue level
- [x] You should fetch data from the API using `fetch()` in JavaScript
- [x] All data in the sketch above should be present and fetched from the API
- [x] The presentation of the data should be in the specified format.
- [x] The page should work on mobile (mobile first!), tablet and desktop (Be responsive)

🔴 Red level
- [x] Add multiple cities 🏙
- [x] Include visual indicators for the type of weather, cloudy/sunny/rainy/etc

⚫ Black level
- [x] **Use your location 🗺** Use the Geolocation API
- [x] Explore the API and use another endpoint of the Weather API to include supplementary information


***

## Workflow

### The steps
I began by reading through the steps defined in the project brief. I then used those descriptions in conjunction with the listed blue requirements to create a todo list of functions to add. I worked through the list and added functionality accordingly. 

### The design
I chose the pre made Design 1 for this project. I opened it up in Adobe XD to be able to extract some svg's and relevant format data (like font-size etc.)

### Refactor the code
An issue I noticed was that it was very difficult to get correct min and max temps for forecasts. However after looking around the API docs I found another end-point that gave correct min and max temps for forecasts.

This is the endpoint [LINK](https://openweathermap.org/api/one-call-api)

> 💡 The good thing about this endpoint is that you only have to make **ONE** `fetch` request.

This meant that I needed to do some refactoring. For example I made a global **weatherData** object that was filled with formatted data during the fetch request. 

```js
// Fetch weather data from onecall api endpoint
// and insert relevant data into global weatherData object
const fetchWeatherData = () => {
  fetch(
    `${API_URL}lat=${weatherData.city.position.lat}&lon=${weatherData.city.position.long}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      weatherData["current"] = data.current;
      // makes sure we only add a certtain number of forecast days.
      weatherData["daily"] = data.daily.slice(1, forecastSize).map((item) => item);
      // weatherData obj is now ready! Time to trigger the draw functions
      drawWeatherToday();
      drawForecast();
    })
    .catch((err) => console.log(`Error was thrown: ${err.message}`));
};
```
However this endpoint could only accept longitude and longitude as location parameters. So I had to make another object for cities. I pre-defined cities (looked up their gps location on google):

```js
const cities = [
    {
      name: "La Motte",
      position: {
        lat: 43.4914,
        long: 6.5369,
      },
    },
    {
      name: "Stockholm",
      position: {
        lat: 59.334591,
        long: 18.06324,
      },
    },
    {
      name: "Berlin",
      position: {
        lat: 52.520008,
        long: 13.404954,
      },
    },
  ];
```
And since when using the geoLocation API already gives you longitude and latitude positions it was easy to create an object for that (if the user wanted to use location):

```js
/** This function is triggered by getLocation()
 *  1. It inserts the current location as a city object in weatherData
 *  2. Then it fetches the data for the location
 */
const showPosition = (pos) => {
  weatherData.city = {
    name: "My Location",
    position: {
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    },
  };
  fetchWeatherData();
};
```
After doing this refactor I minimized the code by almost **50 lines!!** Very efficient 😄

### The Code clean-up
As a last step I went through the code file by file and added descriptive comments and removed any debug comments.

***

## Reflections
All in all this project was not filled with any major issues. I worked through the requirements with ease. However, no project is without issues...
<br>
- I struggled a bit with the CSS styling. After I had adapted the design in the **Design 1** folder it was hard to make it responsive. This part of the project took the longest time! But no matter, I learned a lot 😇
- Another issue was realizing that the Date formatting I had made was not recognized by iOS. However after some help form teachers and classmates I solved it 😉
<br>

If I were to continue on this project / start over I would:
- I would work on adding animations!!! I just lost sooo much time making the site look like the design and also have it responsive. 
- I would go through more testing phases. I have noticed some minor bugs with the expanding hero section. Like if you have it expanded and then change city the page doesn't load data properly. Perhaps this is something I will have to fix in code review?
<br>

***

## View it live
https://bub-weather.netlify.app/

