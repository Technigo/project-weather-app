# Weather App

This week's project is to build a simple weather web app that shows today's weather and temperature, and a 5-day forecast using a weather API.

## The problem

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next?

Getting weather description from the API:
Found out the weather description in the API was in an array (the city name and temp was in object), so googled it, looked at a lecture video from this week material from Technigo and found out I needed to do a forEach... and it worked out :)

Getting the temperature to 1 decimal:
Googled "json to 1 decimal", found .toFixed(2) on stack overflow, 
person that wonder how to round to two decimals, so took that,
wasn't really sure were to put it, but tried in the ${json.main.temp}, .toFixed(1) and it worked out :)

## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.
