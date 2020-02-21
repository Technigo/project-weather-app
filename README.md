# Weather App

This week's assignment was to build an app which took weather information from two APIs and displayed it for the user. 

## The problem

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next?

The 'main weather' API was quite simple to deal with using fetch and .then to change the inner HTML of the page.
The five day forecast API was more tricky. I used 'map' to create an edited API with different information I could use
to filter it - adding a weekday and day number with new Date() to create arrays based on which day of the week it was
using .includes(). I used a for loop to go through these new arrays and return the highest/lowest temperatures. 

If I had more time I would have made the page responsive. As it is, the design is made to be viewed on mobile,
so it looks quite bare/blank when viewed on a full-sized desktop screen. I would have created more classes
for the different types of weather. I probably could have also gone through the JavaScript and simplified certain things, making the code shorter and easier to read. 



## View it live

https://zealous-goldberg-f559b8.netlify.com