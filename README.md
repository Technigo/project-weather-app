# Weather App

In this project we are creating a weather app, with the main focus on getting comfortable working with API's, promises and bransches.

- The app should have: city name, current temperature, weather description, sunrise/sunset time, 4-day forecast.
- The presentation of the data should be in the specified format.
- Be responsive and look good on devices from 320px width up to 1600px.
- Follow one of the provided designs as closely as possible.

## The problem

I started with setting up really simple html with one container, and connecting the main API on master, before splitting up into three branches: ft-sun, ft-forecast and styling. I then worked seperatly on these bransches up until the basic requirements were met and I were ready to publish the first version on Netlify. I later continued to create branches for each feature or bug I was working on, to avoid editing directly in the master branch.

I am finding it difficult to implement promises since the code seem to work without them. I do not seem to really grasp the use of them...

I debated whether to render all content via javascript or only the changing value. As a first solution I took this route for the sake of simplicity, knowing it might not be the best from a performance or SEO perspective.

### Next step:

- Find more use of promises and async.

- Find a way to make geolocation work on iphone.

- Show search suggestions, instead of picking the first match. This would provide a more accurate search result.
  -- Also exchange the nav-items to coordinates.

- I want to explore how to insert background animations, such as rain.

## View it live

[![Netlify Status](https://api.netlify.com/api/v1/badges/1c740839-c3b2-41e6-97f9-43a3d588e62d/deploy-status)](https://app.netlify.com/sites/sofias-weather-app/deploys)
