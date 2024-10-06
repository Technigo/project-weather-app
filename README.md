# The Weatherington – Accessible version

The goal was to use the OpenWeatherMap API to create a weather app that shows the current weather in a city and also a 5-day forecast of that city.

The goal of the second iteration was to make the app accessible.

## The problem – Week #1

Based on my chosen design I started with outlining the HTML in my index file to plan for what I needed. I then started with the current weather, fetching that data and then outputting it on the web page.

The forecast was trickier to figure out. I first tried to just select 12:00 for each day, but then realized I couldn't get the min and max temp of each day that way. With some help from ChatGPT I figured out how to loop through each day and save the min and max temps.

I also decided to add a search in order to be able to switch city. I made it inline with the app title, which was a bit tricky to make work.

If I had more time I would have looked into timezones. Right now the sunrise and sunset times show the local times for the user, and not the city that's been entered.

## The problem – Week #2

I started with doing an accessibilty review of my app. In Lighthouse I got one thing to fix, and that was a label or aria-label attribute on my text field. Easy fix!

I also decided to enchance my colors (even though they did meet the contrast levels), just to make certain even more people found it readable.

The biggest hurdle, which I'm still not happy with, is the screen reader experience. I did some enhancements to make it make more sense:

- Adding todays date at the top, followed by the main title
- A paragraph about todays degrees and weather description
- Clearer copy for the sunrise and sunset times
- Adding a title to the forecast list and full weekday names
- Adding clear copy for the highest and lowest temps of the forecast days
- Aria live region for updating the user of what has changed after they enter a new city

However, making at least VoiceOver on Mac and iPhone read the H1 with the input inside it in a satisfactory way has proven difficult. Especially on iPhone. I've tried numerous ways, but there is always something that doesn't quite work out.

Would be fun to ask real screen reader users to test it and get some feedback!

## View it live

[https://accessible-weather.netlify.app//](https://accessible-weather.netlify.app//)
