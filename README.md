# Weather App By Susanne Ekenheim and Laura Lyckholm

The task was to create a Weather Dashboard showing first the temperature, city and current weather information as well as sunset and sunrise of that city. We where also tasked with showing the forecast of the citys weather for the coming 5 days, we got to choose how we wanted to display that forecast. We where to work in pairs, using branches and mob programming.

## The problem

We started out by working in mob programming with the first parts of the app. We laid out all necessary files, fetched and appended the first data together. We then split into two branches; forecast and sunstate. The styling was also done separetly in a styling branch. When we felt we where ready we merged our branches and kept working together on the master branch for a little while, solving issues that appeard together. The most difficult parts where:
- getting the sunset and sunrise to show in the correct local time, depending on timezones etc. We solved it by the help of Matildas Live Coding session. 
- getting the forecast to show correct temperatures for each day. First we filtered the list of max and min temps based on 12.00, but then of course the max an min temps where the same. We asked chatgpt, googled and read on stackoverflow to figure out how to store the data from all max and min temps that where updated during the day, and to delete/save the lowest/highest values for each day which resulted in a working forecast. 
- getting the button to show different cities to work was difficult. For now our blue button and the hamburgermenu are placeholders for real functionality. We know what we want to do but it's hard and we had big issues with time this week. We're both working fulltime, and our sleep schedueles even clashed - but we still got through it! 
- we styled the app mobile-first. We think the styling works equally good on desktop as on mobile, since we think the effect of the sharp edges is cool. We don't have a sketch for desktop, so we can only assume how it's supposed to look on desktop. 

## View it live

https://weather-app-ekenheim-lyckholm.netlify.app/
