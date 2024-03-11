# Weather App
A site to display the weather of e few cities in Sweden.

## The problem
I worked in branches for the sunrise/sunset-display, the forecast-display, the main styling and the display of the main text. 

Then, after merging, I decided to do a drop-down menu with the choice of a couple of different cities. This was the hardest part, since I ended up having five weather forecast showing at the same time. I had to go through my code thoroughly - I put in more consolog-logs and commented out different rows to try to isolate the problem, until I found out that the functions for all of the cities executed at the same time (as if I had pressed all of the options at once). With this in mind I restructured the functions and made a different one for each city instead of passing the city as an argument through the whole site. That solved my problem.

Since we only had icons for three weather types to begin with, I had to find new ones for each new weather type that I made a styling for. I decided to use Font Awesome for this.

If I had more time I would put in more cities to choose from. I would also like to work more with the styling to make the colors work better together (and maybe change the background of the dropdown menu, when your hovering over an option).

## View it live
https://serene-fairy-e9079b.netlify.app/
